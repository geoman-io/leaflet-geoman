import { describe, it, expect } from 'vitest';
import {
  resolveLanguageCode,
  parseLanguageCode,
  isValidLanguageCode,
} from './language';

// Mock translations object that mimics the real one
const mockTranslations = {
  en: { tooltips: { placeMarker: 'Click to place marker' } },
  de: { tooltips: { placeMarker: 'Klicken, um Marker zu platzieren' } },
  fr: { tooltips: { placeMarker: 'Cliquez pour placer un marqueur' } },
  ja: { tooltips: { placeMarker: 'クリックしてマーカーを配置' } },
  pt: { tooltips: { placeMarker: 'Clique para colocar um marcador' } },
  pt_br: { tooltips: { placeMarker: 'Clique para colocar um marcador (BR)' } },
  zh: { tooltips: { placeMarker: '点击放置标记' } },
  zh_tw: { tooltips: { placeMarker: '點擊放置標記' } },
};

describe('resolveLanguageCode', () => {
  describe('exact matches', () => {
    it('returns exact match for 2-letter code', () => {
      expect(resolveLanguageCode('en', mockTranslations)).toBe('en');
      expect(resolveLanguageCode('de', mockTranslations)).toBe('de');
      expect(resolveLanguageCode('fr', mockTranslations)).toBe('fr');
    });

    it('returns exact match for regional code', () => {
      expect(resolveLanguageCode('pt_br', mockTranslations)).toBe('pt_br');
      expect(resolveLanguageCode('zh_tw', mockTranslations)).toBe('zh_tw');
    });

    it('handles case insensitivity', () => {
      expect(resolveLanguageCode('EN', mockTranslations)).toBe('en');
      expect(resolveLanguageCode('De', mockTranslations)).toBe('de');
      expect(resolveLanguageCode('PT_BR', mockTranslations)).toBe('pt_br');
      expect(resolveLanguageCode('Zh_TW', mockTranslations)).toBe('zh_tw');
    });

    it('handles whitespace', () => {
      expect(resolveLanguageCode('  en  ', mockTranslations)).toBe('en');
      expect(resolveLanguageCode('\tde\n', mockTranslations)).toBe('de');
    });
  });

  describe('locale format handling', () => {
    it('resolves dash-separated locale to underscore format', () => {
      expect(resolveLanguageCode('pt-BR', mockTranslations)).toBe('pt_br');
      expect(resolveLanguageCode('zh-TW', mockTranslations)).toBe('zh_tw');
    });

    it('resolves locale to base language when regional not available', () => {
      expect(resolveLanguageCode('en-US', mockTranslations)).toBe('en');
      expect(resolveLanguageCode('en-GB', mockTranslations)).toBe('en');
      expect(resolveLanguageCode('de-AT', mockTranslations)).toBe('de');
      expect(resolveLanguageCode('fr-CA', mockTranslations)).toBe('fr');
    });

    it('prefers regional variant over base language when available', () => {
      expect(resolveLanguageCode('pt-BR', mockTranslations)).toBe('pt_br');
      // pt-PT should fall back to pt since pt_pt is not in mock
      expect(resolveLanguageCode('pt-PT', mockTranslations)).toBe('pt');
    });
  });

  describe('ISO 639-3 (3-letter) codes - Issue #1551', () => {
    it('does NOT incorrectly match 3-letter codes to 2-letter codes', () => {
      // 'jam' (Jamaican Creole) should NOT match 'ja' (Japanese)
      expect(resolveLanguageCode('jam', mockTranslations)).toBe('jam');
      expect(resolveLanguageCode('jam', mockTranslations)).not.toBe('ja');
    });

    it('returns 3-letter code as-is when not found', () => {
      expect(resolveLanguageCode('yue', mockTranslations)).toBe('yue'); // Cantonese
      expect(resolveLanguageCode('cmn', mockTranslations)).toBe('cmn'); // Mandarin
      expect(resolveLanguageCode('jpn', mockTranslations)).toBe('jpn'); // Japanese (ISO 639-3)
    });

    it('handles 3-letter codes with regional suffixes', () => {
      // These are not found in translations, so they remain as-is (lowercased)
      // The function preserves the original format when no translation is found
      expect(resolveLanguageCode('yue-HK', mockTranslations)).toBe('yue-hk');
      expect(resolveLanguageCode('cmn-TW', mockTranslations)).toBe('cmn-tw');
    });
  });

  describe('unknown/custom languages', () => {
    it('returns unknown language code as-is', () => {
      expect(resolveLanguageCode('xx', mockTranslations)).toBe('xx');
      expect(resolveLanguageCode('custom', mockTranslations)).toBe('custom');
    });

    it('returns custom language for use with override', () => {
      expect(resolveLanguageCode('myLang', mockTranslations)).toBe('mylang');
    });
  });

  describe('edge cases', () => {
    it('handles empty translations object', () => {
      expect(resolveLanguageCode('en', {})).toBe('en');
    });

    it('handles single character (invalid)', () => {
      expect(resolveLanguageCode('e', mockTranslations)).toBe('e');
    });

    it('handles very long strings (invalid)', () => {
      expect(resolveLanguageCode('englishlanguage', mockTranslations)).toBe(
        'englishlanguage'
      );
    });

    it('handles numeric strings', () => {
      expect(resolveLanguageCode('123', mockTranslations)).toBe('123');
    });

    it('handles special characters', () => {
      expect(resolveLanguageCode('en@pirate', mockTranslations)).toBe(
        'en@pirate'
      );
    });
  });
});

describe('parseLanguageCode', () => {
  describe('valid codes', () => {
    it('parses 2-letter codes', () => {
      expect(parseLanguageCode('en')).toEqual({ primary: 'en', region: null });
      expect(parseLanguageCode('DE')).toEqual({ primary: 'de', region: null });
    });

    it('parses 3-letter codes', () => {
      expect(parseLanguageCode('jam')).toEqual({
        primary: 'jam',
        region: null,
      });
      expect(parseLanguageCode('YUE')).toEqual({
        primary: 'yue',
        region: null,
      });
    });

    it('parses locale codes with dash', () => {
      expect(parseLanguageCode('en-US')).toEqual({
        primary: 'en',
        region: 'us',
      });
      expect(parseLanguageCode('pt-BR')).toEqual({
        primary: 'pt',
        region: 'br',
      });
    });

    it('parses locale codes with underscore', () => {
      expect(parseLanguageCode('zh_TW')).toEqual({
        primary: 'zh',
        region: 'tw',
      });
      expect(parseLanguageCode('pt_br')).toEqual({
        primary: 'pt',
        region: 'br',
      });
    });

    it('parses 3-letter with region', () => {
      expect(parseLanguageCode('yue-HK')).toEqual({
        primary: 'yue',
        region: 'hk',
      });
    });
  });

  describe('invalid codes', () => {
    it('returns null for empty string', () => {
      expect(parseLanguageCode('')).toBeNull();
    });

    it('returns null for null/undefined', () => {
      expect(parseLanguageCode(null)).toBeNull();
      expect(parseLanguageCode(undefined)).toBeNull();
    });

    it('returns null for single character', () => {
      expect(parseLanguageCode('e')).toBeNull();
    });

    it('returns null for too long codes', () => {
      expect(parseLanguageCode('english')).toBeNull();
      expect(parseLanguageCode('engl-US')).toBeNull(); // 4-letter primary is invalid
    });

    it('accepts 3-letter region codes (ISO 639-3)', () => {
      // 3-letter region codes are valid per ISO 639-3
      expect(parseLanguageCode('en-USA')).toEqual({
        primary: 'en',
        region: 'usa',
      });
    });

    it('returns null for non-string', () => {
      expect(parseLanguageCode(123)).toBeNull();
      expect(parseLanguageCode({})).toBeNull();
    });
  });
});

describe('isValidLanguageCode', () => {
  describe('valid codes', () => {
    it('accepts 2-letter codes', () => {
      expect(isValidLanguageCode('en')).toBe(true);
      expect(isValidLanguageCode('de')).toBe(true);
    });

    it('accepts 3-letter codes', () => {
      expect(isValidLanguageCode('jam')).toBe(true);
      expect(isValidLanguageCode('yue')).toBe(true);
    });

    it('accepts locale codes', () => {
      expect(isValidLanguageCode('en-US')).toBe(true);
      expect(isValidLanguageCode('pt_BR')).toBe(true);
      expect(isValidLanguageCode('zh-TW')).toBe(true);
    });

    it('accepts 3-letter with region', () => {
      expect(isValidLanguageCode('yue-HK')).toBe(true);
      expect(isValidLanguageCode('cmn_TW')).toBe(true);
    });

    it('is case insensitive', () => {
      expect(isValidLanguageCode('EN')).toBe(true);
      expect(isValidLanguageCode('En-us')).toBe(true);
    });
  });

  describe('invalid codes', () => {
    it('rejects empty/null values', () => {
      expect(isValidLanguageCode('')).toBe(false);
      expect(isValidLanguageCode(null)).toBe(false);
      expect(isValidLanguageCode(undefined)).toBe(false);
    });

    it('rejects single character', () => {
      expect(isValidLanguageCode('e')).toBe(false);
    });

    it('rejects 4+ letter primary codes', () => {
      expect(isValidLanguageCode('engl')).toBe(false);
      expect(isValidLanguageCode('english')).toBe(false);
    });

    it('rejects codes with special characters', () => {
      expect(isValidLanguageCode('en@pirate')).toBe(false);
      expect(isValidLanguageCode('en.US')).toBe(false);
    });

    it('rejects non-strings', () => {
      expect(isValidLanguageCode(123)).toBe(false);
      expect(isValidLanguageCode({})).toBe(false);
      expect(isValidLanguageCode([])).toBe(false);
    });
  });
});

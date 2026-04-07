/**
 * Language code resolution utilities for Leaflet-Geoman
 */

/**
 * Type for the available translations object
 */
type AvailableTranslations = Record<string, unknown>;

/**
 * Parsed language code components
 */
interface ParsedLanguageCode {
  primary: string;
  region: string | null;
}

/**
 * Resolves a language code to a translation key.
 *
 * This function handles:
 * - Exact matches (e.g., 'en', 'de', 'pt_br')
 * - ISO 639-1 (2-letter) codes (e.g., 'en', 'fr')
 * - ISO 639-3 (3-letter) codes (e.g., 'jam', 'yue')
 * - Locale formats (e.g., 'pt-BR', 'zh_TW', 'en-US')
 *
 * @param lang - The language code to resolve
 * @param availableTranslations - Object with available translation keys
 * @returns The resolved language key
 */
export function resolveLanguageCode(
  lang: string,
  availableTranslations: AvailableTranslations
): string {
  // Normalize the language code to lowercase and trim any whitespace
  lang = lang.trim().toLowerCase();

  // First, check if the exact language code exists in translations
  // This handles both 2-letter (ISO 639-1) and 3-letter (ISO 639-3) codes
  if (availableTranslations[lang]) {
    return lang;
  }

  // Handle formats like 'fr-FR', 'fr-fr', 'fr_FR', 'pt_BR', etc.
  const normalizedLang = lang.replace(/[-_\s]/g, '_');
  // Match language codes: 2-3 letter primary tag, optionally followed by separator and 2-3 letter region
  const match = normalizedLang.match(/^([a-z]{2,3})(?:_([a-z]{2,3}))?$/);

  if (match) {
    // Construct potential keys to search for in the translations object
    const potentialKeys: string[] = [];
    if (match[2]) {
      potentialKeys.push(`${match[1]}_${match[2]}`); // e.g., 'pt_br'
    }
    potentialKeys.push(match[1]); // e.g., 'pt'

    // Search through the translations object for a matching key
    for (const key of potentialKeys) {
      if (availableTranslations[key]) {
        return key;
      }
    }
  }

  // If no match found, return original lang (will use fallback mechanism or custom translation)
  return lang;
}

/**
 * Parses a language code into its components.
 *
 * @param lang - The language code to parse
 * @returns Parsed components or null if invalid
 */
export function parseLanguageCode(lang: string): ParsedLanguageCode | null {
  if (!lang || typeof lang !== 'string') {
    return null;
  }

  const normalized = lang
    .trim()
    .toLowerCase()
    .replace(/[-_\s]/g, '_');
  const match = normalized.match(/^([a-z]{2,3})(?:_([a-z]{2,3}))?$/);

  if (!match) {
    return null;
  }

  return {
    primary: match[1],
    region: match[2] || null,
  };
}

/**
 * Validates if a string is a valid language code format.
 *
 * @param lang - The language code to validate
 * @returns True if valid format
 */
export function isValidLanguageCode(lang: string): boolean {
  if (!lang || typeof lang !== 'string') {
    return false;
  }

  const normalized = lang
    .trim()
    .toLowerCase()
    .replace(/[-_\s]/g, '_');
  return /^[a-z]{2,3}(_[a-z]{2,3})?$/.test(normalized);
}

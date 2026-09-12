/**
 * Resolves a language code to a translation key.
 *
 * This function handles:
 * - Exact matches (e.g., 'en', 'de', 'pt_br')
 * - ISO 639-1 (2-letter) codes (e.g., 'en', 'fr')
 * - ISO 639-3 (3-letter) codes (e.g., 'jam', 'yue')
 * - Locale formats (e.g., 'pt-BR', 'zh_TW', 'en-US')
 *
 * @param {string} lang - The language code to resolve
 * @param {Object} availableTranslations - Object with available translation keys
 * @returns {string} - The resolved language key
 */
export function resolveLanguageCode(
  lang: string,
  availableTranslations: Record<string, unknown>
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
    const potentialKeys = [];
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
 * @param {string} lang - The language code to parse
 * @returns {{ primary: string, region: string | null } | null} - Parsed components or null if invalid
 */
export function parseLanguageCode(
  lang: unknown
): { primary: string; region: string | null } | null {
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
 * @param {string} lang - The language code to validate
 * @returns {boolean} - True if valid format
 */
export function isValidLanguageCode(lang: unknown): boolean {
  if (!lang || typeof lang !== 'string') {
    return false;
  }

  const normalized = lang
    .trim()
    .toLowerCase()
    .replace(/[-_\s]/g, '_');
  return /^[a-z]{2,3}(_[a-z]{2,3})?$/.test(normalized);
}

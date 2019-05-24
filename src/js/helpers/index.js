import get from 'lodash/get';
import has from 'lodash/has';
import translations from '../../assets/translations';

export function getTranslation(path) {
  let lang = L.PM.activeLang;

  if (!has(translations, lang)) {
    lang = 'en';
  }

  return get(translations[lang], path);
}

export function isEmptyDeep(l) {
  // thanks for the function, Felix Heck
  const flatten = list =>
    list
      .filter(x => ![null, '', undefined].includes(x))
      .reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

  return !flatten(l).length;
}

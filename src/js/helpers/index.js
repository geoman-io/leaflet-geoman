import get from 'lodash/get';
import has from 'lodash/has';
import translations from '../../assets/translations';

export function getTranslation(path) {
  let lang = L.PM.activeLang;

  if (!has(translations, lang)) {
    lang = 'en';
  }

  let text = get(translations[lang], path);
  if(text){ //Fallback to english
    return text;
  }else{
    return get(translations['en'], path);
  }
}

export function isEmptyDeep(l) {
  // thanks for the function, Felix Heck
  const flatten = list =>
    list
      .filter(x => ![null, '', undefined].includes(x))
      .reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

  return !flatten(l).length;
}

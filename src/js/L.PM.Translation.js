import has from 'lodash/has';
import get from 'lodash/get';
import merge from 'lodash/merge';
import translations from '../assets/translations/index';

export default {
  translations,
  getTranslation(path, lang = L.PM.activeLang) {
    if (!has(this.translations, lang)) {
      lang = 'en';
    }

    return get(this.translations[lang], path);
  },
  addTranslation(lang, json) {
    this.translations[lang] = merge(this.translations[lang], json);
  },
}

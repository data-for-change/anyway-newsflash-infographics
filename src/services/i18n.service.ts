import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { ARABIC, ENGLISH, HEBREW } from 'const/languages.const';

const options = {
  fallbackLng: HEBREW,
  supportedLngs: [HEBREW, ENGLISH, ARABIC],
  debug: true,
  lng: HEBREW,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
};
i18n.use(HttpApi).use(initReactI18next).init(options);

export default i18n;

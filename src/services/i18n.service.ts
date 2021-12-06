import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { LANG } from 'const/languages.const';

const options = {
  fallbackLng: LANG.HE,
  supportedLngs: [LANG.HE, LANG.EN, LANG.AR],
  debug: true,
  lng: LANG.HE,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
};
i18n.use(HttpApi).use(initReactI18next).init(options);

export default i18n;

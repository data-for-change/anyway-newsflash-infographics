import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

const options = {
  fallbackLng: 'he',
  lng: 'he',
  supportedLngs: ['he', 'en', 'ar'],
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
    wait: true,
  },
};
i18n.use(HttpApi).use(initReactI18next).init(options);

export const textDirection = i18n.dir(); //return direction ltr/rtl

export default i18n;

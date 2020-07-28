import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-xhr-backend';

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
i18n.use(backend).use(initReactI18next).init(options);

export const textDirection = i18n.dir(); //return direction ltr/rtl

export default i18n;

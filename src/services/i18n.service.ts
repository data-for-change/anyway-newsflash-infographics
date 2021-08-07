import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

const options = {
  fallbackLng: 'he',
  supportedLngs: ['he', 'en', 'ar'],
  supportedRegions: ['IL', 'US', 'EG'],
  debug: true,
  lng: 'he',
  region: 'IL',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense:true
  },
};
i18n.use(HttpApi).use(initReactI18next).init(options);

export default i18n;

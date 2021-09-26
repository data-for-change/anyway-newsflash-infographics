import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';

interface Locales {
    [char: string]: string
}  

export const locales: Locales = {
    he: 'he-IL', 
    en: 'en-US', 
    ar: 'ar-EG'
};

export function useLocale() {
    const store: RootStore = useStore();
    return locales[store.selectedLanguage] || locales.he;
}

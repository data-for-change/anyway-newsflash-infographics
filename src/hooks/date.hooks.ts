import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';

const locales = {
    hebrew: 'he-IL', 
    english: 'en-US', 
    arabic: 'ar-EG'
};

export function useLocaleValue() {
    const store: RootStore = useStore();
    switch(store.selectedLanguage) {
        case 'he': return locales.hebrew;
        case 'en': return locales.english;
        case 'ar': return locales.arabic;
        default: return locales.hebrew;
    }
}

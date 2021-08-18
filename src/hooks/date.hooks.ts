import { useState, useEffect } from 'react';
import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';

export function useLocaleValue() {
    const store: RootStore = useStore();
    const locales = {
        hebrew: 'he-IL', 
        english: 'en-US', 
        arabic: 'ar-EG'
    };
    const [lang, setLang] = useState(store.selectedLanguage);

    useEffect(() => {
        setLang(store.selectedLanguage);
    }, [store.selectedLanguage]);

    return lang === 'he' ? locales['hebrew'] : locales['english'];
}

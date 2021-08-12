import { useState, useEffect } from 'react';
import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';

export function useLocaleValue() {
    const locales = ['he-IL', 'en-US', 'ar-EG'];
    const store: RootStore = useStore();
    const [lang, setLang] = useState(store.selectedLanguage);
    useEffect(() => {
        setLang(store.selectedLanguage);
    });
    return lang === 'he' ? locales[0] : locales[1];
  }
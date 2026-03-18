import {createContext, FC, memo, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState} from 'react';

export type Language = 'es' | 'en';

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: FC<PropsWithChildren> = memo(({children}) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const stored = window.localStorage.getItem('language');
    if (stored === 'es' || stored === 'en') {
      setLanguage(stored);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(previous => {
      const next = previous === 'es' ? 'en' : 'es';
      window.localStorage.setItem('language', next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({language, toggleLanguage}), [language, toggleLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
});

LanguageProvider.displayName = 'LanguageProvider';

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
};

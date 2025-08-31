import { useEffect, useState } from 'react';

const THEME_KEY = 'portfolio-theme';
const DEFAULT_THEME = 'light';

export function useTheme(): string {
  const readTheme = (): string => {
    const cls = (typeof document !== 'undefined' && document.documentElement.className) || '';
    if (cls) return cls;
    const saved = (typeof localStorage !== 'undefined' && localStorage.getItem(THEME_KEY)) || '';
    return saved || DEFAULT_THEME;
  };

  const [theme, setTheme] = useState<string>(() => readTheme());

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY) setTheme(readTheme());
    };
    const handleMutation = () => setTheme(readTheme());

    window.addEventListener('storage', handleStorage);
    const observer = new MutationObserver(handleMutation);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('storage', handleStorage);
      observer.disconnect();
    };
  }, []);

  return theme;
}

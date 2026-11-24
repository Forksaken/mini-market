import { useEffect, useState } from 'react';
import type { ThemeMode } from './theme';

export function getSavedTheme(): ThemeMode | null {
  try {
    const value = localStorage.getItem('mini-market-theme');
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function useTheme() {
  const [preference, setPreference] = useState(getSavedTheme);
  const [systemTheme, setSystemTheme] = useState<ThemeMode>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const mode = preference ?? systemTheme;

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setSystemTheme(media.matches ? 'dark' : 'light');
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  function toggleTheme() {
    const next = mode === 'light' ? 'dark' : 'light';
    setPreference(next);
    try {
      localStorage.setItem('mini-market-theme', next);
    } catch {
      // Переключение работает и при недоступном localStorage.
    }
  }

  return { mode, toggleTheme };
}

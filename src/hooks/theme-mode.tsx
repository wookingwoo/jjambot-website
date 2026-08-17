import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'jjambot-app:theme-mode';

interface ThemeModeContextValue {
  /** 사용자가 명시적으로 고른 모드. 아직 고르지 않았으면 null(시스템 설정을 따름). */
  override: ThemeMode | null;
  /** 실제로 화면에 적용되는 모드. */
  scheme: ThemeMode;
  toggle: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<ThemeMode | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark') setOverride(stored);
    });
  }, []);

  const scheme: ThemeMode = override ?? (systemScheme === 'dark' ? 'dark' : 'light');

  const toggle = () => {
    const next: ThemeMode = scheme === 'dark' ? 'light' : 'dark';
    setOverride(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  };

  return <ThemeModeContext.Provider value={{ override, scheme, toggle }}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return ctx;
}

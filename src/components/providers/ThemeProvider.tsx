'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme | string;
  setTheme: (theme: Theme | string) => void;
  resolvedTheme: 'light' | 'dark';
  themes: string[];
  systemTheme?: 'light' | 'dark';
  forcedTheme?: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'theme';
const THEMES = ['light', 'dark', 'system'];

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: Theme | string;
  enableSystem?: boolean;
  storageKey?: string;
  forcedTheme?: string;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  storageKey = STORAGE_KEY,
  forcedTheme,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Helper to get system theme
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Initialize theme from storage on mount
  useEffect(() => {
    setMounted(true);
    const sys = getSystemTheme();
    setSystemTheme(sys);

    try {
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme) {
        setThemeState(savedTheme);
      } else {
        setThemeState(defaultTheme);
      }
    } catch (e) {
      console.warn('Unable to access localStorage for theme:', e);
    }
  }, [defaultTheme, getSystemTheme, storageKey]);

  // Listen for system theme media query changes
  useEffect(() => {
    if (!enableSystem || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystem]);

  // Listen for cross-tab storage changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey]);

  // Apply theme class/attribute to <html> root
  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;

    const root = document.documentElement;
    const currentTheme = forcedTheme || theme;
    const resolved = currentTheme === 'system' ? systemTheme : currentTheme;

    if (attribute === 'class') {
      root.classList.remove('light', 'dark');
      if (resolved === 'dark' || resolved === 'light') {
        root.classList.add(resolved);
      }
    } else {
      if (resolved) {
        root.setAttribute(attribute, resolved);
      } else {
        root.removeAttribute(attribute);
      }
    }
  }, [theme, systemTheme, forcedTheme, mounted, attribute]);

  const setTheme = useCallback(
    (newTheme: Theme | string) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        console.error('Failed to save theme in localStorage:', e);
      }
    },
    [storageKey]
  );

  const resolvedTheme = (forcedTheme || (theme === 'system' ? systemTheme : theme)) === 'light' ? 'light' : 'dark';

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme: forcedTheme || theme,
      setTheme,
      resolvedTheme,
      themes: THEMES,
      systemTheme,
      forcedTheme,
    }),
    [forcedTheme, theme, setTheme, resolvedTheme, systemTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'system',
      setTheme: () => {},
      resolvedTheme: 'dark',
      themes: THEMES,
      systemTheme: 'dark',
    };
  }
  return context;
}

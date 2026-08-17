import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "jjambot-theme";
const THEME_COLOR = { light: "#f6f3e9", dark: "#14160e" };

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme, explicit: boolean) {
  const root = document.documentElement;
  if (explicit) {
    root.setAttribute("data-theme", theme);
  } else {
    root.removeAttribute("data-theme");
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}

/** Theme state synced to <html data-theme>, localStorage, and the OS
 *  preference when the user hasn't made an explicit choice yet. */
export function useTheme() {
  const [explicit] = useState(() => getStoredTheme() !== null);
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? getSystemTheme());
  const [isExplicit, setIsExplicit] = useState(explicit);

  useEffect(() => {
    applyTheme(theme, isExplicit);
  }, [theme, isExplicit]);

  useEffect(() => {
    if (isExplicit) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(mql.matches ? "dark" : "light");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [isExplicit]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      setIsExplicit(true);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}

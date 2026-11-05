"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

type Theme = "light" | "dark";
const darkPreference = "(prefers-color-scheme: dark)";
let sessionTheme: Theme | undefined;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function readTheme(): Theme {
  if (sessionTheme) return sessionTheme;
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Fall back to the system preference when storage is unavailable.
  }
  return window.matchMedia(darkPreference).matches ? "dark" : "light";
}

function subscribeToTheme(update: () => void) {
  const media = window.matchMedia(darkPreference);
  media.addEventListener("change", update);
  window.addEventListener("storage", update);
  window.addEventListener("theme-change", update);
  return () => {
    media.removeEventListener("change", update);
    window.removeEventListener("storage", update);
    window.removeEventListener("theme-change", update);
  };
}

function toggleTheme() {
  const next = readTheme() === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("theme", next);
    sessionTheme = undefined;
  } catch {
    sessionTheme = next;
  }
  window.dispatchEvent(new Event("theme-change"));
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribeToTheme, readTheme, () => "light");

  useEffect(() => {
    document.documentElement.dataset.theme = readTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

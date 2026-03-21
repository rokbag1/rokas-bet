"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export function useThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    //Apsauga, jei ateityje naudosiu SSR
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const effectiveTheme = theme === "system" ? systemTheme : theme;

    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);

    localStorage.setItem("theme", theme);

    return () => {
      root.classList.remove(effectiveTheme);
    };
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}

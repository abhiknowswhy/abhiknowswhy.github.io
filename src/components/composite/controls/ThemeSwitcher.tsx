import React, { useState, useEffect } from "react";
import { styles } from "./ThemeSwitcher.styles";

const THEME_KEY = "portfolio-theme";
const THEMES = ["light", "dark", "neon", "glassmorphism"] as const;
type Theme = typeof THEMES[number];

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return (savedTheme && THEMES.includes(savedTheme as Theme)) ? savedTheme as Theme : "light";
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const getNextTheme = (currentTheme: Theme): Theme => {
    const currentIndex = THEMES.indexOf(currentTheme);
    return THEMES[(currentIndex + 1) % THEMES.length];
  };

  const getThemeIcon = (currentTheme: Theme): string => {
    switch (currentTheme) {
      case "light": return "☀️";
      case "dark": return "🌙";
      case "neon": return "⚡";
      case "glassmorphism": return "💎";
      default: return "☀️";
    }
  };

  return (
    <button
      className={styles.button}
      onClick={() => setTheme(getNextTheme(theme))}
      aria-label={`Switch to ${getNextTheme(theme)} theme`}
      title={`Current: ${theme} theme. Click to switch to ${getNextTheme(theme)} theme.`}
    >
      <span className={styles.icon}>{getThemeIcon(theme)}</span>
    </button>
  );
};

export { ThemeSwitcher };

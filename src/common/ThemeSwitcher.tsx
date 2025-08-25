import React, { useState, useEffect } from "react";

const THEME_KEY = "portfolio-theme";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem(THEME_KEY) || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <button
      className="fixed top-4 right-4 z-50 p-2 rounded bg-secondary text-white shadow"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeSwitcher;

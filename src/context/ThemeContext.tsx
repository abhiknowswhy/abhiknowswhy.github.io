import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext, type Theme, type ThemeContextType } from '../contexts/theme-context';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window === 'undefined') {
			return 'light';
		}
		const savedTheme = localStorage.getItem('theme') as Theme;
		if (savedTheme) {
			return savedTheme;
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	});

	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const root = window.document.documentElement;
		const newResolvedTheme = theme;
		setResolvedTheme(newResolvedTheme);
		
		// Set data-theme attribute for both custom CSS and Tailwind dark mode
		root.setAttribute('data-theme', newResolvedTheme);
	}, [theme]);

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	const value: ThemeContextType = {
		theme,
		setTheme,
		resolvedTheme,
	};

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
}

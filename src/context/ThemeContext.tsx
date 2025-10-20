import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext, type Theme, type ThemeContextType } from '../contexts/theme-context';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== 'undefined') {
			return (localStorage.getItem('theme') as Theme) || 'light';
		}
		return 'light';
	});

	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const root = window.document.documentElement;

		const updateTheme = () => {
			const newResolvedTheme = theme;
			setResolvedTheme(newResolvedTheme);

			root.classList.remove('light', 'dark');
			root.classList.add(newResolvedTheme);
			root.setAttribute('data-theme', newResolvedTheme);
		};

		updateTheme();
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

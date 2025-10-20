import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const navigationItems = [
	{ name: 'Home', href: '/' },
	{ name: 'About', href: '/about' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Personal', href: '/personal' },
	{ name: 'Contact', href: '/contact' },
];

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const getThemeIcon = () => {
		switch (theme) {
			case 'light':
				return <Sun className="w-5 h-5" />;
			case 'dark':
				return <Moon className="w-5 h-5" />;
			default:
				return <Sun className="w-5 h-5" />;
		}
	};

	const cycleTheme = () => {
		const themes: Array<'light' | 'dark'> = ['light', 'dark'];
		const currentIndex = themes.indexOf(theme as 'light' | 'dark');
		const nextIndex = (currentIndex + 1) % themes.length;
		setTheme(themes[nextIndex]);
	};

	return (
		<motion.nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? 'glass-nav backdrop-blur-md shadow-lg' : 'bg-transparent'
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link
						to="/"
						className="text-xl font-bold gradient-text"
					>
						Portfolio
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navigationItems.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
									location.pathname === item.href
										? 'text-primary-600 dark:text-primary-400'
										: 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
								}`}
							>
								{item.name}
								{location.pathname === item.href && (
									<motion.div
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
										layoutId="activeTab"
										initial={false}
									/>
								)}
							</Link>
						))}
            
						{/* Theme Toggle */}
						<button
							onClick={cycleTheme}
							className="p-2 rounded-lg glass-card hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
							aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
						>
							{getThemeIcon()}
						</button>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center space-x-4">
						<button
							onClick={cycleTheme}
							className="p-2 rounded-lg glass-card hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
							aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
						>
							{getThemeIcon()}
						</button>
            
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 rounded-lg glass-card hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
							aria-label="Toggle menu"
						>
							{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				<motion.div
					className="md:hidden"
					initial={false}
					animate={{
						height: isOpen ? 'auto' : 0,
						opacity: isOpen ? 1 : 0,
					}}
					transition={{ duration: 0.3 }}
					style={{ overflow: 'hidden' }}
				>
					<div className="px-2 pt-2 pb-3 space-y-1 glass-card mt-2 rounded-lg">
						{navigationItems.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
									location.pathname === item.href
										? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
										: 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
								}`}
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</Link>
						))}
					</div>
				</motion.div>
			</div>
		</motion.nav>
	);
}

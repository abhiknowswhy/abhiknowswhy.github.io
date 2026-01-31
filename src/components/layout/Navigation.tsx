import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigationItems = [
	{ name: 'Home', href: '/' },
	{ name: 'About', href: '/about' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Personal', href: '/personal' },
	{ name: 'Contact', href: '/contact' },
];

export default function Navigation() {
	const location = useLocation();
	const { theme, setTheme } = useTheme();

	const getThemeIcon = () => {
		switch (theme) {
			case 'light':
				return <Sun className="w-5 h-5" />;
			case 'dark':
				return <Moon className="w-5 h-5 text-white" />;
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
			className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav backdrop-blur-md shadow-lg"
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
            
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button
									className="p-2 rounded-lg glass-card hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
									aria-label="Toggle menu"
								>
									<Menu className="w-6 h-6 text-gray-800 dark:text-white" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								{navigationItems.map((item, index) => (
									<div key={item.name}>
										<DropdownMenuItem asChild>
											<Link
												to={item.href}
												className={`w-full cursor-pointer ${
													location.pathname === item.href
														? 'text-primary-600 dark:text-primary-400 font-medium'
														: ''
												}`}
											>
												{item.name}
											</Link>
										</DropdownMenuItem>
										{index < navigationItems.length - 1 && <DropdownMenuSeparator />}
									</div>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</motion.nav>
	);
}

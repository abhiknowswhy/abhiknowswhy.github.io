import { FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaMedium, FaGoodreads } from 'react-icons/fa6';
import { SiLeetcode, SiBuymeacoffee } from 'react-icons/si';
import type { IconType } from 'react-icons';

// Centralized social icons mapping - add new social icons here
export const socialIcons: Record<string, IconType> = {
	github: FaGithub,
	linkedin: FaLinkedin,
	twitter: FaTwitter,
	youtube: FaYoutube,
	medium: FaMedium,
	leetcode: SiLeetcode,
	goodreads: FaGoodreads,
	buymeacoffee: SiBuymeacoffee,
};

// Gradient colors for social icons (used in Contact page cards)
export const socialColors: Record<string, string> = {
	github: 'from-gray-700 to-gray-900',
	linkedin: 'from-blue-600 to-blue-800',
	twitter: 'from-sky-400 to-sky-600',
	youtube: 'from-red-500 to-red-700',
	medium: 'from-gray-800 to-black',
	leetcode: 'from-amber-500 to-orange-600',
	goodreads: 'from-amber-700 to-amber-900',
	buymeacoffee: 'from-yellow-400 to-yellow-600',
};

// Brand icon colors for inline icons (Home, Footer, etc.)
export const socialIconColors: Record<string, string> = {
	github: 'text-gray-900 dark:text-white',
	linkedin: 'text-[#0A66C2]',
	twitter: 'text-[#1DA1F2]',
	youtube: 'text-[#FF0000]',
	medium: 'text-gray-900 dark:text-white',
	leetcode: 'text-[#FFA116]',
	goodreads: 'text-[#553B08]',
	buymeacoffee: 'text-[#FFDD00]',
};

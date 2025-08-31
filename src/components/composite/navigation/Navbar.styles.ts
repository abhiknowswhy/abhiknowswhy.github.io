import { twMerge } from 'tailwind-merge';

export const styles = {
  nav: twMerge(
    'w-full flex items-center justify-between px-8 py-5',
    'transition-all duration-300 ease-in-out',
    'bg-white/80 backdrop-blur-xl text-gray-900 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-gray-200/50',
    'dark:bg-gray-900/80 dark:text-white dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] dark:border-gray-800/50',
    '[.neon_&]:bg-black/90 [.neon_&]:text-cyan-400 [.neon_&]:border-b-2 [.neon_&]:border-cyan-400 [.neon_&]:shadow-[0_8px_32px_rgba(0,255,255,0.15)]',
    '[.glassmorphism_&]:bg-white/10 [.glassmorphism_&]:text-white [.glassmorphism_&]:backdrop-blur-2xl [.glassmorphism_&]:border-b [.glassmorphism_&]:border-white/20 [.glassmorphism_&]:shadow-[0_8px_32px_rgba(255,255,255,0.1)]'
  ),
  
  logoContainer: 'flex items-center space-x-4',
  
  logo: 'h-10 w-10',
  
  brandName: twMerge(
    'font-bold text-2xl tracking-tight',
    'text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text',
    'dark:text-white dark:from-white dark:to-gray-300',
    '[.neon_&]:text-cyan-400 [.neon_&]:font-extrabold [.neon_&]:tracking-wider [.neon_&]:from-cyan-400 [.neon_&]:to-cyan-300',
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:font-semibold [.glassmorphism_&]:from-white [.glassmorphism_&]:to-gray-200'
  ),
  
  desktopNav: 'flex items-center justify-between flex-1 ml-16',
  
  menuList: 'flex items-center space-x-12 list-none',
  
  menuItem: twMerge(
    'relative group cursor-pointer transition-all duration-500 ease-out font-medium px-8 py-4 rounded-2xl',
    'hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:scale-110 hover:shadow-lg',
    'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-gray-100/50 before:to-transparent before:opacity-0 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100 hover:before:opacity-100',
    'text-gray-700 hover:text-gray-900',
    'dark:text-gray-300 dark:hover:text-white',
    '[.neon_&]:text-cyan-400 [.neon_&]:hover:text-cyan-300 [.neon_&]:hover:bg-cyan-400/10 [.neon_&]:hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] [.neon_&]:before:via-cyan-400/20',
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:hover:text-white/90 [.glassmorphism_&]:hover:bg-white/10 [.glassmorphism_&]:before:via-white/20'
  ),
  
  menuLink: twMerge(
    'block w-full h-full text-inherit no-underline text-center font-semibold',
    'transition-all duration-500 ease-out',
    '!text-inherit hover:!text-inherit'
  ),
  
  themeSwitcherContainer: 'flex-shrink-0 ml-8',
  
  mobileMenuButton: twMerge(
    'p-3 rounded-xl transition-all duration-300 flex-shrink-0',
    'hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:scale-105',
    'text-gray-700 hover:text-gray-900',
    'dark:text-gray-300 dark:hover:text-white',
    '[.neon_&]:text-cyan-400 [.neon_&]:hover:bg-cyan-400/10 [.neon_&]:hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:hover:bg-white/10'
  ),
  
  hamburgerIcon: 'relative w-6 h-6 flex flex-col justify-center items-center space-y-1.5',
  
  hamburgerLine: twMerge(
    'w-6 h-0.5 rounded-full transition-all duration-300 ease-in-out',
    'bg-gray-700',
    'dark:bg-gray-300',
    '[.neon_&]:bg-cyan-400',
    '[.glassmorphism_&]:bg-white'
  ),
  
  mobileMenuOverlay: twMerge(
    'w-full h-full',
    'bg-black/60 backdrop-blur-md',
    'dark:bg-black/80',
    '[.neon_&]:bg-black/90 [.neon_&]:backdrop-blur-lg',
    '[.glassmorphism_&]:bg-black/70 [.glassmorphism_&]:backdrop-blur-2xl'
  ),
  
  mobileMenuContent: twMerge(
    'w-full h-full p-8 shadow-2xl transform transition-all duration-500 ease-out',
    'bg-white/95 backdrop-blur-xl border-l border-gray-200/50',
    'dark:bg-gray-900/95 dark:border-gray-800/50',
    '[.neon_&]:bg-black/95 [.neon_&]:border-l [.neon_&]:border-cyan-400 [.neon_&]:shadow-[0_0_60px_rgba(0,255,255,0.4)]',
    '[.glassmorphism_&]:bg-white/20 [.glassmorphism_&]:border-l [.glassmorphism_&]:border-white/30 [.glassmorphism_&]:backdrop-blur-2xl'
  ),
  
  mobileMenuHeader: 'flex items-center justify-between mb-10',
  
  mobileMenuTitle: twMerge(
    'text-xl font-bold',
    'text-gray-900',
    'dark:text-white',
    '[.neon_&]:text-cyan-400',
    '[.glassmorphism_&]:text-white'
  ),
  
  mobileMenuCloseButton: twMerge(
    'p-3 rounded-xl transition-all duration-300',
    'hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:scale-105',
    'text-gray-500 hover:text-gray-700',
    'dark:text-gray-400 dark:hover:text-gray-200',
    '[.neon_&]:text-cyan-400 [.neon_&]:hover:bg-cyan-400/10',
    '[.glassmorphism_&]:text-white/80 [.glassmorphism_&]:hover:bg-white/10 [.glassmorphism_&]:hover:text-white'
  ),
  
  mobileMenuList: 'space-y-3 mb-10 list-none',
  
  mobileMenuItem: twMerge(
    'block py-4 px-6 rounded-xl transition-all duration-300 font-medium',
    'hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:scale-105',
    'text-gray-700 hover:text-gray-900',
    'dark:text-gray-300 dark:hover:text-white',
    '[.neon_&]:text-cyan-400 [.neon_&]:hover:bg-cyan-400/10 [.neon_&]:hover:text-cyan-300',
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:hover:bg-white/10'
  ),
  
  mobileMenuLink: twMerge(
    'block w-full h-full text-inherit no-underline',
    'transition-all duration-300',
    '!text-inherit hover:!text-inherit'
  ),
  
  mobileThemeSwitcher: 'flex justify-center'
};

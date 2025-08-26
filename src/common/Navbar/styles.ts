import { twMerge } from 'tailwind-merge';

export const styles = {
  nav: twMerge(
    'w-full flex items-center justify-between p-4 fixed top-0 left-0 z-50',
    'transition-all duration-300 ease-in-out',
    // Light theme (default)
    'bg-primary text-primary-foreground shadow-md',
    // Dark theme
    'dark:bg-primary dark:text-primary-foreground dark:shadow-lg dark:shadow-black/20',
    // Neon theme
    '[.neon_&]:bg-transparent [.neon_&]:text-neon-text [.neon_&]:border-b-2 [.neon_&]:border-neon-accent [.neon_&]:shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    // Glassmorphism theme
    '[.glassmorphism_&]:bg-white/10 [.glassmorphism_&]:text-white [.glassmorphism_&]:backdrop-blur-md [.glassmorphism_&]:border-b [.glassmorphism_&]:border-white/20 [.glassmorphism_&]:shadow-lg'
  ),
  
  logoContainer: 'flex items-center',
  
  logo: 'h-8 mr-2',
  
  brandName: twMerge(
    'font-bold text-lg',
    // Light theme
    'text-primary-foreground',
    // Dark theme
    'dark:text-primary-foreground',
    // Neon theme
    '[.neon_&]:text-neon-text [.neon_&]:font-extrabold',
    // Glassmorphism theme
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:font-semibold'
  ),
  
  menuList: 'hidden md:flex space-x-6',
  
  menuItem: twMerge(
    'hover:underline cursor-pointer transition-all duration-200',
    // Light theme
    'text-primary-foreground hover:text-primary-foreground/80',
    // Dark theme
    'dark:text-primary-foreground dark:hover:text-primary-foreground/80',
    // Neon theme
    '[.neon_&]:text-neon-text [.neon_&]:hover:text-neon-accent [.neon_&]:hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]',
    // Glassmorphism theme
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:hover:text-white/80 [.glassmorphism_&]:hover:bg-white/10 [.glassmorphism_&]:px-2 [.glassmorphism_&]:py-1 [.glassmorphism_&]:rounded'
  ),
  
  mobileMenuButton: twMerge(
    'md:hidden p-2 rounded transition-all duration-200',
    // Light theme
    'text-primary-foreground hover:bg-primary-foreground/10',
    // Dark theme
    'dark:text-primary-foreground dark:hover:bg-primary-foreground/10',
    // Neon theme
    '[.neon_&]:text-neon-text [.neon_&]:hover:bg-neon-accent/20 [.neon_&]:hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]',
    // Glassmorphism theme
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:hover:bg-white/20 [.glassmorphism_&]:backdrop-blur-sm'
  )
};

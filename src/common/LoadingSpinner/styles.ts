import { twMerge } from 'tailwind-merge';

export const styles = {
  container: 'flex items-center justify-center',
  
  spinner: twMerge(
    'animate-spin h-8 w-8 transition-all duration-300 ease-in-out',
    // Light theme (default)
    'text-primary',
    // Dark theme
    'dark:text-primary',
    // Neon theme
    '[.neon_&]:text-neon-accent [.neon_&]:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]',
    // Glassmorphism theme
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'
  ),
  
  circle: twMerge(
    'opacity-25',
    // Light theme (default)
    'stroke-current',
    // Dark theme
    'dark:stroke-current',
    // Neon theme
    '[.neon_&]:stroke-neon-accent',
    // Glassmorphism theme
    '[.glassmorphism_&]:stroke-white'
  ),
  
  path: twMerge(
    'opacity-75 fill-current',
    // Light theme (default)
    'fill-current',
    // Dark theme
    'dark:fill-current',
    // Neon theme
    '[.neon_&]:fill-neon-accent',
    // Glassmorphism theme
    '[.glassmorphism_&]:fill-white'
  )
};

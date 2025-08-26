import { twMerge } from 'tailwind-merge';

export const styles = {
  footer: twMerge(
    'w-full text-center py-4 mt-auto transition-all duration-300 ease-in-out',
    // Light theme (default)
    'bg-primary text-primary-foreground shadow-md',
    // Dark theme
    'dark:bg-primary dark:text-primary-foreground dark:shadow-lg dark:shadow-black/20',
    // Neon theme
    '[.neon_&]:bg-transparent [.neon_&]:text-neon-text [.neon_&]:border-t-2 [.neon_&]:border-neon-accent [.neon_&]:shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    // Glassmorphism theme
    '[.glassmorphism_&]:bg-white/10 [.glassmorphism_&]:text-white [.glassmorphism_&]:backdrop-blur-md [.glassmorphism_&]:border-t [.glassmorphism_&]:border-white/20 [.glassmorphism_&]:shadow-lg'
  ),
  
  text: twMerge(
    'text-sm',
    // Light theme
    'text-primary-foreground',
    // Dark theme
    'dark:text-primary-foreground',
    // Neon theme
    '[.neon_&]:text-neon-text [.neon_&]:font-medium',
    // Glassmorphism theme
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:font-medium'
  )
};

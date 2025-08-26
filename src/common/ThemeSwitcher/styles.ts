import { twMerge } from 'tailwind-merge';

export const styles = {
  button: twMerge(
    'fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out',
    'hover:scale-110 active:scale-95',
    // Light theme (default)
    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    // Dark theme
    'dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80',
    // Neon theme
    '[.neon_&]:bg-neon-accent [.neon_&]:text-neon-bg [.neon_&]:shadow-[0_0_20px_rgba(0,255,255,0.5)] [.neon_&]:hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] [.neon_&]:border-2 [.neon_&]:border-neon-text',
    // Glassmorphism theme
    '[.glassmorphism_&]:bg-white/20 [.glassmorphism_&]:text-white [.glassmorphism_&]:backdrop-blur-md [.glassmorphism_&]:border [.glassmorphism_&]:border-white/30 [.glassmorphism_&]:hover:bg-white/30 [.glassmorphism_&]:shadow-[0_8px_32px_rgba(31,38,135,0.37)]'
  ),
  
  icon: 'text-lg'
};

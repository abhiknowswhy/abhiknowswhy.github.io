import { twMerge } from 'tailwind-merge';

export const styles = {
  button: twMerge(
    'p-4 rounded-full shadow-2xl transition-all duration-300 ease-in-out',
    'hover:scale-110 active:scale-95',
    'bg-primary text-primary-foreground hover:bg-secondary',
    'dark:bg-primary dark:text-primary-foreground dark:hover:bg-secondary',
    '[.neon_&]:bg-neon-accent [.neon_&]:text-neon-bg [.neon_&]:shadow-[0_0_20px_rgba(0,255,255,0.5)] [.neon_&]:hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] [.neon_&]:border-2 [.neon_&]:border-neon-text [.neon_&]:hover:bg-neon-text [.neon_&]:hover:text-neon-bg',
    '[.glassmorphism_&]:bg-white/20 [.glassmorphism_&]:text-white [.glassmorphism_&]:backdrop-blur-md [.glassmorphism_&]:border [.glassmorphism_&]:border-white/30 [.glassmorphism_&]:hover:bg-white/30 [.glassmorphism_&]:shadow-[0_8px_32px_rgba(31,38,135,0.37)]'
  ),
  
  arrow: 'text-xl font-bold'
};

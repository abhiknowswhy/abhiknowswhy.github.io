import { twMerge } from 'tailwind-merge';

export const styles = {
  footer: twMerge(
    'w-full text-center py-4 mt-auto transition-all duration-300 ease-in-out',
    'bg-primary text-primary-foreground shadow-md',
    'dark:bg-primary dark:text-primary-foreground dark:shadow-lg dark:shadow-black/20',
    '[.neon_&]:bg-transparent [.neon_&]:text-neon-text [.neon_&]:border-t-2 [.neon_&]:border-neon-accent [.neon_&]:shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    '[.glassmorphism_&]:bg-white/10 [.glassmorphism_&]:text-white [.glassmorphism_&]:backdrop-blur-md [.glassmorphism_&]:border-t [.glassmorphism_&]:border-white/20 [.glassmorphism_&]:shadow-lg'
  ),
  
  text: twMerge(
    'text-sm',
    'text-primary-foreground',
    'dark:text-primary-foreground',
    '[.neon_&]:text-neon-text [.neon_&]:font-medium',
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:font-medium'
  )
};

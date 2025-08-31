import { twMerge } from 'tailwind-merge';

export const styles = {
  container: 'flex items-center justify-center',
  
  spinner: twMerge(
    'animate-spin h-8 w-8 transition-all duration-300 ease-in-out',
    'text-primary',
    'dark:text-primary',
    '[.neon_&]:text-neon-accent [.neon_&]:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]',
    '[.glassmorphism_&]:text-white [.glassmorphism_&]:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'
  ),
  
  circle: twMerge(
    'opacity-25',
    'stroke-current',
    'dark:stroke-current',
    '[.neon_&]:stroke-neon-accent',
    '[.glassmorphism_&]:stroke-white'
  ),
  
  path: twMerge(
    'opacity-75 fill-current',
    'fill-current',
    'dark:fill-current',
    '[.neon_&]:fill-neon-accent',
    '[.glassmorphism_&]:fill-white'
  )
};

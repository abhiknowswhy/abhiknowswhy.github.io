import { twMerge } from 'tailwind-merge';

export const styles = {
  button: twMerge(
    'p-1.5 rounded-full transition-all duration-200 ease-out',
    'hover:scale-110 active:scale-95',
    'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm',
    'dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:shadow-lg',
    '[.neon_&]:bg-black [.neon_&]:text-cyan-400 [.neon_&]:hover:bg-gray-900 [.neon_&]:hover:text-cyan-300 [.neon_&]:shadow-[0_0_10px_rgba(0,255,255,0.3)]',
    '[.glassmorphism_&]:bg-white/30 [.glassmorphism_&]:text-white [.glassmorphism_&]:backdrop-blur-md [.glassmorphism_&]:hover:bg-white/40 [.glassmorphism_&]:shadow-[0_4px_16px_rgba(255,255,255,0.2)]'
  ),
  
  icon: 'text-base font-normal'
};

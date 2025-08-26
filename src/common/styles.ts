import { twMerge } from 'tailwind-merge';

export const styles = {
  container: twMerge(
    'min-h-screen flex flex-col transition-all duration-300 ease-in-out',
    // Light theme (default)
    'bg-background text-foreground',
    // Dark theme
    'dark:bg-background dark:text-foreground',
    // Neon theme
    '[.neon_&]:bg-neon-bg [.neon_&]:text-neon-text',
    // Glassmorphism theme
    '[.glassmorphism_&]:bg-gradient-to-br [.glassmorphism_&]:from-blue-900/90 [.glassmorphism_&]:via-purple-900/90 [.glassmorphism_&]:to-pink-900/90 [.glassmorphism_&]:text-white'
  ),
  
  main: twMerge(
    'flex-1 container mx-auto px-4 py-8 transition-all duration-300 ease-in-out',
    // Light theme (default)
    'bg-background',
    // Dark theme
    'dark:bg-background',
    // Neon theme
    '[.neon_&]:bg-neon-bg',
    // Glassmorphism theme
    '[.glassmorphism_&]:bg-transparent'
  ),
  
  loadingContainer: 'flex-1 flex items-center justify-center'
};

import { twMerge } from 'tailwind-merge';

export const styles = {
  container: twMerge(
    'min-h-screen flex flex-col transition-all duration-300 ease-in-out',
    'bg-background text-foreground',
    'dark:bg-background dark:text-foreground',
    '[.neon_&]:bg-neon-bg [.neon_&]:text-neon-text',
    '[.glassmorphism_&]:bg-gradient-to-br [.glassmorphism_&]:from-blue-900/90 [.glassmorphism_&]:via-purple-900/90 [.glassmorphism_&]:to-pink-900/90 [.glassmorphism_&]:text-white'
  ),
  
  main: twMerge(
    // Fill remaining space and center content
    'flex-1 flex items-center justify-center',
    // Spacing and navbar offset
    'px-4 py-8 pt-24 transition-all duration-300 ease-in-out',
    // Theme compatibility
    'bg-background',
    'dark:bg-background',
    '[.neon_&]:bg-neon-bg',
    '[.glassmorphism_&]:bg-transparent'
  ),
  
  loadingContainer: 'flex-1 flex items-center justify-center'
};

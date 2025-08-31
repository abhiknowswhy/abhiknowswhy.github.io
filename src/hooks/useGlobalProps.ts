import { useState, useEffect } from 'react';
import type { GlobalProps } from '../types/globalProps';

export const useGlobalProps = (): GlobalProps => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const checkViewMode = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      
      // Simple threshold logic
      const newViewMode = aspectRatio >= 1.0 ? 'desktop' : 'mobile';
      
      setViewMode(prev => prev !== newViewMode ? newViewMode : prev);
    };

    // Debounced resize
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkViewMode, 150);
    };

    checkViewMode(); // Initial check
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { viewMode };
};

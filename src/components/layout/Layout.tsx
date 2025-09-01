'use client';

import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import ErrorBoundary from '../ErrorBoundary';
import SkipToContent from '../ui/SkipToContent';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SkipToContent />
      <Navigation />
      <main id="main-content" className="flex-grow pt-16 relative z-10" role="main">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </ErrorBoundary>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

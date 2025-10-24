'use client';

import type { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import ErrorBoundary from '../ErrorBoundary';
import SkipToContent from '../ui/SkipToContent';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
			<SkipToContent />
			<Navigation />
			<main id="main-content" className="flex-grow pt-16 relative z-10" role="main">
				<ErrorBoundary>
					{children}
				</ErrorBoundary>
			</main>
			<Footer />
			<ScrollToTop />
		</div>
	);
}

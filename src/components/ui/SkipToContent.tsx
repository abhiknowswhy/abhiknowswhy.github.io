import { useRef } from 'react';

export default function SkipToContent() {
	const skipRef = useRef<HTMLAnchorElement>(null);

	const handleSkipToContent = () => {
		// Skip to main content when the link is clicked
		document.getElementById('main-content')?.focus();
		document.getElementById('main-content')?.scrollIntoView();
	};

	return (
		<a
			href="#main-content"
			ref={skipRef}
			onClick={handleSkipToContent}
			className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:dark:bg-gray-800 focus:text-primary-600 focus:dark:text-primary-400 focus:shadow-lg focus:rounded-md focus:outline-none"
		>
			Skip to content
		</a>
	);
}

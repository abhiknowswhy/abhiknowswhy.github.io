import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Music, BookOpen, MapPin, Clock, ExternalLink, Star } from 'lucide-react';
import { MarqueeCarousel, type CardRenderer, plainCardStyle } from '@/components/ui/marquee-carousel';
import type { GoodreadsBook } from '@/types/data';
import booksData from '../data/generated/books.json';

const tabData = [
	{
		id: 'library',
		label: 'Library',
		icon: BookOpen,
		gradient: 'from-emerald-500 to-teal-600',
	},
	{
		id: 'music',
		label: 'Music',
		icon: Music,
		gradient: 'from-purple-500 to-pink-600',
	},
	{
		id: 'cooking',
		label: 'Cooking',
		icon: Utensils,
		gradient: 'from-orange-500 to-red-600',
	},
	{
		id: 'travel',
		label: 'Travel',
		icon: MapPin,
		gradient: 'from-blue-500 to-indigo-600',
	},
];

// Get books from JSON (fetched from Goodreads RSS at build time)
const currentlyReading: GoodreadsBook[] = booksData.currentlyReading;
const readBooks: GoodreadsBook[] = booksData.readBooks;

// Concrete Book Card Component — pure content renderer (style-agnostic)
function BookCard({ item: book, isCurrentlyReading = false }: { item: GoodreadsBook; index?: number; isCurrentlyReading?: boolean }) {
	return (
		<a
			href={book.link}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 block h-full"
		>
			<div className="aspect-[2/3] overflow-hidden">
				<img
					src={book.cover}
					alt={book.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					loading="lazy"
				/>
			</div>
			<div className="p-3">
				<h4 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
					{book.title}
				</h4>
				<p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
					{book.author}
				</p>
				{!isCurrentlyReading && book.rating > 0 && (
					<div className="flex items-center gap-0.5">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`w-3 h-3 ${
									i < book.rating
										? 'text-yellow-400 fill-yellow-400'
										: 'text-gray-300 dark:text-gray-600'
								}`}
							/>
						))}
					</div>
				)}
				{isCurrentlyReading && (
					<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
						<BookOpen className="w-3 h-3" />
						Reading
					</span>
				)}
			</div>
		</a>
	);
}

/**
 * Concrete CardRenderer<Book> — the strategy injected into MarqueeCarousel.
 * Uses the `component` approach so the carousel renders BookCard directly.
 */
const bookCardRenderer: CardRenderer<GoodreadsBook> = {
	component: BookCard,
};

const currentlyReadingCardRenderer: CardRenderer<GoodreadsBook> = {
	render: (book, index) => <BookCard item={book} index={index} isCurrentlyReading />,
};

// Library Component with books from Goodreads RSS
function GoodreadsLibrary() {
	return (
		<div className="space-y-8">
			{/* Currently Reading Marquee */}
			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
				<MarqueeCarousel<GoodreadsBook>
					items={currentlyReading}
					renderCard={currentlyReadingCardRenderer}
					cardStyle={plainCardStyle}
					itemWidth={180}
					gap={16}
					speed={0.5}
					skipCount={2}
					countLabel="books"
					arrowClassName="hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
					header={
						<h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
							<span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
								<BookOpen className="w-4 h-4 text-white" />
							</span>
							Currently Reading
						</h3>
					}
				/>
			</div>

			{/* Read Books Marquee */}
			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
				<MarqueeCarousel<GoodreadsBook>
					items={readBooks}
					renderCard={bookCardRenderer}
					cardStyle={plainCardStyle}
					itemWidth={180}
					gap={16}
					speed={0.8}
					skipCount={3}
					countLabel="books"
					arrowClassName="hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400"
					header={
						<h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
							<span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
								<BookOpen className="w-4 h-4 text-white" />
							</span>
							Books I've Read
						</h3>
					}
				/>
			</div>
		</div>
	);
}

// Coming Soon Component
function ComingSoon({ title, description, gradient, icon: Icon }: { 
	title: string; 
	description: string; 
	gradient: string;
	icon: React.ElementType;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex flex-col items-center justify-center py-16 px-8"
		>
			<div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-8 shadow-2xl`}>
				<Icon className="w-12 h-12 text-white" />
			</div>
			<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
				{title}
			</h2>
			<p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
				{description}
			</p>
			<div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-600 dark:text-gray-300">
				<Clock className="w-5 h-5" />
				<span className="font-medium">Coming Soon</span>
			</div>
		</motion.div>
	);
}

// Helper to get initial tab from URL hash
const getInitialTab = () => {
	if (typeof window === 'undefined') return 'library';
	const hash = window.location.hash.replace('#', '');
	const validTabs = tabData.map(tab => tab.id);
	return validTabs.includes(hash) ? hash : 'library';
};

export default function Personal() {
	const location = useLocation();
	const [activeTab, setActiveTab] = useState(getInitialTab);

	// Handle hash navigation when hash changes after initial load
	useEffect(() => {
		const hash = location.hash.replace('#', '');
		const validTabs = tabData.map(tab => tab.id);
		if (hash && validTabs.includes(hash)) {
			setActiveTab(hash);
		}
	}, [location.hash]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<motion.div
			className="min-h-screen"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* Content Section */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Compact Header */}
				<motion.div variants={itemVariants} className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						My <span className="gradient-text">Interests</span>
					</h1>
					<p className="mt-1 text-gray-600 dark:text-gray-400">
						Beyond code and design — things that bring me joy and inspiration
					</p>
				</motion.div>
				{/* Tabs */}
				<motion.div variants={itemVariants} className="mb-8">
					<div className="flex flex-wrap justify-center gap-2 sm:gap-4">
						{tabData.map(tab => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
										isActive
											? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
											: 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
									}`}
								>
									<Icon className="w-5 h-5" />
									<span className="hidden sm:inline">{tab.label}</span>
								</button>
							);
						})}
					</div>
				</motion.div>

				{/* Goodreads CTA - visible on library tab */}
				{activeTab === 'library' && (
					<motion.a
						href="https://www.goodreads.com/user/show/178378557-abhiram"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-2 px-5 py-2.5 mb-8 mx-auto w-fit rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<BookOpen className="w-4 h-4" />
						My Goodreads
						<ExternalLink className="w-3.5 h-3.5 opacity-70" />
					</motion.a>
				)}

				{/* Tab Content */}
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				>
					{activeTab === 'library' && <GoodreadsLibrary />}
					
					{activeTab === 'music' && (
						<ComingSoon
							title="Music"
							description="Original compositions, covers, and musical experiments. I love playing piano and exploring different genres."
							gradient="from-purple-500 to-pink-600"
							icon={Music}
						/>
					)}
					
					{activeTab === 'cooking' && (
						<ComingSoon
							title="Cooking"
							description="Recipes, culinary experiments, and food photography. Cooking is my creative outlet and a way to share culture."
							gradient="from-orange-500 to-red-600"
							icon={Utensils}
						/>
					)}
					
					{activeTab === 'travel' && (
						<ComingSoon
							title="Travel"
							description="Adventures and destinations around the world. Exploring new places and cultures is one of my greatest joys."
							gradient="from-blue-500 to-indigo-600"
							icon={MapPin}
						/>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
}

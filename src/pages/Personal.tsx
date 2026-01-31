import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Music, BookOpen, MapPin, Clock, Sparkles, ExternalLink, Star } from 'lucide-react';

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

// Book type definition
interface Book {
	title: string;
	author: string;
	cover: string;
	rating: number;
	link: string;
	dateRead?: string;
}

// Currently reading books (from Goodreads RSS: currently-reading shelf)
const currentlyReading: Book[] = [
	{
		title: 'Into the Wild',
		author: 'Jon Krakauer',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1650755924l/60869516._SY475_.jpg',
		rating: 0,
		link: 'https://www.goodreads.com/book/show/60869516-into-the-wild',
	},
	{
		title: 'The Metamorphosis',
		author: 'Franz Kafka',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1646444605l/485894._SY475_.jpg',
		rating: 0,
		link: 'https://www.goodreads.com/book/show/485894.The_Metamorphosis',
	},
];

// Read books (from Goodreads RSS: read shelf - most recent first)
const readBooks: Book[] = [
	{
		title: 'Designing Data-Intensive Applications',
		author: 'Martin Kleppmann',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1415816873l/23463279._SX318_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications',
		dateRead: '2026',
	},
	{
		title: 'When Breath Becomes Air',
		author: 'Paul Kalanithi',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1492677644l/25899336._SX318_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/25899336-when-breath-becomes-air',
		dateRead: '2025',
	},
	{
		title: 'The System Design Interview',
		author: 'Lewis C. Lin',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1625121264l/58465299._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/58465299-the-system-design-interview',
		dateRead: '2025',
	},
	{
		title: 'The Hard Thing About Hard Things',
		author: 'Ben Horowitz',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386609333l/18176747._SX318_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/18176747-the-hard-thing-about-hard-things',
		dateRead: '2025',
	},
	{
		title: 'Sapiens: A Brief History of Humankind',
		author: 'Yuval Noah Harari',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1703329310l/23692271._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/23692271-sapiens',
		dateRead: '2024',
	},
	{
		title: 'Think Again',
		author: 'Adam M. Grant',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602574232l/55539565._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/55539565-think-again',
		dateRead: '2024',
	},
	{
		title: 'No Rules Rules',
		author: 'Reed Hastings',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1595815356l/49099937._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/49099937-no-rules-rules',
		dateRead: '2024',
	},
	{
		title: 'Hooked',
		author: 'Nir Eyal',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1407112405l/22668729._SY475_.jpg',
		rating: 4,
		link: 'https://www.goodreads.com/book/show/22668729-hooked',
		dateRead: '2024',
	},
	{
		title: 'Same as Ever',
		author: 'Morgan Housel',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680687321l/125116554._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/125116554-same-as-ever',
		dateRead: '2024',
	},
	{
		title: 'Mistborn: The Final Empire',
		author: 'Brandon Sanderson',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1617768316l/68428._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/68428.Mistborn',
		dateRead: '2024',
	},
	{
		title: 'The Forty Rules of Love',
		author: 'Elif Shafak',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442161289l/6642715._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/6642715-the-forty-rules-of-love',
		dateRead: '2024',
	},
	{
		title: 'It Ends with Us',
		author: 'Colleen Hoover',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1688011813l/27362503._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/27362503-it-ends-with-us',
		dateRead: '2024',
	},
	{
		title: 'The Black Swan',
		author: 'Nassim Nicholas Taleb',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1714172313l/242472._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/242472.The_Black_Swan',
		dateRead: '2024',
	},
	{
		title: 'The Psychology of Money',
		author: 'Morgan Housel',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581527774l/41881472._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/41881472-the-psychology-of-money',
		dateRead: '2024',
	},
	{
		title: 'Thinking, Fast and Slow',
		author: 'Daniel Kahneman',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1317793965l/11468377._SX318_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow',
		dateRead: '2024',
	},
	{
		title: 'Atomic Habits',
		author: 'James Clear',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378._SY475_.jpg',
		rating: 4,
		link: 'https://www.goodreads.com/book/show/40121378-atomic-habits',
		dateRead: '2024',
	},
	{
		title: 'Steve Jobs',
		author: 'Walter Isaacson',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1511288482l/11084145._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/11084145-steve-jobs',
		dateRead: '2024',
	},
	{
		title: 'The Almanack of Naval Ravikant',
		author: 'Eric Jorgenson',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598011736l/54898389._SY475_.jpg',
		rating: 5,
		link: 'https://www.goodreads.com/book/show/54898389-the-almanack-of-naval-ravikant',
		dateRead: '2024',
	},
];

// Book Card Component
function BookCard({ book, isCurrentlyReading = false }: { book: Book; isCurrentlyReading?: boolean }) {
	return (
		<motion.a
			href={book.link}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
			whileHover={{ y: -4 }}
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
		</motion.a>
	);
}

// Library Component with books from Goodreads RSS
function GoodreadsLibrary() {
	const [showAllBooks, setShowAllBooks] = useState(false);
	const displayedBooks = showAllBooks ? readBooks : readBooks.slice(0, 12);

	return (
		<div className="space-y-8">
			{/* Currently Reading Section */}
			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
					<span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
						<BookOpen className="w-4 h-4 text-white" />
					</span>
					Currently Reading
				</h3>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{currentlyReading.map((book, index) => (
						<BookCard key={index} book={book} isCurrentlyReading />
					))}
				</div>
			</div>

			{/* Read Books Section */}
			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
						<span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
							<BookOpen className="w-4 h-4 text-white" />
						</span>
						Books I've Read
					</h3>
					<span className="text-sm text-gray-500 dark:text-gray-400">
						{readBooks.length} books
					</span>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{displayedBooks.map((book, index) => (
						<BookCard key={index} book={book} />
					))}
				</div>
				{readBooks.length > 12 && (
					<div className="mt-6 text-center">
						<button
							onClick={() => setShowAllBooks(!showAllBooks)}
							className="px-6 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
						>
							{showAllBooks ? 'Show Less' : `Show All ${readBooks.length} Books`}
						</button>
					</div>
				)}
			</div>

			{/* View on Goodreads Link */}
			<motion.a
				href="https://www.goodreads.com/user/show/178378557-abhiram"
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<ExternalLink className="w-5 h-5" />
				View Full Library on Goodreads
			</motion.a>
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
			{/* Hero Section */}
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-50" />
				<div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
				
				<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
					<motion.div variants={itemVariants} className="text-center">
						<motion.div
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							<Sparkles className="w-4 h-4" />
							Beyond Code
						</motion.div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
							My <span className="gradient-text">Interests</span>
						</h1>
						<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
							Beyond code and design, these are the things that bring me joy and inspiration.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Content Section */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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

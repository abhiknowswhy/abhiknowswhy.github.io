/**
 * Alternative Blog page using Medium RSS feed
 * This is a simpler, RSS-based blog page for comparison
 */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Search, Sparkles } from 'lucide-react';
import { SiMedium } from 'react-icons/si';
import mediumData from '../data/generated/medium-articles.json';

interface Article {
	title: string;
	link: string;
	date: string;
	author: string;
	excerpt: string;
	coverImage: string;
	tags: string[];
	readTime: number;
}

// Gradient backgrounds for cards without images
const cardGradients = [
	'from-blue-500 to-indigo-600',
	'from-purple-500 to-pink-600',
	'from-emerald-500 to-teal-600',
	'from-orange-500 to-red-500',
	'from-cyan-500 to-blue-600',
	'from-rose-500 to-purple-600',
	'from-amber-500 to-orange-600',
	'from-indigo-500 to-purple-600',
];

export default function BlogRSS() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	const articles: Article[] = mediumData.articles;

	// Get all unique tags
	const allTags = useMemo(() => {
		const tags = new Set<string>();
		articles.forEach(article => {
			article.tags.forEach(tag => tags.add(tag));
		});
		return Array.from(tags).sort();
	}, [articles]);

	// Filter articles
	const filteredArticles = useMemo(() => {
		return articles.filter(article => {
			const matchesSearch = searchTerm === '' ||
				article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
				article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
			
			const matchesTag = !selectedTag || article.tags.includes(selectedTag);
			
			return matchesSearch && matchesTag;
		});
	}, [articles, searchTerm, selectedTag]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
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
				<div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl" />

				<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
					<motion.div variants={itemVariants} className="text-center mb-12">
						<motion.div
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							<SiMedium className="w-4 h-4" />
							Powered by Medium RSS
						</motion.div>
						<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
							My <span className="gradient-text">Blogs</span>
						</h1>
						<p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
							Thoughts, tutorials, and insights on software engineering
						</p>
						<p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
							Last updated: {new Date(mediumData.lastUpdated).toLocaleDateString()}
						</p>
					</motion.div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				{/* Search and Filters */}
				<motion.div variants={itemVariants} className="mb-8">
					<div className="flex flex-col sm:flex-row gap-4">
						{/* Search */}
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								type="text"
								placeholder="Search articles..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
						</div>
					</div>

					{/* Tags */}
					<div className="mt-4 flex flex-wrap gap-2">
						<button
							onClick={() => setSelectedTag(null)}
							className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
								!selectedTag
									? 'bg-primary-600 text-white'
									: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
							}`}
						>
							All
						</button>
						{allTags.map(tag => (
							<button
								key={tag}
								onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
								className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
									selectedTag === tag
										? 'bg-primary-600 text-white'
										: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
								}`}
							>
								{tag}
							</button>
						))}
					</div>
				</motion.div>

				{/* Articles Grid */}
				<motion.div 
					variants={containerVariants}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{filteredArticles.map((article, index) => (
						<motion.a
							key={article.link}
							href={article.link}
							target="_blank"
							rel="noopener noreferrer"
							variants={itemVariants}
							whileHover={{ y: -8, scale: 1.02 }}
							className="group block"
						>
							<article className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
								{/* Cover Image or Gradient */}
								<div className="relative h-48 overflow-hidden">
									{article.coverImage ? (
										<img
											src={article.coverImage}
											alt={article.title}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
									) : (
										<div className={`w-full h-full bg-gradient-to-br ${cardGradients[index % cardGradients.length]} flex items-center justify-center`}>
											<Sparkles className="w-16 h-16 text-white/30" />
										</div>
									)}
									{/* Overlay gradient */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
									
									{/* Read time badge */}
									<div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
										<Clock className="w-3 h-3" />
										{article.readTime} min
									</div>
								</div>

								{/* Content */}
								<div className="p-5">
									{/* Tags */}
									<div className="flex flex-wrap gap-1.5 mb-3">
										{article.tags.slice(0, 2).map(tag => (
											<span
												key={tag}
												className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium"
											>
												{tag}
											</span>
										))}
									</div>

									{/* Title */}
									<h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
										{article.title}
									</h2>

									{/* Excerpt */}
									<p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
										{article.excerpt}
									</p>

									{/* Footer */}
									<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
										<div className="flex items-center gap-1">
											<Calendar className="w-3.5 h-3.5" />
											{formatDate(article.date)}
										</div>
										<div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium group-hover:gap-2 transition-all">
											Read on Medium
											<ExternalLink className="w-3.5 h-3.5" />
										</div>
									</div>
								</div>
							</article>
						</motion.a>
					))}
				</motion.div>

				{/* Empty State */}
				{filteredArticles.length === 0 && (
					<motion.div
						variants={itemVariants}
						className="text-center py-16"
					>
						<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
							<Search className="w-8 h-8 text-gray-400" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							No articles found
						</h3>
						<p className="text-gray-600 dark:text-gray-400">
							Try adjusting your search or filter criteria
						</p>
					</motion.div>
				)}

				{/* Follow on Medium CTA */}
				<motion.div
					variants={itemVariants}
					className="mt-12 text-center"
				>
					<a
						href={`https://medium.com/@${mediumData.username}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
					>
						<SiMedium className="w-5 h-5" />
						Follow on Medium
					</a>
				</motion.div>
			</div>
		</motion.div>
	);
}

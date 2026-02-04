/**
 * Alternative Blog page using Medium RSS feed
 * This is a simpler, RSS-based blog page for comparison
 */
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Search, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
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

const ARTICLES_PER_PAGE = 6;

export default function BlogRSS() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

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

	// Reset to page 1 when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedTag]);

	// Pagination
	const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
	const paginatedArticles = useMemo(() => {
		const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
		return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
	}, [filteredArticles, currentPage]);

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
			{/* Main Content */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Compact Header */}
				<motion.div variants={itemVariants} className="mb-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
								My <span className="gradient-text">Blogs</span>
							</h1>
							<p className="mt-1 text-gray-600 dark:text-gray-400">
								Thoughts, tutorials, and insights on software engineering
							</p>
						</div>
						<a
							href={`https://medium.com/@${mediumData.username}`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm"
						>
							<SiMedium className="w-4 h-4" />
							Follow on Medium
						</a>
					</div>
				</motion.div>
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
					{paginatedArticles.map((article, index) => (
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

				{/* Pagination */}
				{totalPages > 1 && (
					<motion.div
						variants={itemVariants}
						className="mt-10 flex items-center justify-center gap-2"
					>
						<button
							onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
							disabled={currentPage === 1}
							className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							aria-label="Previous page"
						>
							<ChevronLeft className="w-5 h-5" />
						</button>
						
						<div className="flex items-center gap-1">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
								<button
									key={page}
									onClick={() => setCurrentPage(page)}
									className={`w-10 h-10 rounded-lg font-medium transition-colors ${
										currentPage === page
											? 'bg-primary-600 text-white'
											: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
									}`}
								>
									{page}
								</button>
							))}
						</div>
						
						<button
							onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
							disabled={currentPage === totalPages}
							className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							aria-label="Next page"
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					</motion.div>
				)}

				{/* Results info */}
				{filteredArticles.length > 0 && (
					<motion.p
						variants={itemVariants}
						className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500"
					>
						Showing {((currentPage - 1) * ARTICLES_PER_PAGE) + 1}-{Math.min(currentPage * ARTICLES_PER_PAGE, filteredArticles.length)} of {filteredArticles.length} articles
					</motion.p>
				)}
			</div>
		</motion.div>
	);
}

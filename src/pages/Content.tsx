import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Search, Sparkles, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { SiMedium } from 'react-icons/si';
import { FaYoutube } from 'react-icons/fa6';
import type { YouTubeVideo } from '@/types/data';
import mediumData from '../data/generated/medium-articles.json';
import youtubeData from '../data/generated/youtube-videos.json';

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

const tabData = [
	{
		id: 'articles',
		label: 'Articles',
		icon: SiMedium,
		gradient: 'from-green-500 to-emerald-600',
	},
	{
		id: 'vlogs',
		label: 'Vlogs',
		icon: FaYoutube,
		gradient: 'from-red-500 to-red-700',
	},
];

// Gradient backgrounds for article cards without images
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

// ─── Articles Tab ──────────────────────────────────────────────────────────────

function ArticlesTab() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

	const articles: Article[] = mediumData.articles;

	const allTags = useMemo(() => {
		const tags = new Set<string>();
		articles.forEach(article => {
			article.tags.forEach(tag => tags.add(tag));
		});
		return Array.from(tags).sort();
	}, [articles]);

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

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedTag]);

	const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
	const paginatedArticles = useMemo(() => {
		const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
		return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
	}, [filteredArticles, currentPage]);

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<div>
			{/* Medium CTA */}
			<motion.a
				href={`https://medium.com/@${mediumData.username}`}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center justify-center gap-2 px-5 py-2.5 mb-8 mx-auto w-fit rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.97 }}
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<SiMedium className="w-4 h-4" />
				Follow on Medium
				<ExternalLink className="w-3.5 h-3.5 opacity-70" />
			</motion.a>

			{/* Search and Filters */}
			<div className="mb-8">
				<div className="flex flex-col sm:flex-row gap-4">
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
			</div>

			{/* Articles Grid */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
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
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
								<div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
									<Clock className="w-3 h-3" />
									{article.readTime} min
								</div>
							</div>

							<div className="p-5">
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

								<h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
									{article.title}
								</h2>

								<p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
									{article.excerpt}
								</p>

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
				<div className="text-center py-16">
					<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
						<Search className="w-8 h-8 text-gray-400" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						No articles found
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						Try adjusting your search or filter criteria
					</p>
				</div>
			)}

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-10 flex items-center justify-center gap-2">
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
				</div>
			)}

			{/* Results info */}
			{filteredArticles.length > 0 && (
				<p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500">
					Showing {((currentPage - 1) * ARTICLES_PER_PAGE) + 1}-{Math.min(currentPage * ARTICLES_PER_PAGE, filteredArticles.length)} of {filteredArticles.length} articles
				</p>
			)}
		</div>
	);
}

// ─── Vlogs Tab ─────────────────────────────────────────────────────────────────

function VlogsTab() {
	const [searchTerm, setSearchTerm] = useState('');

	const videos: YouTubeVideo[] = youtubeData.videos;

	const filteredVideos = useMemo(() => {
		if (searchTerm === '') return videos;
		return videos.filter(video =>
			video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			video.description.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [videos, searchTerm]);

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<div>
			{/* YouTube CTA */}
			<motion.a
				href={`https://youtube.com/@ThosePairProgrammers`}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center justify-center gap-2 px-5 py-2.5 mb-8 mx-auto w-fit rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white text-sm font-medium hover:from-red-600 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.97 }}
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<FaYoutube className="w-4 h-4" />
				Subscribe on YouTube
				<ExternalLink className="w-3.5 h-3.5 opacity-70" />
			</motion.a>

			{/* Search */}
			<div className="mb-8">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search videos..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
					/>
				</div>
			</div>

			{/* Videos Grid */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
			>
				{filteredVideos.map((video) => (
					<motion.a
						key={video.videoId}
						href={video.link}
						target="_blank"
						rel="noopener noreferrer"
						variants={itemVariants}
						whileHover={{ y: -8, scale: 1.02 }}
						className="group block"
					>
						<article className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
							{/* Thumbnail */}
							<div className="relative aspect-video overflow-hidden">
								<img
									src={video.thumbnail}
									alt={video.title}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
									<div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
										<Play className="w-6 h-6 text-white ml-1" fill="white" />
									</div>
								</div>
							</div>

							{/* Content */}
							<div className="p-5">
								<h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
									{video.title}
								</h2>

								<p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
									{video.description}
								</p>

								<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
									<div className="flex items-center gap-1">
										<Calendar className="w-3.5 h-3.5" />
										{formatDate(video.publishedAt)}
									</div>
									<div className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium group-hover:gap-2 transition-all">
										Watch on YouTube
										<ExternalLink className="w-3.5 h-3.5" />
									</div>
								</div>
							</div>
						</article>
					</motion.a>
				))}
			</motion.div>

			{/* Empty State */}
			{filteredVideos.length === 0 && (
				<div className="text-center py-16">
					<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
						<Search className="w-8 h-8 text-gray-400" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						No videos found
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						Try adjusting your search criteria
					</p>
				</div>
			)}

			{/* Results info */}
			{filteredVideos.length > 0 && (
				<p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500">
					{filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
				</p>
			)}
		</div>
	);
}

// ─── Content Page ──────────────────────────────────────────────────────────────

export default function Content() {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get('tab') || 'articles';

	const setActiveTab = (tabId: string) => {
		setSearchParams({ tab: tabId });
	};

	// Validate tab param
	useEffect(() => {
		const validTabs = tabData.map(t => t.id);
		if (!validTabs.includes(activeTab)) {
			setSearchParams({ tab: 'articles' }, { replace: true });
		}
	}, [activeTab, setSearchParams]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	return (
		<motion.div
			className="min-h-screen"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<motion.div variants={itemVariants} className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						My <span className="gradient-text">Content</span>
					</h1>
					<p className="mt-1 text-gray-600 dark:text-gray-400">
						Articles, tutorials, and vlogs on software engineering and beyond
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
									<span>{tab.label}</span>
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
					{activeTab === 'articles' && <ArticlesTab />}
					{activeTab === 'vlogs' && <VlogsTab />}
				</motion.div>
			</div>
		</motion.div>
	);
}

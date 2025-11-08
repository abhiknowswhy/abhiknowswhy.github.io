import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, Fragment, useRef } from 'react';
import { Calendar, Clock, Tag, User, Grid3x3, Rows3, ChevronDown } from 'lucide-react';
import { SiBuymeacoffee } from 'react-icons/si';
import { getAllBlogItems, getAllBlogTagsFromItems, getPersonalData } from '../lib/dataLoader';
import { FilterVisitor, SeriesMetadataVisitor } from '../lib/blogVisitors';
import type { BlogItem, SoloBlogPost, BlogSeries } from '../types/data';

export default function Blog() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [filteredItems, setFilteredItems] = useState<BlogItem[]>([]);
	const [viewMode, setViewMode] = useState<'tile' | 'table'>('tile');
	const [expandedSeries, setExpandedSeries] = useState<Set<string>>(new Set());
	
	const [allBlogItems] = useState(() => getAllBlogItems());
	const [allTags] = useState(() => getAllBlogTagsFromItems());
	const personalData = getPersonalData();
	const gridRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		// Create filter visitor
		const filterVisitor = new FilterVisitor(searchTerm, selectedTag);
		
		// Filter items using visitor pattern
		const filtered = allBlogItems.filter(item => item.accept(filterVisitor));
		setFilteredItems(filtered);
	}, [searchTerm, selectedTag, allBlogItems]);

	useEffect(() => {
		// Handle click outside to collapse expanded series
		const handleClickOutside = (event: MouseEvent) => {
			if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
				setExpandedSeries(new Set());
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const toggleSeriesExpand = (seriesId: string) => {
		const newExpanded = new Set(expandedSeries);
		if (newExpanded.has(seriesId)) {
			newExpanded.delete(seriesId);
		} else {
			newExpanded.add(seriesId);
		}
		setExpandedSeries(newExpanded);
	};

	const renderAuthors = (authors: string[]): string => {
		if (authors.length === 1) return authors[0];
		if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
		return `${authors.slice(0, -1).join(', ')} & ${authors[authors.length - 1]}`;
	};

	const renderSoloBlogCard = (post: SoloBlogPost, index: number) => (
		<a 
			key={post.id}
			href={post.externalLink || `/blog/${post.slug}`}
			target="_blank"
			rel="noopener noreferrer"
			className="block group h-full"
		>
			<motion.article
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: index * 0.05 }}
				whileHover={{ scale: 1.05 }}
				className="flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
			>
				{/* Cover Image */}
				<div className="w-full h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
					{post.coverImage && (
						<img 
							src={post.coverImage} 
							alt={post.title}
							className="w-full h-full object-cover"
						/>
					)}
				</div>
				
				<div className="p-6 flex-grow flex flex-col">
					<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-3">
						<span className="flex items-center">
							<Calendar className="h-4 w-4 mr-1" />
							{post.date}
						</span>
						<span className="flex items-center">
							<Clock className="h-4 w-4 mr-1" />
							{post.readingTime} min
						</span>
					</div>
	
					{/* Authors */}
					<div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
						<User className="h-4 w-4 mr-1" />
						<span>{renderAuthors(post.authors)}</span>
					</div>
	
					<h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
						{post.title}
					</h2>
	
					<p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
						{post.excerpt}
					</p>
	
					<div className="flex flex-wrap gap-2 mb-4 min-h-6">
						{post.tags.map(tag => (
							<span
								key={tag}
								className="inline-flex items-center text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
							>
								<Tag className="h-3 w-3 mr-1" />
								{tag}
							</span>
						))}
					</div>
				</div>
				<div className="px-6 pb-6 mt-auto">
					<div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-all duration-300 transform group-hover:scale-105">
						<span>Read more</span>
						<span className="ml-1">📖</span>
					</div>
				</div>
			</motion.article>
		</a>
	);

	const renderSeriesCard = (series: BlogSeries, index: number) => {
		// Use the first post's cover image as series cover, or a placeholder
		const seriesCoverImage = series.posts[0]?.coverImage;
		const metadataVisitor = new SeriesMetadataVisitor();
		const metadata = series.accept(metadataVisitor);
		
		return (
			<motion.div
				key={series.id}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: index * 0.05 }}
				whileHover={{ scale: 1.05 }}
				className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
			>
				{/* Series Cover Image */}
				<div className="w-full h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
					{seriesCoverImage && (
						<img 
							src={seriesCoverImage} 
							alt={series.title}
							className="w-full h-full object-cover"
						/>
					)}
				</div>
				
				{/* Series Header */}
				<div
					onClick={() => toggleSeriesExpand(series.id)}
					className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex-grow flex flex-col"
				>
					<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-2">
						<span className="flex items-center">
							<Calendar className="h-4 w-4 mr-1" />
							{metadata.date}
						</span>
						<span className="flex items-center">
							<Clock className="h-4 w-4 mr-1" />
							{metadata.readingTime} min
						</span>
					</div>
					<div className="flex items-start justify-between mb-2">
						<div className="flex-grow">
							<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
								{series.title}
							</h3>
							{series.description && (
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
									{series.description}
								</p>
							)}
						</div>
						<motion.div
							animate={{ rotate: expandedSeries.has(series.id) ? 180 : 0 }}
							transition={{ duration: 0.3 }}
							className="ml-4 flex-shrink-0"
						>
							<ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
						</motion.div>
					</div>
					<div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
						<User className="h-4 w-4 mr-1" />
						<span className="line-clamp-1">{renderAuthors(metadata.authors)}</span>
					</div>
					<div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
						{series.posts.length} {series.posts.length === 1 ? 'post' : 'posts'} in series
					</div>
					<div className="flex flex-wrap gap-2 mb-4 min-h-6">
						{metadata.tags.slice(0, 3).map((tag: string) => (
							<span
								key={tag}
								className="inline-flex items-center text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
							>
								<Tag className="h-3 w-3 mr-1" />
								{tag}
							</span>
						))}
						{metadata.tags.length > 3 && (
							<span className="text-xs text-gray-500 dark:text-gray-400">
								+{metadata.tags.length - 3} more
							</span>
						)}
					</div>
					<div className="mt-auto pt-2">
						<div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300">
							<span>View series</span>
							<span className="ml-1">📖</span>
						</div>
					</div>
				</div>

				{/* Expanded Series Posts - Only shown in table view */}
				{viewMode === 'table' && (
					<motion.div
						initial={false}
						animate={{
							height: expandedSeries.has(series.id) ? 'auto' : 0,
							opacity: expandedSeries.has(series.id) ? 1 : 0,
						}}
						transition={{ duration: 0.3 }}
						className="overflow-hidden border-t border-gray-200 dark:border-gray-700"
					>
						<div className="p-6 space-y-4 bg-gray-50 dark:bg-gray-700/30">
							{series.posts.map((post, postIndex) => (
								<a
									key={post.id}
									href={post.externalLink || `/blog/${post.slug}`}
									target="_blank"
									rel="noopener noreferrer"
									className="block group p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
								>
									<div className="flex items-start justify-between">
										<div className="flex-grow">
											<div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
												Part {postIndex + 1}
											</div>
											<h4 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
												{post.title}
											</h4>
											<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
												{post.excerpt}
											</p>
											<div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
												<span className="flex items-center gap-1">
													<Calendar className="h-3 w-3" />
													{post.date}
												</span>
												<span className="flex items-center gap-1">
													<Clock className="h-3 w-3" />
													{post.readingTime} min
												</span>
											</div>
										</div>
										<ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-4 flex-shrink-0 rotate-[-90deg]" />
									</div>
								</a>
							))}
						</div>
					</motion.div>
				)}
			</motion.div>
		);
	};

	const renderTileView = () => {
		if (filteredItems.length === 0) {
			return (
				<div className="col-span-full text-center py-12">
					<p className="text-gray-500 dark:text-gray-400 text-lg">
						No posts found matching your criteria. Try adjusting your search or filters.
					</p>
				</div>
			);
		}

		const hasAnyExpandedSeries = expandedSeries.size > 0;

		return (
			<AnimatePresence mode="popLayout">
				{filteredItems.map((item, index) => {
					if (item.type === 'solo') {
						const soloPost = item as SoloBlogPost;
						const isDulled = hasAnyExpandedSeries;
						
						return (
							<div
								key={soloPost.id}
								className={`relative ${isDulled ? 'pointer-events-none' : ''}`}
							>
								{isDulled && (
									<div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 rounded-xl z-10" />
								)}
								<div className={isDulled ? 'opacity-60' : 'opacity-100'}>
									{renderSoloBlogCard(soloPost, index)}
								</div>
							</div>
						);
					} else {
						const series = item as BlogSeries;
						const isExpanded = expandedSeries.has(series.id);
						
						return (
							<Fragment key={series.id}>
								<div>
									{renderSeriesCard(series, index)}
								</div>

								{/* Add expanded posts inline with AnimatePresence */}
								<AnimatePresence mode="popLayout">
									{isExpanded && series.posts.map((post, postIndex) => (
										<motion.div
											key={`${series.id}-${post.id}`}
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											transition={{ duration: 0.25, delay: postIndex * 0.04 }}
											whileHover={{ scale: 1.05 }}
											className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
										>
											<a 
												href={post.externalLink || `/blog/${post.slug}`}
												target="_blank"
												rel="noopener noreferrer"
												className="block group h-full flex flex-col"
											>
												{/* Cover Image with Badges Overlay */}
												<div className="relative w-full h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
													{post.coverImage && (
														<img 
															src={post.coverImage} 
															alt={post.title}
															className="w-full h-full object-cover"
														/>
													)}
													
													{/* Badges Overlay */}
													<div className="absolute inset-0 px-4 pt-3 pb-2 flex items-start justify-between pointer-events-none">
														<span className="text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full shadow-md">
															Part {postIndex + 1}
														</span>
														<span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded shadow-md">
															Series
														</span>
													</div>
												</div>
												
												<div className="p-6 flex flex-col h-full">
													<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-3">
														<span className="flex items-center">
															<Calendar className="h-4 w-4 mr-1" />
															{post.date}
														</span>
														<span className="flex items-center">
															<Clock className="h-4 w-4 mr-1" />
															{post.readingTime} min
														</span>
													</div>

													<h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
														{post.title}
													</h3>
													
													<p className="text-gray-600 dark:text-gray-300 mb-3 flex-grow line-clamp-3">
														{post.excerpt}
													</p>

													<div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
														<User className="h-4 w-4 mr-1 flex-shrink-0" />
														<span>{renderAuthors(post.authors)}</span>
													</div>

													<div className="flex flex-wrap gap-2 mb-4 min-h-6">
														{post.tags.slice(0, 2).map(tag => (
															<span
																key={tag}
																className="inline-flex items-center text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
															>
																<Tag className="h-3 w-3 mr-1" />
																{tag}
															</span>
														))}
														{post.tags.length > 2 && (
															<span className="text-xs text-gray-500 dark:text-gray-400">
																+{post.tags.length - 2} more
															</span>
														)}
													</div>

													<div className="mt-auto pt-4">
														<div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-all duration-300 transform group-hover:scale-105">
															<span>Read more</span>
															<span className="ml-1">📖</span>
														</div>
													</div>
												</div>
											</a>
										</motion.div>
									))}
								</AnimatePresence>
							</Fragment>
						);
					}
				})}
			</AnimatePresence>
		);
	};

	const renderTableView = () => {
		if (filteredItems.length === 0) {
			return (
				<div className="text-center py-12">
					<p className="text-gray-500 dark:text-gray-400 text-lg">
						No posts found matching your criteria. Try adjusting your search or filters.
					</p>
				</div>
			);
		}

		const metadataVisitor = new SeriesMetadataVisitor();

		return (
			<div className="w-full overflow-x-auto scrollbar-hide">
				<motion.table
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className="w-full border-collapse"
				>
					<thead>
						<tr className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
							<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Authors</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Reading Time</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Tags</th>
						</tr>
					</thead>
					<tbody>
						{filteredItems.map((item, index) => {
							if (item.type === 'solo') {
								const post = item as SoloBlogPost;
								return (
									<motion.tr
										key={post.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ 
											duration: 0.4, 
											delay: index * 0.08,
											ease: 'easeOut'
										}}
										whileHover={{ scale: 1.01 }}
										onClick={() => window.open(post.externalLink || `/blog/${post.slug}`, '_blank')}
										className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300 cursor-pointer"
									>
										<td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
											{post.title}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4 flex-shrink-0" />
												{post.date}
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
											{renderAuthors(post.authors)}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4 flex-shrink-0" />
												{post.readingTime} min
											</div>
										</td>
										<td className="px-6 py-4 text-sm">
											<div className="flex flex-wrap gap-1">
												{post.tags.map(tag => (
													<span
														key={tag}
														className="inline-flex items-center text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
													>
														{tag}
													</span>
												))}
											</div>
										</td>
									</motion.tr>
								);
							} else {
								const series = item as BlogSeries;
								const isExpanded = expandedSeries.has(series.id);
								const metadata = series.accept(metadataVisitor);
								return (
									<>
										<motion.tr
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											transition={{ 
												duration: 0.3, 
												delay: index * 0.08,
												ease: 'easeOut'
											}}
											whileHover={{ scale: 1.01 }}
											onClick={() => toggleSeriesExpand(series.id)}
											className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300 cursor-pointer bg-gray-50 dark:bg-gray-700/30 font-semibold"
										>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-bold">
												<div className="flex items-center gap-2">
													<motion.div
														animate={{ rotate: isExpanded ? 180 : 0 }}
														transition={{ duration: 0.3, ease: 'easeInOut' }}
													>
														<ChevronDown className="w-4 h-4" />
													</motion.div>
													{series.title}
													<span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-2 py-1 rounded font-normal">
														{series.posts.length} posts
													</span>
												</div>
											</td>
											<motion.td 
												className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 flex-shrink-0" />
													{metadata.date}
												</div>
											</motion.td>
											<motion.td 
												className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												{renderAuthors(metadata.authors)}
											</motion.td>
											<motion.td 
												className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 flex-shrink-0" />
													{metadata.readingTime} min
												</div>
											</motion.td>
											<motion.td 
												className="px-6 py-4 text-sm"
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												<div className="flex flex-wrap gap-1">
													{metadata.tags.map(tag => (
														<span
															key={tag}
															className="inline-flex items-center text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full"
														>
															{tag}
														</span>
													))}
												</div>
											</motion.td>
										</motion.tr>
										<AnimatePresence>
											{isExpanded && series.posts.map((post, postIndex) => (
												<motion.tr
													key={`${series.id}-${post.id}`}
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -20 }}
													transition={{ 
														duration: 0.3, 
														delay: postIndex * 0.05,
														ease: 'easeOut'
													}}
													whileHover={{ scale: 1.01 }}
													onClick={(e) => {
														e.stopPropagation();
														window.open(post.externalLink || `/blog/${post.slug}`, '_blank');
													}}
													className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300 cursor-pointer bg-gray-100 dark:bg-gray-700/50"
												>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium pl-16">
														• Part {postIndex + 1}: {post.title}
													</td>
													<td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
														<div className="flex items-center gap-1">
															<Calendar className="h-4 w-4 flex-shrink-0" />
															{post.date}
														</div>
													</td>
													<td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
														{renderAuthors(post.authors)}
													</td>
													<td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
														<div className="flex items-center gap-1">
															<Clock className="h-4 w-4 flex-shrink-0" />
															{post.readingTime} min
														</div>
													</td>
													<td className="px-6 py-4 text-sm">
														<div className="flex flex-wrap gap-1">
															{post.tags.map(tag => (
																<span
																	key={tag}
																	className="inline-flex items-center text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
																>
																	{tag}
																</span>
															))}
														</div>
													</td>
												</motion.tr>
											))}
										</AnimatePresence>
									</>
								);
							}
						})}
					</tbody>
				</motion.table>
			</div>
		);
	};
	
	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="space-y-12"
			>
				{/* Header */}
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
						My <span className="gradient-text">Blogs</span>
					</h1>
					<p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
						Thoughts, ideas, and insights on Technology, AI, and more.
					</p>
				</div>

				{/* Buy Me A Coffee Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="flex items-center justify-center"
				>
					<p className="text-gray-600 dark:text-gray-400">
						If you like my work, consider{' '}
						<a
							href={personalData.social.buymeacoffee}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
						>
							buying me a coffee
							<SiBuymeacoffee className="w-5 h-5" />
						</a>
					</p>
				</motion.div>

				{/* Search, View Toggle and Filter */}
				<div className="flex flex-col gap-4">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="w-full md:w-auto">
							<input
								type="text"
								placeholder="Search posts..."
								className="w-full md:w-80 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{/* View Toggle */}
						<div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
							<button
								onClick={() => setViewMode('tile')}
								className={`p-2 rounded transition-all ${
									viewMode === 'tile'
										? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
								}`}
								title="Tile View"
							>
								<Grid3x3 className="w-5 h-5" />
							</button>
							<button
								onClick={() => setViewMode('table')}
								className={`p-2 rounded transition-all ${
									viewMode === 'table'
										? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
								}`}
								title="Table View"
							>
								<Rows3 className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* Tag Filters */}
					<div className="flex flex-wrap gap-2">
						<button
							className={`px-3 py-1 text-sm rounded-full ${
								selectedTag === null
									? 'bg-blue-500 text-white'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
							}`}
							onClick={() => setSelectedTag(null)}
						>
							All
						</button>
						{allTags.map(tag => (
							<button
								key={tag}
								className={`px-3 py-1 text-sm rounded-full ${
									selectedTag === tag
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
								}`}
								onClick={() => setSelectedTag(tag)}
							>
								{tag}
							</button>
						))}
					</div>
				</div>

				{/* Blog Posts - Tile View */}
				{viewMode === 'tile' && (
					<div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
						{renderTileView()}
					</div>
				)}

				{/* Blog Posts - Table View */}
				{viewMode === 'table' && (
					<div className="overflow-x-auto">
						{renderTableView()}
					</div>
				)}
			</motion.div>
		</div>
	);
}

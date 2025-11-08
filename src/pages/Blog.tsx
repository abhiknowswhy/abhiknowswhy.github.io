import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Clock, Tag, User, Grid3x3, Rows3 } from 'lucide-react';
import { SiBuymeacoffee } from 'react-icons/si';
import { getAllBlogPosts, getAllBlogTags, getPersonalData } from '../lib/dataLoader';
import type { BlogPost } from '../types/data';

export default function Blog() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [viewMode, setViewMode] = useState<'tile' | 'table'>('tile');
	
	const [allBlogPosts] = useState(() => getAllBlogPosts());
	const [allTags] = useState(() => getAllBlogTags());
	const personalData = getPersonalData();
	
	useEffect(() => {
		// Filter posts based on search and tags
		let filtered = allBlogPosts;
		
		if (searchTerm) {
			filtered = filtered.filter(post => 
				post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
				post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		
		if (selectedTag) {
			filtered = filtered.filter(post => 
				post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
			);
		}
		
		setPosts(filtered);
	}, [searchTerm, selectedTag, allBlogPosts]);
	
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
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{posts.length > 0 ? (
							posts.map(post => (
								<a 
									key={post.id}
									href={post.externalLink || `/blog/${post.slug}`}
									target="_blank"
									rel="noopener noreferrer"
									className="block group"
								>
									<motion.article
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5 }}
										whileHover={{ scale: 1.05 }}
										className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
									>
										{/* Cover Image */}
										{post.coverImage && (
											<img 
												src={post.coverImage} 
												alt={post.title}
												className="w-full h-48 object-cover"
											/>
										)}
										
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
												<span>
													{post.authors.length === 1 
														? post.authors[0]
														: post.authors.length === 2
															? `${post.authors[0]} & ${post.authors[1]}`
															: `${post.authors.slice(0, -1).join(', ')} & ${post.authors[post.authors.length - 1]}`
													}
												</span>
											</div>
						
											<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
												{post.title}
											</h2>
						
											<p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
												{post.excerpt}
											</p>
						
											<div className="flex flex-wrap gap-2">
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
							))
						) : (
							<div className="col-span-full text-center py-12">
								<p className="text-gray-500 dark:text-gray-400 text-lg">
									No posts found matching your criteria. Try adjusting your search or filters.
								</p>
							</div>
						)}
					</div>
				)}

				{/* Blog Posts - Table View */}
				{viewMode === 'table' && (
					<div className="overflow-x-auto">
						{posts.length > 0 ? (
							<motion.table
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
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
									{posts.map((post, index) => (
										<motion.tr
											key={post.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											onClick={() => window.open(post.externalLink || `/blog/${post.slug}`, '_blank')}
											className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
										>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
												{post.title}
											</td>
											<td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4" />
													{post.date}
												</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
												{post.authors.length === 1 
													? post.authors[0]
													: post.authors.length === 2
														? `${post.authors[0]} & ${post.authors[1]}`
														: `${post.authors.slice(0, -1).join(', ')} & ${post.authors[post.authors.length - 1]}`
												}
											</td>
											<td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4" />
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
								</tbody>
							</motion.table>
						) : (
							<div className="text-center py-12">
								<p className="text-gray-500 dark:text-gray-400 text-lg">
									No posts found matching your criteria. Try adjusting your search or filters.
								</p>
							</div>
						)}
					</div>
				)}
			</motion.div>
		</div>
	);
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { SiBuymeacoffee } from 'react-icons/si';
import { getProjectsData, getPersonalData } from '../lib/dataLoader';
import type { Project } from '../types/data';
import { useTheme } from '../hooks/useTheme';

export default function Projects() {
	const { theme } = useTheme();
	const projectsData = getProjectsData();
	const personalData = getPersonalData();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedStatus, setSelectedStatus] = useState('all');
	
	useEffect(() => {
		const bodyBgColor = window.getComputedStyle(document.body).backgroundColor;
		console.log(`[Projects.tsx] Theme is: ${theme}, Body background color is: ${bodyBgColor}`);
	}, [theme]);

	// Get unique categories and statuses
	const categories = Array.from(new Set(projectsData.projects.map(p => p.category)));
	const statuses = Array.from(new Set(projectsData.projects.map(p => p.status)));

	// Filter projects
	const filteredProjects = projectsData.projects.filter((project: Project) => {
		const matchesSearch = searchTerm === '' ||
		project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
		project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
		project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
		const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;

		return matchesSearch && matchesCategory && matchesStatus;
	});

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

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
			case 'in-progress':
				return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
			case 'planning':
				return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
			case 'archived':
				return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
			default:
				return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
		}
	};

	return (
		<motion.div
			className="min-h-screen"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Header */}
				<motion.div variants={itemVariants} className="text-center mb-12">
					<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
						My <span className="gradient-text">Projects</span>
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
						A collection of projects I've worked on, showcasing my skills and passion for development.
					</p>
				</motion.div>

				{/* Buy Me A Coffee Section */}
				<motion.div variants={itemVariants} className="flex items-center justify-center mb-12">
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

				{/* Filters */}
				<motion.div variants={itemVariants} className="mb-12">
					<div className="glass-card p-6 rounded-xl">
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
							{/* Search */}
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="text"
									placeholder="Search projects..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm"
								/>
							</div>

							{/* Category Filter */}
							<div className="relative">
								<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
								>
									<option value="all">All Categories</option>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category.charAt(0).toUpperCase() + category.slice(1)}
										</option>
									))}
								</select>
							</div>

							{/* Status Filter */}
							<div className="relative">
								<select
									value={selectedStatus}
									onChange={(e) => setSelectedStatus(e.target.value)}
									className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
								>
									<option value="all">All Statuses</option>
									{statuses.map((status) => (
										<option key={status} value={status}>
											{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
										</option>
									))}
								</select>
							</div>

							{/* Results Count */}
							<div className="flex items-center justify-center lg:justify-start">
								<span className="text-sm text-gray-600 dark:text-gray-400">
									{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
								</span>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Projects Grid */}
				<motion.div
					variants={containerVariants}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{filteredProjects.map((project: Project) => (
						<motion.div
							key={project.id}
							variants={itemVariants}
							className="glass-card rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
							whileHover={{ y: -8 }}
						>
							{/* Project Image */}
							<div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
								{project.thumbnail && (
									<img
										src={project.thumbnail}
										alt={project.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								)}
								<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

								{/* Status Badge */}
								<div className="absolute top-4 left-4">
									<span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
										{project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
									</span>
								</div>

								{/* Featured Badge */}
								{project.featured && (
									<div className="absolute top-4 right-4">
										<span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">
											Featured
										</span>
									</div>
								)}
							</div>

							{/* Project Content */}
							<div className="p-6">
								<div className="mb-4">
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
										{project.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
										{project.description}
									</p>
								</div>

								{/* Technologies */}
								<div className="mb-4">
									<div className="flex flex-wrap gap-2">
										{project.technologies.slice(0, 3).map((tech: string) => (
											<span
												key={tech}
												className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
											>
												{tech}
											</span>
										))}
										{project.technologies.length > 3 && (
											<span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
												+{project.technologies.length - 3}
											</span>
										)}
									</div>
								</div>

								{/* Project Links */}
								<div className="flex items-center justify-between">
									<div className="flex space-x-3">
										{project.githubUrl && (
											<a
												href={project.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="p-2 glass-card hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-lg"
												aria-label="View source code"
											>
												<Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
											</a>
										)}
										{project.demoUrl && (
											<a
												href={project.demoUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="p-2 glass-card hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-lg"
												aria-label="View live demo"
											>
												<ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
											</a>
										)}
									</div>

									<Link
										to={`/projects/${project.id}`}
										className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm group"
									>
										Learn more
										<ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
									</Link>
								</div>

								{/* Project Timeline */}
								<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
									<p className="text-xs text-gray-500 dark:text-gray-500">
										{project.startDate} {project.endDate && `- ${project.endDate}`}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Empty State */}
				{filteredProjects.length === 0 && (
					<motion.div
						variants={itemVariants}
						className="text-center py-16"
					>
						<div className="glass-card p-8 rounded-xl max-w-md mx-auto">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								No projects found
							</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-4">
								Try adjusting your search or filter criteria.
							</p>
							<button
								onClick={() => {
									setSearchTerm('');
									setSelectedCategory('all');
									setSelectedStatus('all');
								}}
								className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
							>
								Clear Filters
							</button>
						</div>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
}

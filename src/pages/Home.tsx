import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Calendar, Code, Globe, Pen, Award, Briefcase, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPersonalData, getProjectsData, getFeaturedProjects, getLibraryData } from '../lib/dataLoader';
import type { Project } from '../types/data';
import { StatsGlassBar } from '@/components/ui/StatsGlassBar';

export default function Home() {
	const personalData = getPersonalData();
	const projectsData = getProjectsData();
	const featuredProjects = getFeaturedProjects();
	const libraryData = getLibraryData();

	const downloadResume = () => {
		// Trigger download without leaving the page
		if (personalData.profile.resumeUrl) {
			const link = document.createElement('a');
			link.href = personalData.profile.resumeUrl;
			link.download = `${personalData.profile.name.replace(/\s+/g, '_')}_Resume.pdf`;
			link.style.display = 'none';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						<div>
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
							>
								Hi, I'm{' '}
								<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									{personalData.profile.name.split(' ')[0]}
								</span>
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mt-4"
							>
								{personalData.profile.title}
							</motion.p>
						</div>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl"
						>
							{personalData.profile.bio}
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="flex flex-col sm:flex-row gap-4"
						>
							{personalData.profile.resumeUrl && (
								<button
									onClick={downloadResume}
									className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
								>
									<Download className="mr-2 w-5 h-5" />
									Download Resume
								</button>
							)}
							<Link
								to="/projects"
								className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors text-center flex items-center justify-center"
							>
								<ArrowRight className="mr-2 w-5 h-5" />
								Explore Projects
							</Link>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1.0 }}
							className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400"
						>
							<div className="flex items-center">
								<MapPin className="w-4 h-4 mr-1" />
								{personalData.profile.location}
							</div>
							<div className="flex items-center">
								<Calendar className="w-4 h-4 mr-1" />
								{personalData.profile.availability}
							</div>
						</motion.div>
					</motion.div>

					{/* Profile Image */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="flex justify-center lg:justify-end"
					>
						<div className="relative">
							<div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
								<img
									src={personalData.profile.profileImage}
									alt={personalData.profile.name}
									className="w-72 h-72 rounded-full object-cover shadow-lg"
									onError={(e) => {
										// Fallback if image fails to load
										const target = e.target as HTMLImageElement;
										target.onerror = null;
										target.src = 'https://via.placeholder.com/300';
									}}
								/>
							</div>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
								className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white"
							>
								<span className="text-2xl">🚀</span>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<StatsGlassBar 
					stats={[
						{ value: personalData.experience.length, label: 'Years Experience', icon: <Briefcase className="w-6 h-6" />, suffix: '+', color: '#10B981' },
						{ value: projectsData.projects.length, label: 'Projects Completed', icon: <Code className="w-6 h-6" />, suffix: '+', color: '#3B82F6' },
						{ value: 8, label: 'Certifications', icon: <Award className="w-6 h-6" />, color: '#F59E0B' },
					]}
				/>
			</section>

			{/* Quick Navigation */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
				>
					Explore My World
				</motion.h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{[
						{
							to: '/projects',
							icon: <Code className="w-10 h-10" />,
							title: 'Projects',
							description: 'Code & Creations',
						},
						{
							to: '/travel',
							icon: <Globe className="w-10 h-10" />,
							title: 'Travel',
							description: 'Adventures & Memories',
						},
						{
							to: '/library',
							icon: <BookOpen className="w-10 h-10" />,
							title: 'Library',
							description: 'Books & Knowledge',
						},
						{
							to: '/blog',
							icon: <Pen className="w-10 h-10" />,
							title: 'Blog',
							description: 'Thoughts & Insights',
						},
					].map((item, index) => (
						<motion.div
							key={item.to}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ y: -5 }}
						>
							<Link
								to={item.to}
								className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
							>
								<div className="text-blue-600 dark:text-blue-400 mb-4">{item.icon}</div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
								<p className="text-gray-600 dark:text-gray-400">{item.description}</p>
							</Link>
						</motion.div>
					))}
				</div>
			</section>

			{/* Featured Projects */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
						Featured Projects
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400">
						Some of my recent work that I'm proud of
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{featuredProjects.slice(0, 3).map((project: Project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ y: -8 }}
							className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
								{project.thumbnail && (
									<img
										src={project.thumbnail}
										alt={project.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								)}
								<div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
							</div>
              
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									{project.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
									{project.description}
								</p>
                
								<div className="flex flex-wrap gap-2 mb-4">
									{project.technologies.slice(0, 3).map((tech: string) => (
										<span
											key={tech}
											className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
										>
											{tech}
										</span>
									))}
									{project.technologies.length > 3 && (
										<span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
											+{project.technologies.length - 3} more
										</span>
									)}
								</div>

								<Link
									to={`/projects/${project.id}`}
									className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group"
								>
									Learn more
									<ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
								</Link>
							</div>
						</motion.div>
					))}
				</div>

				<div className="text-center mt-12">
					<Link
						to="/projects"
						className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors"
					>
						View All Projects
						<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
					</Link>
				</div>
			</section>
		</div>
	);
}

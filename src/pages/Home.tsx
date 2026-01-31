import { motion } from 'framer-motion';
import { ArrowRight, Download, Code, Globe, Pen, BookOpen, Music, ChefHat, Award, Briefcase, Sparkles, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPersonalData, getProjectsData } from '../lib/dataLoader';
import { StatsGlassBar } from '@/components/ui/StatsGlassBar';
import { socialIcons, socialIconColors } from '@/lib/socialIcons';

export default function Home() {
	const personalData = getPersonalData();
	const projectsData = getProjectsData();

	// Calculate years of experience from first working day (July 20, 2022)
	const startDate = new Date('2022-07-20');
	const today = new Date();
	const yearsOfExperience = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365));

	return (
		<div className="min-h-screen">
			{/* Hero Section - Clean About-style layout */}
			<section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
				{/* Background decoration */}
				<div className="absolute -top-10 -left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl -z-10" />
				<div className="absolute -bottom-10 -right-10 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl -z-10" />
				
				<div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
					{/* Profile Image */}
					<motion.div 
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
						className="lg:col-span-4"
					>
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl rotate-3 opacity-20" />
							<img
								src={personalData.profile.profileImage}
								alt={personalData.profile.name}
								className="relative w-full max-w-xs mx-auto lg:max-w-none aspect-square object-cover rounded-2xl shadow-2xl"
							/>
						</div>
					</motion.div>

					{/* Info */}
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="lg:col-span-8 space-y-6"
					>
						<div>
							<p className="text-primary-600 dark:text-primary-400 font-semibold mb-2 flex items-center gap-2">
								<Sparkles className="w-4 h-4" />
								Hello, I'm
							</p>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
								{personalData.profile.name}
							</h1>
							<p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-medium">
								{personalData.profile.title}
							</p>
						</div>

						<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
							{personalData.profile.bio}
						</p>

						{/* Quick stats */}
						<div className="flex flex-wrap gap-6 text-sm">
							<div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
								<MapPin className="w-4 h-4 text-primary-500" />
								{personalData.profile.location}
							</div>
							<div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
								<Briefcase className="w-4 h-4 text-primary-500" />
								{personalData.experience.length}+ roles
							</div>
							<div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
								<Award className="w-4 h-4 text-primary-500" />
								{personalData.certifications.length} certifications
							</div>
						</div>

						{/* CTA Buttons */}
						<div className="flex flex-wrap gap-4 pt-2">
							<a
								href={personalData.profile.resumeUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
							>
								<Download className="w-4 h-4" />
								Download Resume
							</a>
							<a
								href={`mailto:${personalData.profile.email}`}
								className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-all"
							>
								<Mail className="w-4 h-4" />
								Get in Touch
							</a>
						</div>

						{/* Social Links */}
						<div className="flex items-center gap-3 pt-2">
							{Object.entries(personalData.social).map(([platform, url]) => {
								const Icon = socialIcons[platform as keyof typeof socialIcons];
								const iconColor = socialIconColors[platform] || 'text-gray-700 dark:text-gray-300';
								if (!Icon || !url) return null;
								return (
									<a
										key={platform}
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all hover:-translate-y-1"
										aria-label={`Visit ${platform} profile`}
									>
										<Icon className={`w-5 h-5 ${iconColor}`} />
									</a>
								);
							})}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<StatsGlassBar 
					stats={[
						{ value: yearsOfExperience, label: 'Years Experience', icon: <Briefcase className="w-6 h-6" />, suffix: '+', color: '#10B981', link: '/about#experience' },
						{ value: projectsData.projects.length, label: 'Projects Completed', icon: <Code className="w-6 h-6" />, suffix: '+', color: '#3B82F6', link: '/projects' },
						{ value: personalData.certifications.length, label: 'Certifications', icon: <Award className="w-6 h-6" />, color: '#F59E0B', link: '/about#certifications' },
					]}
				/>
			</section>

			{/* Quick Navigation - Bento Grid */}
			<section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Explore My World
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
						Dive into my projects, adventures, and interests
					</p>
				</motion.div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px] md:auto-rows-[160px]">
					{/* Projects - Large card (Row 1-2, Col 1-2) */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						whileHover={{ scale: 1.02 }}
						className="col-span-2 row-span-2"
					>
						<Link
							to="/projects"
							className="block h-full rounded-3xl shadow-xl relative overflow-hidden group bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
						>
							{/* Decorative elements */}
							<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500" />
							<div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent_50%)]" />
							<div className="relative z-10 h-full flex flex-col justify-between p-6">
								<div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl w-fit">
									<Code className="w-10 h-10 text-white" />
								</div>
								<div>
									<h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Projects</h3>
									<p className="text-white/80">Code & Creations</p>
								</div>
							</div>
						</Link>
					</motion.div>

					{/* Travel - (Row 1, Col 3) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						whileHover={{ scale: 1.02 }}
						className="col-span-1 row-span-1"
					>
						<Link
							to="/personal#travel"
							className="block h-full rounded-2xl shadow-lg relative overflow-hidden group bg-gradient-to-br from-emerald-500 to-teal-600"
						>
							<div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
							<div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
							<div className="relative z-10 h-full flex flex-col justify-between p-4">
								<div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl w-fit">
									<Globe className="w-6 h-6 text-white" />
								</div>
								<div>
									<h3 className="text-lg font-bold text-white">Travel</h3>
									<p className="text-white/70 text-sm">Adventures</p>
								</div>
							</div>
						</Link>
					</motion.div>

					{/* Library - (Row 1, Col 4) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						whileHover={{ scale: 1.02 }}
						className="col-span-1 row-span-1"
					>
						<Link
							to="/personal#library"
							className="block h-full rounded-2xl shadow-lg relative overflow-hidden group bg-gradient-to-br from-amber-500 to-orange-600"
						>
							<div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
							<div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
							<div className="relative z-10 h-full flex flex-col justify-between p-4">
								<div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl w-fit">
									<BookOpen className="w-6 h-6 text-white" />
								</div>
								<div>
									<h3 className="text-lg font-bold text-white">Library</h3>
									<p className="text-white/70 text-sm">Books & Knowledge</p>
								</div>
							</div>
						</Link>
					</motion.div>

					{/* Music - (Row 2, Col 3) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						whileHover={{ scale: 1.02 }}
						className="col-span-1 row-span-1"
					>
						<Link
							to="/personal#music"
							className="block h-full rounded-2xl shadow-lg relative overflow-hidden group bg-gradient-to-br from-pink-500 to-rose-600"
						>
							<div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
							<div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
							<div className="relative z-10 h-full flex flex-col justify-between p-4">
								<div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl w-fit">
									<Music className="w-6 h-6 text-white" />
								</div>
								<div>
									<h3 className="text-lg font-bold text-white">Music</h3>
									<p className="text-white/70 text-sm">Beats & Melodies</p>
								</div>
							</div>
						</Link>
					</motion.div>

					{/* Cooking - (Row 2, Col 4) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						whileHover={{ scale: 1.02 }}
						className="col-span-1 row-span-1"
					>
						<Link
							to="/personal#cooking"
							className="block h-full rounded-2xl shadow-lg relative overflow-hidden group bg-gradient-to-br from-violet-500 to-purple-600"
						>
							<div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
							<div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
							<div className="relative z-10 h-full flex flex-col justify-between p-4">
								<div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl w-fit">
									<ChefHat className="w-6 h-6 text-white" />
								</div>
								<div>
									<h3 className="text-lg font-bold text-white">Cooking</h3>
									<p className="text-white/70 text-sm">Recipes & Flavors</p>
								</div>
							</div>
						</Link>
					</motion.div>

					{/* Blog - Full width (Row 3, Col 1-4) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						whileHover={{ scale: 1.01 }}
						className="col-span-2 md:col-span-4 row-span-1"
					>
						<Link
							to="/blog"
							className="block h-full rounded-2xl shadow-lg relative overflow-hidden group bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900"
						>
							<div className="absolute top-0 right-1/4 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2" />
							<div className="absolute bottom-0 left-1/3 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
							<div className="relative z-10 h-full flex items-center justify-between gap-6 p-4 md:p-6">
								<div className="flex items-center gap-4 md:gap-6">
									<div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
										<Pen className="w-8 h-8 md:w-10 md:h-10 text-white" />
									</div>
									<div>
										<h3 className="text-xl md:text-2xl font-bold text-white">Blog</h3>
										<p className="text-white/70">Thoughts, Insights & Stories</p>
									</div>
								</div>
								<ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover:translate-x-2 transition-transform duration-300" />
							</div>
						</Link>
					</motion.div>
				</div>
			</section>
		</div>
	);
}

import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, GraduationCap, Briefcase, Code, Heart, ExternalLink } from 'lucide-react';
import { getPersonalData } from '../lib/dataLoader';
import { FlipCard } from '@/components/ui/FlipCard';
import { TiltCard } from '@/components/ui/TiltCard';

// Gradient colors for experience cards
const experienceGradients = [
	'from-blue-500 to-indigo-600',
	'from-emerald-500 to-teal-600',
	'from-purple-500 to-pink-600',
	'from-orange-500 to-red-500',
	'from-cyan-500 to-blue-600',
	'from-rose-500 to-purple-600',
];

// Certification card gradients and colors
const certGradients = [
	{ border: 'from-blue-400 via-cyan-400 to-teal-400', accent: 'text-blue-600 dark:text-blue-400', bg: 'from-blue-500/10 to-cyan-500/10' },
	{ border: 'from-purple-400 via-pink-400 to-rose-400', accent: 'text-purple-600 dark:text-purple-400', bg: 'from-purple-500/10 to-pink-500/10' },
	{ border: 'from-emerald-400 via-teal-400 to-cyan-400', accent: 'text-emerald-600 dark:text-emerald-400', bg: 'from-emerald-500/10 to-teal-500/10' },
	{ border: 'from-orange-400 via-amber-400 to-yellow-400', accent: 'text-orange-600 dark:text-orange-400', bg: 'from-orange-500/10 to-amber-500/10' },
	{ border: 'from-rose-400 via-red-400 to-orange-400', accent: 'text-rose-600 dark:text-rose-400', bg: 'from-rose-500/10 to-red-500/10' },
	{ border: 'from-indigo-400 via-purple-400 to-pink-400', accent: 'text-indigo-600 dark:text-indigo-400', bg: 'from-indigo-500/10 to-purple-500/10' },
	{ border: 'from-cyan-400 via-blue-400 to-indigo-400', accent: 'text-cyan-600 dark:text-cyan-400', bg: 'from-cyan-500/10 to-blue-500/10' },
];

export default function About() {
	const personalData = getPersonalData();

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
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Page Header */}
				<motion.div variants={itemVariants} className="text-center mb-12">
					<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						About <span className="gradient-text">Me</span>
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						My journey, skills, and achievements
					</p>
				</motion.div>

				{/* Skills & Interests */}
				<motion.section variants={itemVariants} className="mb-16">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Skills */}
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
								<div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-md">
									<Code className="w-5 h-5 text-white" />
								</div>
								Skills & Technologies
							</h3>
							<div className="flex flex-wrap gap-2">
								{personalData.profile.skills.map((skill) => (
									<span
										key={skill}
										className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-700 dark:text-primary-300 rounded-full border border-primary-200 dark:border-primary-800"
									>
										{skill}
									</span>
								))}
							</div>
						</div>

						{/* Interests */}
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
								<div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg shadow-md">
									<Heart className="w-5 h-5 text-white" />
								</div>
								Interests & Hobbies
							</h3>
							<div className="flex flex-wrap gap-2">
								{personalData.profile.interests.map((interest) => (
									<span
										key={interest}
										className="px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
									>
										{interest}
									</span>
								))}
							</div>
						</div>
					</div>
				</motion.section>

				{/* Experience */}
				<motion.section id="experience" variants={itemVariants} className="mb-16 scroll-mt-20">
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
						<div>
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
								<div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
									<Briefcase className="w-6 h-6 text-white" />
								</div>
								Work Experience
							</h2>
							<p className="text-gray-500 dark:text-gray-500 mt-2">
								Hover over cards to reveal details
							</p>
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							{personalData.experience.length} positions
						</div>
					</div>
          
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{personalData.experience.map((exp, index) => (
							<FlipCard
								key={`${exp.company}-${exp.startDate}`}
								gradient={experienceGradients[index % experienceGradients.length]}
								front={
									<>
										<div>
											<div className="flex items-center gap-3 mb-4">
												<div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center p-2">
													{exp.companyLogo ? (
														<img
															src={exp.companyLogo}
															alt={exp.company}
															className="w-full h-full object-contain"
														/>
													) : (
														<Briefcase className="w-6 h-6 text-gray-600 dark:text-gray-400" />
													)}
												</div>
												<div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
													{exp.endDate ? `${exp.startDate} - ${exp.endDate}` : 'Current'}
												</div>
											</div>
											<h3 className="text-xl font-bold mb-1 leading-tight">{exp.position}</h3>
											<p className="text-white/90 font-semibold">{exp.company}</p>
											<p className="text-white/60 text-sm mt-1 flex items-center gap-1">
												<MapPin className="w-3 h-3" />
												{exp.location}
											</p>
										</div>
										<div className="flex items-center gap-2 text-white/70 text-sm">
											{exp.technologies && exp.technologies.slice(0, 2).map((tech) => (
												<span key={tech} className="px-2 py-0.5 bg-white/10 rounded text-xs">
													{tech}
												</span>
											))}
											{exp.technologies && exp.technologies.length > 2 && (
												<span className="text-xs">+{exp.technologies.length - 2}</span>
											)}
										</div>
									</>
								}
								back={
									<div className="text-gray-600 dark:text-gray-400">
										{/* Header */}
										<div className="mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
											<h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
												{exp.position}
											</h3>
											<p className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
												{exp.company}
											</p>
											<p className="text-xs text-gray-500 mt-1">
												{exp.startDate} - {exp.endDate || 'Present'} • {exp.location}
											</p>
										</div>
										
										{/* Description */}
										<p className="text-sm mb-4 leading-relaxed">{exp.description}</p>
										
										{/* Achievements */}
										{exp.achievements && exp.achievements.length > 0 && (
											<div className="mb-4">
												<h4 className="text-xs font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider flex items-center gap-1">
													<Award className="w-3 h-3" />
													Key Achievements
												</h4>
												<ul className="space-y-1.5">
													{exp.achievements.map((achievement, i) => (
														<li key={i} className="text-xs flex items-start gap-2">
															<span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
															<span className="leading-relaxed">{achievement}</span>
														</li>
													))}
												</ul>
											</div>
										)}
										
										{/* Technologies */}
										{exp.technologies && exp.technologies.length > 0 && (
											<div>
												<h4 className="text-xs font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider flex items-center gap-1">
													<Code className="w-3 h-3" />
													Tech Stack
												</h4>
												<div className="flex flex-wrap gap-1.5">
													{exp.technologies.map((tech) => (
														<span
															key={tech}
															className="px-2 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700"
														>
															{tech}
														</span>
													))}
												</div>
											</div>
										)}
									</div>
								}
							/>
						))}
					</div>
				</motion.section>

				{/* Education */}
				<motion.section variants={itemVariants} className="mb-20">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
						<div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md">
							<GraduationCap className="w-6 h-6 text-white" />
						</div>
						Education
					</h2>

					<div className="grid grid-cols-1 gap-6">
						{personalData.education.map((edu) => (
							<TiltCard
								key={`${edu.institution}-${edu.startDate}`}
								borderGradient="from-emerald-400 via-teal-400 to-cyan-400"
								tiltAmount={8}
								className="h-full"
							>
								<div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
									{/* Subtle gradient background */}
									<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-50 dark:opacity-30" />
									
									{/* Top accent line */}
									<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
									
									<div className="relative p-8">
										<div className="flex flex-col md:flex-row md:items-start gap-6">
											{/* Logo */}
											<div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg border border-gray-100 dark:border-gray-700 p-2">
												{edu.logo ? (
													<img
														src={edu.logo}
														alt={edu.institution}
														className="w-full h-full object-contain"
													/>
												) : (
													<GraduationCap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
												)}
											</div>
											
											<div className="flex-1">
												<div className="flex flex-wrap items-start justify-between gap-4">
													<div>
														<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
															{edu.degree}
														</h3>
														<p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
															{edu.institution}
														</p>
													</div>
													<div className="text-right">
														<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
															{edu.startDate} – {edu.endDate}
														</p>
														<p className="text-sm text-gray-500 dark:text-gray-500">
															{edu.location}
														</p>
													</div>
												</div>
												
												{/* GPA Highlight */}
												{edu.gpa && (
													<div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-md">
														<Award className="w-4 h-4 text-white" />
														<span className="text-sm font-semibold text-white">
															{edu.gpa} CGPA
														</span>
													</div>
												)}
												
												{/* Achievements as bullet points */}
												{edu.honors && edu.honors.length > 0 && (
													<ul className="mt-4 space-y-2">
														{edu.honors.map((honor) => (
															<li
																key={honor}
																className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
															>
																<span className="w-1.5 h-1.5 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
																<span>{honor}</span>
															</li>
														))}
													</ul>
												)}
											</div>
										</div>
									</div>
								</div>
							</TiltCard>
						))}
					</div>
				</motion.section>

				{/* Certifications */}
				{personalData.certifications.length > 0 && (
					<motion.section variants={itemVariants} id="certifications" className="scroll-mt-20">
						<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
								<div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-md">
									<Award className="w-6 h-6 text-white" />
								</div>
								Certifications
							</h2>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								{personalData.certifications.length} credentials
							</div>
						</div>
            
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{personalData.certifications.map((cert, index) => {
								const gradient = certGradients[index % certGradients.length];
								return (
									<TiltCard
										key={cert.id}
										borderGradient={gradient.border}
										tiltAmount={10}
										className="h-full"
									>
										<div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group">
											{/* Subtle gradient background */}
											<div className={`absolute inset-0 bg-gradient-to-br ${gradient.bg} opacity-50 dark:opacity-30`} />
											
											{/* Top accent line */}
											<div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient.border}`} />
											
											{/* Content */}
											<div className="relative p-6 flex flex-col h-full min-h-[280px]">
												{/* Logo */}
												<div className="mb-4">
													{cert.logo && (
														<div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center">
															<img
																src={cert.logo}
																alt={cert.issuer}
																className="w-full h-full object-contain"
															/>
														</div>
													)}
												</div>
												
												{/* Certification Name */}
												<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
													{cert.name}
												</h3>
												
												{/* Issuer */}
												<p className={`font-semibold mb-3 ${gradient.accent}`}>
													{cert.issuer}
												</p>
												
												{/* Issue Date */}
												<div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400 mt-auto">
													<div className="flex items-center gap-2">
														<Calendar className="w-3.5 h-3.5" />
														<span>Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
													</div>
												</div>
												
												{/* View Credential Link */}
												{cert.credentialUrl && (
													<a
														href={cert.credentialUrl}
														target="_blank"
														rel="noopener noreferrer"
														className={`inline-flex items-center gap-2 mt-4 text-sm font-semibold ${gradient.accent} hover:underline transition-all group/link`}
													>
														<span>View Credential</span>
														<ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
													</a>
												)}
											</div>
										</div>
									</TiltCard>
								);
							})}
						</div>
					</motion.section>
				)}
			</div>
		</motion.div>
	);
}

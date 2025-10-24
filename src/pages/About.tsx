import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, GraduationCap, Briefcase, Code, Heart } from 'lucide-react';
import { getPersonalData } from '../lib/dataLoader';

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
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Header */}
				<motion.div variants={itemVariants} className="text-center mb-16">
					<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
						About <span className="gradient-text">Me</span>
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
						{personalData.profile.tagline}
					</p>
				</motion.div>

				{/* Profile Section */}
				<motion.section variants={itemVariants} className="mb-16">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
						<div className="space-y-6">
							<div className="glass-card p-6 rounded-xl">
								<img
									src={personalData.profile.profileImage}
									alt={personalData.profile.name}
									className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
								/>
							</div>

							<div className="glass-card p-6 rounded-xl">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Quick Facts
								</h3>
								<div className="space-y-3">
									<div className="flex items-center text-gray-600 dark:text-gray-400">
										<MapPin className="w-4 h-4 mr-3 text-primary-600 dark:text-primary-400" />
										{personalData.profile.location}
									</div>
									<div className="flex items-center text-gray-600 dark:text-gray-400">
										<Calendar className="w-4 h-4 mr-3 text-primary-600 dark:text-primary-400" />
										{personalData.profile.availability}
									</div>
									<div className="flex items-center text-gray-600 dark:text-gray-400">
										<Briefcase className="w-4 h-4 mr-3 text-primary-600 dark:text-primary-400" />
										{personalData.experience.length}+ years experience
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-8">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
									My Story
								</h2>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
									{personalData.profile.bio}
								</p>
							</div>

							{/* Skills */}
							<div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
									<Code className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
									Skills & Technologies
								</h3>
								<div className="flex flex-wrap gap-2">
									{personalData.profile.skills.map((skill) => (
										<span
											key={skill}
											className="px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
										>
											{skill}
										</span>
									))}
								</div>
							</div>

							{/* Interests */}
							<div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
									<Heart className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
									Interests & Hobbies
								</h3>
								<div className="flex flex-wrap gap-2">
									{personalData.profile.interests.map((interest) => (
										<span
											key={interest}
											className="px-3 py-1 text-sm font-medium glass-card text-gray-700 dark:text-gray-300 rounded-full"
										>
											{interest}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</motion.section>

				{/* Experience */}
				<motion.section variants={itemVariants} className="mb-16">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
						<Briefcase className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
						Work Experience
					</h2>
          
					<div className="space-y-6">
						{personalData.experience.map((exp) => (
							<motion.div
								key={`${exp.company}-${exp.startDate}`}
								className="glass-card p-6 rounded-xl"
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.2 }}
							>
								<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
									<div>
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
											{exp.position}
										</h3>
										<p className="text-primary-600 dark:text-primary-400 font-medium">
											{exp.company}
										</p>
										<p className="text-gray-600 dark:text-gray-400 text-sm">
											{exp.location}
										</p>
									</div>
									<div className="text-sm text-gray-500 dark:text-gray-500 mt-2 sm:mt-0">
										{exp.startDate} - {exp.endDate || 'Present'}
									</div>
								</div>
                
								<p className="text-gray-700 dark:text-gray-300 mb-4">
									{exp.description}
								</p>
                
								{exp.achievements && exp.achievements.length > 0 && (
									<div>
										<h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
											Key Achievements:
										</h4>
										<ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
											{exp.achievements.map((achievement, index) => (
												<li key={index}>{achievement}</li>
											))}
										</ul>
									</div>
								)}
                
								{exp.technologies && exp.technologies.length > 0 && (
									<div className="mt-4">
										<div className="flex flex-wrap gap-2">
											{exp.technologies.map((tech) => (
												<span
													key={tech}
													className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
												>
													{tech}
												</span>
											))}
										</div>
									</div>
								)}
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Education */}
				<motion.section variants={itemVariants} className="mb-16">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
						<GraduationCap className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
						Education
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{personalData.education.map((edu) => (
							<motion.div
								key={`${edu.institution}-${edu.startDate}`}
								className="glass-card p-6 rounded-xl"
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.2 }}
							>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									{edu.degree}
								</h3>
								<p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
									{edu.institution}
								</p>
								<p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
									{edu.location}
								</p>
								<p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
									{edu.startDate} - {edu.endDate}
								</p>
                
								{edu.description && (
									<p className="text-gray-700 dark:text-gray-300 text-sm">
										{edu.description}
									</p>
								)}
                
								{edu.gpa && (
									<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
										GPA: {edu.gpa}
									</p>
								)}
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Certifications */}
				{personalData.certifications.length > 0 && (
					<motion.section variants={itemVariants}>
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
							<Award className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
							Certifications
						</h2>
            
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{personalData.certifications.map((cert) => (
								<motion.div
									key={cert.name}
									className="glass-card p-6 rounded-xl text-center"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.2 }}
								>
									{cert.logo && (
										<div className="w-16 h-16 mx-auto mb-4 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-700">
											<img
												src={cert.logo}
												alt={cert.issuer}
												className="w-full h-full object-contain"
											/>
										</div>
									)}
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
										{cert.name}
									</h3>
									<p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
										{cert.issuer}
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-500">
										Issued: {cert.issueDate}
									</p>
									{cert.expiryDate && (
										<p className="text-sm text-gray-500 dark:text-gray-500">
											Expires: {cert.expiryDate}
										</p>
									)}

									{cert.credentialUrl && (
										<a
											href={cert.credentialUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-block mt-4 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
										>
											View Credential
										</a>
									)}
								</motion.div>
							))}
						</div>
					</motion.section>
				)}
			</div>
		</motion.div>
	);
}

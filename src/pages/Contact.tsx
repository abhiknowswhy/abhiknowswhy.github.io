import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Sparkles, MessageCircle } from 'lucide-react';
import { getPersonalData } from '../lib/dataLoader';
import { socialIcons, socialColors } from '@/lib/socialIcons';

export default function Contact() {
	const personalData = getPersonalData();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [focusedField, setFocusedField] = useState<string | null>(null);

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Create mailto link with form data
		const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
		const body = encodeURIComponent(
			`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
		);
		window.location.href = `mailto:${personalData.profile.email}?subject=${subject}&body=${body}`;
	};

	return (
		<motion.div
			className="min-h-screen"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Compact Header */}
				<motion.div variants={itemVariants} className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Get In <span className="gradient-text">Touch</span>
					</h1>
					<p className="mt-1 text-gray-600 dark:text-gray-400">
						Interested in opportunities, projects, or just a conversation about tech
					</p>
				</motion.div>
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
					{/* Contact Information - Left Side */}
					<motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-6">
						{/* Quick Contact Card */}
						<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 p-8 text-white flex-1">
							<div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
							<div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
							
							<div className="relative z-10">
								<div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
									<MessageCircle className="w-7 h-7" />
								</div>
								<h2 className="text-2xl font-bold mb-3">
									Let's Connect
								</h2>
								<p className="text-white/80 mb-6">
									Feel free to reach out. I typically respond within 24 hours.
								</p>
								
								{/* Email */}
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
										<Mail className="w-5 h-5" />
									</div>
									<div>
										<p className="text-white/60 text-sm">Email</p>
										<a
											href={`mailto:${personalData.profile.email}`}
											className="hover:text-white/80 transition-colors font-medium"
										>
											{personalData.profile.email}
										</a>
									</div>
								</div>
								
								{/* Location */}
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
										<MapPin className="w-5 h-5" />
									</div>
									<div>
										<p className="text-white/60 text-sm">Location</p>
										<p className="font-medium">{personalData.profile.location}</p>
									</div>
								</div>
							</div>
						</div>

						{/* Social Links Card */}
						<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
									<Sparkles className="w-4 h-4 text-white" />
								</span>
								Follow Me
							</h3>
							<div className="grid grid-cols-4 gap-3">
								{Object.entries(personalData.social).map(([platform, url]) => {
									const Icon = socialIcons[platform as keyof typeof socialIcons];
									const gradient = socialColors[platform] || 'from-gray-600 to-gray-800';
									if (!Icon || !url) return null;
                  
									return (
										<motion.a
											key={platform}
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className={`aspect-square rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300`}
											whileHover={{ scale: 1.1, rotate: 5 }}
											whileTap={{ scale: 0.95 }}
											aria-label={`Visit ${platform} profile`}
										>
											<Icon className="w-5 h-5 text-white" />
										</motion.a>
									);
								})}
							</div>
						</div>
					</motion.div>

					{/* Contact Form - Right Side */}
					<motion.div variants={itemVariants} className="lg:col-span-3 flex">
						<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 flex-1 flex flex-col">
							<div className="flex items-center gap-3 mb-8">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
									<Send className="w-6 h-6 text-white" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
										Send a Message
									</h2>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										Fill out the form and I'll get back to you
									</p>
								</div>
							</div>
              
							<form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									<div className="relative">
										<label
											htmlFor="name"
											className={`absolute left-4 transition-all duration-200 pointer-events-none ${
												focusedField === 'name' || formData.name
													? '-top-2.5 text-xs bg-white dark:bg-gray-800 px-2 text-primary-600 dark:text-primary-400 font-medium'
													: 'top-3.5 text-gray-400 dark:text-gray-500'
											}`}
										>
											Your Name *
										</label>
										<input
											type="text"
											id="name"
											name="name"
											required
											value={formData.name}
											onChange={handleInputChange}
											onFocus={() => setFocusedField('name')}
											onBlur={() => setFocusedField(null)}
											className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-0 focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-200"
										/>
									</div>

									<div className="relative">
										<label
											htmlFor="email"
											className={`absolute left-4 transition-all duration-200 pointer-events-none ${
												focusedField === 'email' || formData.email
													? '-top-2.5 text-xs bg-white dark:bg-gray-800 px-2 text-primary-600 dark:text-primary-400 font-medium'
													: 'top-3.5 text-gray-400 dark:text-gray-500'
											}`}
										>
											Email Address *
										</label>
										<input
											type="email"
											id="email"
											name="email"
											required
											value={formData.email}
											onChange={handleInputChange}
											onFocus={() => setFocusedField('email')}
											onBlur={() => setFocusedField(null)}
											className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-0 focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-200"
										/>
									</div>
								</div>

								<div className="relative">
									<label
										htmlFor="subject"
										className={`absolute left-4 transition-all duration-200 pointer-events-none ${
											focusedField === 'subject' || formData.subject
												? '-top-2.5 text-xs bg-white dark:bg-gray-800 px-2 text-primary-600 dark:text-primary-400 font-medium'
												: 'top-3.5 text-gray-400 dark:text-gray-500'
										}`}
									>
										Subject
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleInputChange}
										onFocus={() => setFocusedField('subject')}
										onBlur={() => setFocusedField(null)}
										className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-0 focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-200"
									/>
								</div>

								<div className="relative flex-1 flex flex-col">
									<label
										htmlFor="message"
										className={`absolute left-4 transition-all duration-200 pointer-events-none ${
											focusedField === 'message' || formData.message
												? '-top-2.5 text-xs bg-white dark:bg-gray-800 px-2 text-primary-600 dark:text-primary-400 font-medium z-10'
												: 'top-3.5 text-gray-400 dark:text-gray-500'
										}`}
									>
										Your Message *
									</label>
									<textarea
										id="message"
										name="message"
										required
										value={formData.message}
										onChange={handleInputChange}
										onFocus={() => setFocusedField('message')}
										onBlur={() => setFocusedField(null)}
										className="w-full flex-1 min-h-[120px] px-4 py-3.5 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-0 focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-200 resize-none"
									/>
								</div>

								<motion.button
									type="submit"
									className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 group"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
									Send Message
								</motion.button>
							</form>

							<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
								<p className="text-sm text-gray-500 dark:text-gray-400 text-center">
									This form will open your default email client. 
									You can also email me directly at{' '}
									<a
										href={`mailto:${personalData.profile.email}`}
										className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
									>
										{personalData.profile.email}
									</a>
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Code, Award, Briefcase } from 'lucide-react';

interface StatItem {
	value: number;
	label: string;
	icon: React.ReactNode;
	suffix?: string;
	color: string;
}

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 2000) {
	const [count, setCount] = useState(0);
	const [hasAnimated, setHasAnimated] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setHasAnimated(true);
					const startTime = Date.now();
					const animate = () => {
						const elapsed = Date.now() - startTime;
						const progress = Math.min(elapsed / duration, 1);
						const easeOut = 1 - Math.pow(1 - progress, 3);
						setCount(Math.floor(target * easeOut));
						if (progress < 1) {
							requestAnimationFrame(animate);
						}
					};
					animate();
				}
			},
			{ threshold: 0.5 }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [target, duration, hasAnimated]);

	return { count, ref };
}

interface StatsGlassBarProps {
	stats?: StatItem[];
}

export function StatsGlassBar({ stats: customStats }: StatsGlassBarProps) {
	// Default stats if none provided
	const defaultStats: StatItem[] = [
		{ value: 5, label: 'Years Experience', icon: <Briefcase className="w-6 h-6" />, suffix: '+', color: '#10B981' },
		{ value: 15, label: 'Projects Completed', icon: <Code className="w-6 h-6" />, suffix: '+', color: '#3B82F6' },
		{ value: 8, label: 'Certifications', icon: <Award className="w-6 h-6" />, color: '#F59E0B' },
	];

	const stats = customStats || defaultStats;

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="relative"
		>
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-3xl blur-xl" />
			
			{/* Glass card */}
			<div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
				<div className="flex flex-col md:flex-row items-center justify-around gap-8">
					{stats.map((stat, index) => (
						<GlassStatItem key={index} stat={stat} index={index} isLast={index === stats.length - 1} />
					))}
				</div>
			</div>
		</motion.div>
	);
}

function GlassStatItem({ stat, index, isLast }: { stat: StatItem; index: number; isLast: boolean }) {
	const { count, ref } = useAnimatedCounter(stat.value);

	return (
		<>
			<motion.div
				ref={ref}
				initial={{ opacity: 0, scale: 0.8 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				className="flex items-center gap-4"
			>
				<div 
					className="p-4 rounded-2xl"
					style={{ backgroundColor: `${stat.color}20` }}
				>
					<div style={{ color: stat.color }}>{stat.icon}</div>
				</div>
				<div>
					<span className="text-4xl font-bold text-gray-900 dark:text-white">
						{count}{stat.suffix}
					</span>
					<p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
				</div>
			</motion.div>
			{!isLast && (
				<div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
			)}
		</>
	);
}

export default StatsGlassBar;

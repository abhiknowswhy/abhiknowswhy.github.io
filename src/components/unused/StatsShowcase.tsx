import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Code, BookOpen, Calendar, TrendingUp, Award } from 'lucide-react';

interface StatItem {
	value: number;
	label: string;
	icon: React.ReactNode;
	suffix?: string;
	color: string;
}

interface StatsProps {
	stats: StatItem[];
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

// ============================================
// DESIGN 1: Animated Counter Cards with Progress Rings
// ============================================
export function StatsProgressRings({ stats }: StatsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{stats.map((stat, index) => (
				<ProgressRingCard key={index} stat={stat} index={index} />
			))}
		</div>
	);
}

function ProgressRingCard({ stat, index }: { stat: StatItem; index: number }) {
	const { count, ref } = useAnimatedCounter(stat.value);
	const circumference = 2 * Math.PI * 45;
	const progress = (count / stat.value) * 100;

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
		>
			<div className="flex flex-col items-center">
				{/* Progress Ring */}
				<div className="relative w-32 h-32 mb-4">
					<svg className="w-full h-full transform -rotate-90">
						{/* Background circle */}
						<circle
							cx="64"
							cy="64"
							r="45"
							stroke="currentColor"
							strokeWidth="8"
							fill="none"
							className="text-gray-200 dark:text-gray-700"
						/>
						{/* Progress circle */}
						<motion.circle
							cx="64"
							cy="64"
							r="45"
							stroke={stat.color}
							strokeWidth="8"
							fill="none"
							strokeLinecap="round"
							initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
							animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
							transition={{ duration: 2, ease: "easeOut" }}
						/>
					</svg>
					{/* Center content */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center">
							<span className="text-3xl font-bold text-gray-900 dark:text-white">
								{count}{stat.suffix}
							</span>
						</div>
					</div>
				</div>
				{/* Icon and label */}
				<div className={`p-3 rounded-full mb-3`} style={{ backgroundColor: `${stat.color}20` }}>
					<div style={{ color: stat.color }}>{stat.icon}</div>
				</div>
				<p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
			</div>
		</motion.div>
	);
}

// ============================================
// DESIGN 2: Bento Grid Layout
// ============================================
export function StatsBentoGrid({ stats }: StatsProps) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[120px] md:auto-rows-[140px]">
			{/* Large card */}
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="col-span-2 row-span-2 p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl flex flex-col justify-between text-white relative overflow-hidden"
			>
				<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
				<div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
				<div className="relative z-10">
					{stats[0]?.icon}
					<BentoCounter value={stats[0]?.value || 0} suffix={stats[0]?.suffix} large />
				</div>
				<p className="text-white/80 font-medium text-lg relative z-10">{stats[0]?.label}</p>
			</motion.div>

			{/* Medium cards */}
			{stats.slice(1, 3).map((stat, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
					className="col-span-1 row-span-1 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
				>
					<div style={{ color: stat.color }}>{stat.icon}</div>
					<div>
						<BentoCounter value={stat.value} suffix={stat.suffix} />
						<p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
					</div>
				</motion.div>
			))}

			{/* Wide card */}
			{stats[3] && (
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="col-span-2 row-span-1 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg flex items-center justify-between text-white"
				>
					<div className="flex items-center gap-4">
						{stats[3].icon}
						<div>
							<BentoCounter value={stats[3].value} suffix={stats[3].suffix} />
							<p className="text-white/80 text-sm">{stats[3].label}</p>
						</div>
					</div>
					<TrendingUp className="w-8 h-8 opacity-50" />
				</motion.div>
			)}
		</div>
	);
}

function BentoCounter({ value, suffix, large }: { value: number; suffix?: string; large?: boolean }) {
	const { count, ref } = useAnimatedCounter(value);
	return (
		<div ref={ref} className={`font-bold text-gray-900 dark:text-white ${large ? 'text-5xl md:text-6xl' : 'text-2xl'}`}>
			<span className={large ? 'text-white' : ''}>{count}{suffix}</span>
		</div>
	);
}

// ============================================
// DESIGN 3: Interactive Stats with Hover Details
// ============================================
export function StatsHoverDetails({ stats }: StatsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{stats.map((stat, index) => (
				<HoverDetailCard key={index} stat={stat} index={index} />
			))}
		</div>
	);
}

function HoverDetailCard({ stat, index }: { stat: StatItem; index: number }) {
	const { count, ref } = useAnimatedCounter(stat.value);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative h-48 cursor-pointer perspective-1000"
		>
			<motion.div
				animate={{ rotateY: isHovered ? 180 : 0 }}
				transition={{ duration: 0.6 }}
				className="relative w-full h-full"
				style={{ transformStyle: 'preserve-3d' }}
			>
				{/* Front */}
				<div 
					className="absolute inset-0 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center justify-center backface-hidden"
					style={{ backfaceVisibility: 'hidden' }}
				>
					<div 
						className="p-4 rounded-full mb-4"
						style={{ backgroundColor: `${stat.color}20` }}
					>
						<div style={{ color: stat.color }}>{stat.icon}</div>
					</div>
					<span className="text-4xl font-bold text-gray-900 dark:text-white">
						{count}{stat.suffix}
					</span>
					<p className="text-gray-500 dark:text-gray-400 mt-2">{stat.label}</p>
					<p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Hover for details</p>
				</div>

				{/* Back */}
				<div 
					className="absolute inset-0 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white"
					style={{ 
						backfaceVisibility: 'hidden', 
						transform: 'rotateY(180deg)',
						background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`
					}}
				>
					<div className="text-center">
						<span className="text-5xl font-bold">{count}{stat.suffix}</span>
						<p className="text-white/80 mt-2 font-medium">{stat.label}</p>
						<div className="mt-4 pt-4 border-t border-white/20">
							<p className="text-sm text-white/70">
								{stat.label === 'Projects Completed' && 'Across web, mobile & AI'}
								{stat.label === 'Books in Library' && 'Tech, fiction & self-help'}
								{stat.label === 'Years Experience' && 'Building digital products'}
							</p>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

// ============================================
// DESIGN 4: Glassmorphism Stats Bar (NOW IN USE - see StatsGlassBar.tsx)
// ============================================
export function StatsGlassBar({ stats }: StatsProps) {
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

// ============================================
// DESIGN 5: Stats with Animated Icons & Sparklines
// ============================================
export function StatsSparklines({ stats }: StatsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{stats.map((stat, index) => (
				<SparklineCard key={index} stat={stat} index={index} />
			))}
		</div>
	);
}

function SparklineCard({ stat, index }: { stat: StatItem; index: number }) {
	const { count, ref } = useAnimatedCounter(stat.value);
	
	// Generate random sparkline data
	const sparklineData = Array.from({ length: 12 }, () => Math.random() * 40 + 10);
	const maxVal = Math.max(...sparklineData);
	const points = sparklineData.map((val, i) => `${i * 20},${50 - (val / maxVal) * 40}`).join(' ');

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
		>
			<div className="flex items-start justify-between mb-4">
				<div>
					<p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
					<span className="text-3xl font-bold text-gray-900 dark:text-white">
						{count}{stat.suffix}
					</span>
				</div>
				<motion.div 
					className="p-3 rounded-xl"
					style={{ backgroundColor: `${stat.color}20` }}
					animate={{ rotate: [0, 10, -10, 0] }}
					transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
				>
					<div style={{ color: stat.color }}>{stat.icon}</div>
				</motion.div>
			</div>
			
			{/* Sparkline */}
			<div className="h-12 mt-4">
				<svg className="w-full h-full" viewBox="0 0 220 50" preserveAspectRatio="none">
					{/* Gradient fill */}
					<defs>
						<linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor={stat.color} stopOpacity="0.3" />
							<stop offset="100%" stopColor={stat.color} stopOpacity="0" />
						</linearGradient>
					</defs>
					{/* Area */}
					<motion.path
						initial={{ pathLength: 0 }}
						whileInView={{ pathLength: 1 }}
						transition={{ duration: 1.5, delay: index * 0.2 }}
						d={`M0,50 L0,${50 - (sparklineData[0] / maxVal) * 40} ${points} L220,50 Z`}
						fill={`url(#gradient-${index})`}
					/>
					{/* Line */}
					<motion.polyline
						initial={{ pathLength: 0 }}
						whileInView={{ pathLength: 1 }}
						transition={{ duration: 1.5, delay: index * 0.2 }}
						points={`0,${50 - (sparklineData[0] / maxVal) * 40} ${points}`}
						fill="none"
						stroke={stat.color}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			
			<div className="flex items-center gap-2 mt-2 text-sm">
				<TrendingUp className="w-4 h-4 text-green-500" />
				<span className="text-green-500 font-medium">+12%</span>
				<span className="text-gray-400 dark:text-gray-500">this month</span>
			</div>
		</motion.div>
	);
}

// ============================================
// DESIGN 6: 3D Tilting Cards
// ============================================
export function Stats3DTilt({ stats }: StatsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{stats.map((stat, index) => (
				<TiltCard key={index} stat={stat} index={index} />
			))}
		</div>
	);
}

function TiltCard({ stat, index }: { stat: StatItem; index: number }) {
	const { count, ref } = useAnimatedCounter(stat.value);
	const cardRef = useRef<HTMLDivElement>(null);
	
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	
	const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
	const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		x.set((e.clientX - centerX) / rect.width);
		y.set((e.clientY - centerY) / rect.height);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="perspective-1000"
		>
			<motion.div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
				className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl cursor-pointer"
			>
				{/* Gradient overlay */}
				<div 
					className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
					style={{ 
						background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}05)`,
					}}
				/>
				
				{/* Floating icon */}
				<motion.div 
					className="relative z-10 mb-6"
					style={{ transform: 'translateZ(40px)' }}
				>
					<div 
						className="inline-flex p-4 rounded-2xl"
						style={{ backgroundColor: `${stat.color}20` }}
					>
						<div style={{ color: stat.color }}>{stat.icon}</div>
					</div>
				</motion.div>
				
				{/* Content */}
				<motion.div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
					<span className="text-4xl font-bold text-gray-900 dark:text-white block mb-2">
						{count}{stat.suffix}
					</span>
					<p className="text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
				</motion.div>

				{/* Decorative elements */}
				<div 
					className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-10"
					style={{ backgroundColor: stat.color }}
				/>
				<div 
					className="absolute bottom-4 left-4 w-12 h-12 rounded-full opacity-10"
					style={{ backgroundColor: stat.color }}
				/>
			</motion.div>
		</motion.div>
	);
}

// ============================================
// DEMO: All Stats Designs Showcase
// ============================================
export function StatsShowcaseDemo() {
	const stats: StatItem[] = [
		{ value: 15, label: 'Projects Completed', icon: <Code className="w-6 h-6" />, suffix: '+', color: '#3B82F6' },
		{ value: 25, label: 'Books in Library', icon: <BookOpen className="w-6 h-6" />, color: '#8B5CF6' },
		{ value: 5, label: 'Years Experience', icon: <Calendar className="w-6 h-6" />, suffix: '+', color: '#10B981' },
		{ value: 12, label: 'Certifications', icon: <Award className="w-6 h-6" />, color: '#F59E0B' },
	];

	return (
		<div className="space-y-24 py-16">
			{/* Design 1 */}
			<section>
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
					Design 1: Progress Rings
				</h3>
				<StatsProgressRings stats={stats.slice(0, 3)} />
			</section>

			{/* Design 2 */}
			<section>
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
					Design 2: Bento Grid
				</h3>
				<StatsBentoGrid stats={stats} />
			</section>

			{/* Design 3 */}
			<section>
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
					Design 3: Hover Flip Cards
				</h3>
				<StatsHoverDetails stats={stats.slice(0, 3)} />
			</section>

			{/* Design 4 */}
			<section>
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
					Design 4: Glassmorphism Bar
				</h3>
				<StatsGlassBar stats={stats.slice(0, 3)} />
			</section>

			{/* Design 5 */}
			<section>
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
					Design 5: Sparkline Cards
				</h3>
				<StatsSparklines stats={stats.slice(0, 3)} />
			</section>

			{/* Design 6 */}
			<section>
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
					Design 6: 3D Tilt Cards
				</h3>
				<Stats3DTilt stats={stats.slice(0, 3)} />
			</section>
		</div>
	);
}

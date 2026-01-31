import { useState, useId } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
	front: ReactNode;
	back: ReactNode;
	className?: string;
	gradient?: string;
	scrollbarColor?: string;
}

// Map Tailwind gradient classes to hex colors
const gradientToColor: Record<string, { light: string; dark: string; accent: string }> = {
	'from-blue-500 to-indigo-600': { light: '#3b82f6', dark: '#60a5fa', accent: '#dbeafe' },
	'from-emerald-500 to-teal-600': { light: '#10b981', dark: '#34d399', accent: '#d1fae5' },
	'from-purple-500 to-pink-600': { light: '#a855f7', dark: '#c084fc', accent: '#f3e8ff' },
	'from-orange-500 to-red-500': { light: '#f97316', dark: '#fb923c', accent: '#ffedd5' },
	'from-cyan-500 to-blue-600': { light: '#06b6d4', dark: '#22d3ee', accent: '#cffafe' },
	'from-rose-500 to-purple-600': { light: '#f43f5e', dark: '#fb7185', accent: '#ffe4e6' },
};

export function FlipCard({
	front,
	back,
	className = '',
	gradient = 'from-blue-500 to-purple-600',
	scrollbarColor,
}: FlipCardProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	const uniqueId = useId().replace(/:/g, '');
	
	// Get scrollbar color from gradient or use provided color
	const colors = gradientToColor[gradient] || { light: '#3b82f6', dark: '#60a5fa', accent: '#dbeafe' };
	const lightColor = scrollbarColor || colors.light;
	const darkColor = scrollbarColor || colors.dark;

	return (
		<div
			className={`relative h-[340px] md:h-[300px] ${className}`}
			style={{ perspective: '1200px' }}
			onMouseEnter={() => setIsFlipped(true)}
			onMouseLeave={() => setIsFlipped(false)}
		>
			<motion.div
				className="relative w-full h-full"
				initial={false}
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.5, type: 'spring', stiffness: 80, damping: 15 }}
				style={{ transformStyle: 'preserve-3d' }}
			>
				{/* Front of card - Professional Design */}
				<div
					className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl overflow-hidden"
					style={{ backfaceVisibility: 'hidden', pointerEvents: isFlipped ? 'none' : 'auto' }}
				>
					{/* Gradient background */}
					<div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
					
					{/* Subtle pattern overlay */}
					<div 
						className="absolute inset-0 opacity-10"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}}
					/>
					
					{/* Decorative shapes */}
					<div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
					<div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
					
					{/* Glass effect strip at top */}
					<div className="absolute top-0 left-0 right-0 h-1 bg-white/30" />
					
					{/* Content */}
					<div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
						{front}
					</div>
					
					{/* Hover hint */}
					<div className="absolute bottom-4 right-4 flex items-center gap-1 text-white/50 text-xs">
						<span>Details</span>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</div>

				{/* Back of card - Professional Design */}
				<div
					className="absolute inset-0 w-full h-full rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
					style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', pointerEvents: isFlipped ? 'auto' : 'none' }}
				>
					{/* Gradient accent bar */}
					<div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`} />
					
					{/* Subtle side accent */}
					<div 
						className="absolute left-0 top-0 bottom-0 w-1 opacity-20"
						style={{ background: lightColor }}
					/>
					
					{/* Content area */}
					<div 
						className={`flip-card-scroll-${uniqueId} h-full p-5 pt-4 overflow-y-auto`}
					>
						{back}
					</div>
				</div>
			</motion.div>

			{/* Custom scrollbar styles */}
			<style>{`
				.flip-card-scroll-${uniqueId}::-webkit-scrollbar {
					width: 5px;
				}
				.flip-card-scroll-${uniqueId}::-webkit-scrollbar-track {
					background: transparent;
					margin: 8px 0;
				}
				.flip-card-scroll-${uniqueId}::-webkit-scrollbar-thumb {
					background: ${lightColor}40;
					border-radius: 10px;
				}
				.flip-card-scroll-${uniqueId}::-webkit-scrollbar-thumb:hover {
					background: ${lightColor}80;
				}
				.dark .flip-card-scroll-${uniqueId}::-webkit-scrollbar-thumb {
					background: ${darkColor}40;
				}
				.dark .flip-card-scroll-${uniqueId}::-webkit-scrollbar-thumb:hover {
					background: ${darkColor}80;
				}
				.flip-card-scroll-${uniqueId} {
					scrollbar-width: thin;
					scrollbar-color: ${lightColor}40 transparent;
				}
				.dark .flip-card-scroll-${uniqueId} {
					scrollbar-color: ${darkColor}40 transparent;
				}
			`}</style>
		</div>
	);
}

export default FlipCard;

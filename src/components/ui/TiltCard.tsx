import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
	children: ReactNode;
	className?: string;
	tiltAmount?: number;
	glareEnabled?: boolean;
	borderGradient?: string;
}

export function TiltCard({
	children,
	className = '',
	tiltAmount = 12,
	glareEnabled = true,
	borderGradient,
}: TiltCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	
	const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), { stiffness: 300, damping: 30 });
	const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), { stiffness: 300, damping: 30 });
	
	// Glare effect position
	const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
	const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
	const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });
	
	// Glare background - computed outside conditional
	const glareBackground = useTransform(
		[glareX, glareY],
		([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.4) 0%, transparent 50%)`
	);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		x.set((e.clientX - centerX) / rect.width);
		y.set((e.clientY - centerY) / rect.height);
		glareOpacity.set(0.15);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
		glareOpacity.set(0);
	};

	return (
		<div className={`${className}`} style={{ perspective: '1000px' }}>
			<motion.div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
				className="relative h-full"
			>
				{/* Animated border gradient */}
				{borderGradient && (
					<motion.div 
						className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${borderGradient} opacity-0 transition-opacity duration-300`}
						style={{ opacity: glareOpacity }}
					/>
				)}
				
				{/* Card content */}
				<div className="relative h-full rounded-2xl overflow-hidden">
					{children}
					
					{/* Glare effect */}
					{glareEnabled && (
						<motion.div
							className="absolute inset-0 pointer-events-none rounded-2xl"
							style={{
								background: glareBackground,
								opacity: glareOpacity,
							}}
						/>
					)}
				</div>
				
				{/* 3D shadow */}
				<motion.div
					className="absolute inset-0 rounded-2xl bg-black/20 dark:bg-black/40 -z-10"
					style={{
						transform: 'translateZ(-30px)',
						filter: 'blur(15px)',
					}}
				/>
			</motion.div>
		</div>
	);
}

export default TiltCard;

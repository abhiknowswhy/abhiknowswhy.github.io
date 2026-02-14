/* eslint-disable react-refresh/only-export-components */
import { useState, useRef, useCallback, type ReactNode, type ComponentType } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TiltCard } from './TiltCard';
import { FlipCard } from './FlipCard';

// ---------------------------------------------------------------------------
// CardStyle — UI wrapper layer (controls visual effect per card)
// ---------------------------------------------------------------------------

export interface CardStyle {
	wrapper?: ComponentType<CardStyleWrapperProps>;
	wrap?: (children: ReactNode) => ReactNode;
}

export interface CardStyleWrapperProps {
	children: ReactNode;
	className?: string;
}

export function resolveCardStyle(
	style?: CardStyle,
): (children: ReactNode) => ReactNode {
	if (!style) return (children) => children;
	if (style.wrap) return style.wrap;
	if (style.wrapper) {
		const Wrapper = style.wrapper;
		return (children) => <Wrapper>{children}</Wrapper>;
	}
	return (children) => children;
}

/** Default card style — subtle hover lift with spring animation. */
export const plainCardStyle: CardStyle = {
	wrap: (children: ReactNode) => (
		<motion.div
			className="h-full"
			whileHover={{ y: -4 }}
			transition={{ type: 'spring', stiffness: 300, damping: 20 }}
		>
			{children}
		</motion.div>
	),
};

/** 3D tilt card style with perspective tilt and glare on hover. */
export const tiltCardStyle: CardStyle = {
	wrap: (children: ReactNode) => (
		<TiltCard tiltAmount={10} glareEnabled>
			{children}
		</TiltCard>
	),
};

/** Factory for flip card style — produces a CardStyle with back content baked in. */
export function createFlipCardStyle(
	backContent: ReactNode | ((front: ReactNode) => ReactNode),
	gradient?: string,
): CardStyle {
	return {
		wrap: (children: ReactNode) => {
			const back =
				typeof backContent === 'function'
					? (backContent as (front: ReactNode) => ReactNode)(children)
					: backContent;
			return (
				<FlipCard front={children} back={back} gradient={gradient} />
			);
		},
	};
}

/** Smooth scale-up on hover with shadow bloom. */
export const scaleCardStyle: CardStyle = {
	wrap: (children: ReactNode) => (
		<motion.div
			className="h-full"
			whileHover={{ scale: 1.05 }}
			transition={{ type: 'spring', stiffness: 260, damping: 20 }}
		>
			<div className="h-full transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] rounded-xl">
				{children}
			</div>
		</motion.div>
	),
};

/** Neon glow border that pulses on hover. */
function GlowCardWrapper({ children }: CardStyleWrapperProps) {
	const [hovered, setHovered] = useState(false);
	return (
		<div
			className="relative h-full group"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div
				className={cn(
					'absolute -inset-[2px] rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 opacity-0 blur-sm transition-opacity duration-500',
					hovered && 'opacity-75 animate-pulse',
				)}
			/>
			<div className="relative h-full rounded-xl overflow-hidden">
				{children}
			</div>
		</div>
	);
}
export const glowCardStyle: CardStyle = { wrapper: GlowCardWrapper };

/** Radial spotlight that follows the cursor over the card. */
function SpotlightCardWrapper({ children }: CardStyleWrapperProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;
			mouseX.set(e.clientX - rect.left);
			mouseY.set(e.clientY - rect.top);
		},
		[mouseX, mouseY],
	);

	const spotlightX = useSpring(mouseX, { stiffness: 300, damping: 30 });
	const spotlightY = useSpring(mouseY, { stiffness: 300, damping: 30 });
	const spotlightOpacity = useMotionValue(0);

	const background = useTransform(
		[spotlightX, spotlightY],
		([x, y]) =>
			`radial-gradient(circle 120px at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 70%)`,
	);

	return (
		<motion.div
			ref={containerRef}
			className="relative h-full overflow-hidden rounded-xl"
			onMouseMove={handleMouseMove}
			onMouseEnter={() => spotlightOpacity.set(1)}
			onMouseLeave={() => spotlightOpacity.set(0)}
			whileHover={{ y: -2 }}
			transition={{ type: 'spring', stiffness: 300, damping: 25 }}
		>
			{children}
			<motion.div
				className="absolute inset-0 pointer-events-none rounded-xl"
				style={{ background, opacity: spotlightOpacity }}
			/>
		</motion.div>
	);
}
export const spotlightCardStyle: CardStyle = { wrapper: SpotlightCardWrapper };

/** Frosted glass morphism with subtle float animation. */
export const glassCardStyle: CardStyle = {
	wrap: (children: ReactNode) => (
		<motion.div
			className="relative h-full group"
			whileHover={{ y: -6 }}
			transition={{ type: 'spring', stiffness: 200, damping: 18 }}
		>
			<div className="absolute inset-0 rounded-xl bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
			<div className="relative h-full">
				{children}
			</div>
		</motion.div>
	),
};

// ---------------------------------------------------------------------------
// CardRenderer<T> — content layer (controls what data is rendered)
// ---------------------------------------------------------------------------

export interface CardRenderer<T> {
	render?: (item: T, index: number) => ReactNode;
	component?: ComponentType<{ item: T; index: number }>;
}

export function resolveRenderer<T>(renderer: CardRenderer<T>): (item: T, index: number) => ReactNode {
	if (renderer.render) return renderer.render;
	if (renderer.component) {
		const Comp = renderer.component;
		return (item: T, index: number) => <Comp item={item} index={index} />;
	}
	throw new Error('CardRenderer must provide either a `render` function or a `component`.');
}

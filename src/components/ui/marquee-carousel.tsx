// @refresh reset
import { useState, useEffect, useRef, useCallback, type ReactNode, type ComponentType } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

function resolveCardStyle(
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

interface MarqueeCarouselProps<T> {
	/** The data items to render inside the marquee. */
	items: T[];
	/** The card renderer strategy — either a render function or a component. */
	renderCard: CardRenderer<T>;
	cardStyle?: CardStyle;
	/** Width of each item in pixels. @default 180 */
	itemWidth?: number;
	/** Gap between items in pixels. @default 16 */
	gap?: number;
	/** Auto-scroll speed in pixels per frame (~60fps). @default 0.8 */
	speed?: number;
	/** How many items to jump when clicking an arrow. @default 3 */
	skipCount?: number;
	/** Whether to show navigation arrows. @default true */
	showArrows?: boolean;
	/** Whether to show the item count badge. @default true */
	showCount?: boolean;
	/** Label for the count badge (e.g. "books", "songs"). @default "items" */
	countLabel?: string;
	/** Whether to show fade edges. @default true */
	showFadeEdges?: boolean;
	/** Optional header content (e.g. title) rendered on the left of the header row. */
	header?: ReactNode;
	/** Additional className for the outer wrapper. */
	className?: string;
	/** Custom className for the arrow buttons. */
	arrowClassName?: string;
	/**
	 * Custom className for the fade-edge gradient.
	 * Should provide `from-{color}` to match the container background.
	 * @default "from-white dark:from-gray-800"
	 */
	fadeEdgeClassName?: string;
	/** Pause auto-scroll entirely. @default false */
	paused?: boolean;
}

function resolveRenderer<T>(renderer: CardRenderer<T>): (item: T, index: number) => ReactNode {
	if (renderer.render) return renderer.render;
	if (renderer.component) {
		const Comp = renderer.component;
		return (item: T, index: number) => <Comp item={item} index={index} />;
	}
	throw new Error('CardRenderer must provide either a `render` function or a `component`.');
}

export function MarqueeCarousel<T>({
	items,
	renderCard,
	cardStyle,
	itemWidth = 180,
	gap = 16,
	speed = 0.8,
	skipCount = 3,
	showArrows = true,
	showCount = true,
	countLabel = 'items',
	showFadeEdges = true,
	header,
	className,
	arrowClassName,
	fadeEdgeClassName = 'from-white dark:from-gray-800',
	paused = false,
}: MarqueeCarouselProps<T>) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const [overflows, setOverflows] = useState(true);
	const isHoveredRef = useRef(false);
	const isScrollingRef = useRef(false);
	const pausedRef = useRef(paused);
	const rafRef = useRef<number>(0);
	const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const itemCount = items.length;
	const contentRenderFn = resolveRenderer(renderCard);
	const applyStyle = resolveCardStyle(cardStyle);

	// Compose: content renderer → card style wrapper
	const renderFn = (item: T, index: number) =>
		applyStyle(contentRenderFn(item, index));

	// Detect whether items overflow the container
	useEffect(() => {
		const checkOverflow = () => {
			const totalContentWidth = itemCount * itemWidth + (itemCount - 1) * gap;
			const containerWidth = containerRef.current?.clientWidth ?? 0;
			setOverflows(totalContentWidth > containerWidth);
		};
		checkOverflow();
		window.addEventListener('resize', checkOverflow);
		return () => window.removeEventListener('resize', checkOverflow);
	}, [itemCount, itemWidth, gap]);

	// Keep refs in sync
	useEffect(() => {
		isHoveredRef.current = isHovered;
	}, [isHovered]);

	useEffect(() => {
		pausedRef.current = paused;
	}, [paused]);

	// Continuous auto-scroll via requestAnimationFrame (only when overflowing)
	useEffect(() => {
		if (!overflows) return;
		const el = scrollRef.current;
		if (!el) return;

		const tick = () => {
			if (!isHoveredRef.current && !isScrollingRef.current && !pausedRef.current && el) {
				const halfWidth = el.scrollWidth / 2;
				el.scrollLeft += speed;
				if (el.scrollLeft >= halfWidth) {
					el.scrollLeft -= halfWidth;
				}
			}
			rafRef.current = requestAnimationFrame(tick);
		};

		rafRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafRef.current);
	}, [speed, overflows]);

	// Manual scroll by arrow buttons — pause auto-scroll while animating
	const scroll = (direction: 'left' | 'right') => {
		if (!scrollRef.current) return;
		isScrollingRef.current = true;
		if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

		const amount = (itemWidth + gap) * skipCount;
		scrollRef.current.scrollBy({
			left: direction === 'right' ? amount : -amount,
			behavior: 'smooth',
		});

		scrollTimeoutRef.current = setTimeout(() => {
			isScrollingRef.current = false;
		}, 600);
	};

	// Duplicate items for seamless infinite loop (only when overflowing)
	const displayItems = overflows ? [...items, ...items] : items;

	return (
		<div ref={containerRef} className={cn('space-y-4', className)}>
			{/* Header row: title + count + arrows */}
			{(header || showArrows || showCount) && (
				<div className="flex items-center justify-between">
					<div className="flex-1 min-w-0">{header}</div>
					<div className="flex items-center gap-3 flex-shrink-0 ml-4">
						{showCount && (
							<span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300">
								<span className="font-semibold text-gray-900 dark:text-white">{itemCount}</span>
								{itemCount === 1 ? countLabel.replace(/s$/, '') : countLabel}
							</span>
						)}
						{showArrows && overflows && (
							<div className="flex items-center gap-1.5">
								<button
									onClick={() => scroll('left')}
									className={cn(
										'p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200',
										arrowClassName,
									)}
									aria-label="Scroll left"
								>
									<ChevronLeft className="w-5 h-5" />
								</button>
								<button
									onClick={() => scroll('right')}
									className={cn(
										'p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200',
										arrowClassName,
									)}
									aria-label="Scroll right"
								>
									<ChevronRight className="w-5 h-5" />
								</button>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Marquee viewport */}
			<div
				className="relative overflow-hidden"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Fade edges */}
				{showFadeEdges && overflows && (
					<>
						<div
							className={cn(
								'pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r to-transparent',
								fadeEdgeClassName,
							)}
						/>
						<div
							className={cn(
								'pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l to-transparent',
								fadeEdgeClassName,
							)}
						/>
					</>
				)}

				<div
					ref={scrollRef}
					className="overflow-x-auto scrollbar-hide"
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				>
					<div className="flex w-max" style={{ gap }}>
						{displayItems.map((item, index) => (
							<div key={index} className="flex-shrink-0" style={{ width: itemWidth }}>
								{renderFn(item, index % itemCount)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

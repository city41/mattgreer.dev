import React, { CSSProperties, useEffect, useRef, useState } from 'react';

type FadeInOnScrollProps = {
	className?: string;
	comeFrom: 'left' | 'right';
	children: React.ReactNode;
};

const COMMON_STYLE: CSSProperties = {
	transition: 'opacity 0.6s ease-out, transform 0.8s ease-out',
	willChange: 'opacity, visibility',
};

const NOT_VISIBLE_COME_IN_FROM_RIGHT_STYLE: CSSProperties = {
	...COMMON_STYLE,
	transform: 'translateX(10vw)',
	opacity: 0,
	visibility: 'hidden',
};

const NOT_VISIBLE_COME_IN_FROM_LEFT_STYLE: CSSProperties = {
	...COMMON_STYLE,
	transform: 'translateX(-10vw)',
	opacity: 0,
	visibility: 'hidden',
};

const VISIBLE_STYLE: CSSProperties = {
	...COMMON_STYLE,
	transform: 'none',
	opacity: 1,
	visibility: 'visible',
};

function prefersReducedMotion() {
	return (
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
	);
}

function FadeInOnScroll({
	className,
	comeFrom,
	children,
}: FadeInOnScrollProps) {
	const ref = useRef();
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		let observer: IntersectionObserver;

		if ('IntersectionObserver' in window && !prefersReducedMotion()) {
			observer = new IntersectionObserver((entries) => {
				setVisible(entries[0]?.isIntersecting);

				if (entries[0]?.isIntersecting) {
					observer.unobserve(ref.current);
				}
			});

			observer.observe(ref.current);
		}

		return () => observer?.unobserve(ref.current);
	}, []);

	const style = visible
		? VISIBLE_STYLE
		: comeFrom === 'left'
		? NOT_VISIBLE_COME_IN_FROM_LEFT_STYLE
		: NOT_VISIBLE_COME_IN_FROM_RIGHT_STYLE;

	return (
		<div ref={ref} className={className} style={style}>
			{children}
		</div>
	);
}

export { FadeInOnScroll };

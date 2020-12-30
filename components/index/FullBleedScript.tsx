import React from 'react';

type FullBleedScriptProps = {
	rootId: string;
	titleId: string;
	nextInPageId: string;
};

type Point = { x: number; y: number };
type Bounds = { left: number; top: number; right: number; bottom: number };

type Particle = {
	x: number;
	y: number;
	color: string;
	targetAlpha: number;
	currentAlpha: number;
};

function animateFullBleed(args: FullBleedScriptProps) {
	const { rootId, titleId, nextInPageId, imgSrc } = args;

	function isInMobileMode(root: HTMLDivElement): boolean {
		const { height } = root.getBoundingClientRect();

		return height < window.innerHeight * 0.75;
	}

	const fullBleedRoot = document.getElementById(
		rootId
	) as HTMLDivElement | null;

	if (!fullBleedRoot) {
		return;
	}

	if (fullBleedRoot.querySelector('canvas')) {
		return;
	}

	const bounds = fullBleedRoot.getBoundingClientRect();

	if (bounds.width === 0) {
		setTimeout(() => animateFullBleed(args), 25);
		return;
	}

	if (isInMobileMode(fullBleedRoot)) {
		return;
	}

	const nextInPage = document.getElementById(nextInPageId);

	if (nextInPage) {
		nextInPage.classList.remove('mt-24');
		nextInPage.style.setProperty(
			'margin-top',
			`-${Math.round(window.innerHeight / 3)}px`
		);

		let scrollTop;
		let ticking = false;

		document.addEventListener('scroll', () => {
			scrollTop = document.scrollingElement.scrollTop;

			if (!ticking) {
				requestAnimationFrame(() => {
					const margin = Math.min(
						document.scrollingElement.scrollTop,
						bounds.height
					);
					fullBleedRoot.style.setProperty(
						'transform',
						`translateY(-${margin}px)`
					);

					ticking = false;
				});

				ticking = true;
			}
		});
	}

	const title = fullBleedRoot.querySelector(`#${titleId}`);
	const titleChildren = Array.from(title.children);

	const titleBounds = titleChildren.reduce<Bounds>(
		(buildingBounds, child) => {
			const childBounds = child.getBoundingClientRect();

			return {
				left: Math.min(buildingBounds.left, childBounds.left) - 20,
				right: Math.max(buildingBounds.right, childBounds.right) + 20,
				top: Math.min(buildingBounds.top, childBounds.top),
				bottom: Math.max(buildingBounds.bottom, childBounds.bottom) + 20,
			};
		},
		{
			left: Number.MAX_SAFE_INTEGER,
			right: Number.MIN_SAFE_INTEGER,
			top: Number.MAX_SAFE_INTEGER,
			bottom: Number.MIN_SAFE_INTEGER,
		}
	);

	const canvas = document.createElement('canvas');
	canvas.width = bounds.width;
	canvas.height = bounds.height;
	canvas.style.setProperty('position', 'absolute');
	canvas.style.setProperty('z-index', '0');
	canvas.style.setProperty('top', '0');
	canvas.style.setProperty('left', '0');

	fullBleedRoot.appendChild(canvas);

	const context = canvas.getContext('2d');

	const S = Math.sin;

	const BAR_COUNT = 100;
	const barWidth = Math.round(canvas.width / BAR_COUNT);
	const yOverlap = 20;
	let tick = 0;

	const waveOffset = canvas.height * 0.4;

	function drawPolygon(
		x: number,
		baseY: number,
		overlap: number,
		leftY: number,
		rightY: number
	) {
		context.beginPath();
		context.moveTo(x, baseY);
		context.lineTo(x, leftY + waveOffset + overlap);
		context.lineTo(x + barWidth, rightY + waveOffset + overlap);
		context.lineTo(x + barWidth, baseY);
		context.closePath();
		context.fill();
	}

	function getWaveHeight(seed: number): number {
		const height =
			(Math.sin((seed + tick) / (BAR_COUNT / 10)) * canvas.height) / 4;

		return height / ((seed + 1) * 0.04);
	}

	let last;

	function drawWave(timestamp: number) {
		if (last === undefined) {
			last = timestamp;
		}

		const delta = timestamp - last;
		last = timestamp;

		tick += 0.005 * delta;

		context.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < BAR_COUNT; i++) {
			const leftWaveHeight = getWaveHeight(i);
			const rightWaveHeight = getWaveHeight(i + 1);

			const x = i * barWidth;

			context.fillStyle = 'rgba(255, 255, 255, 0.05)';
			drawPolygon(x, 0, yOverlap, leftWaveHeight, rightWaveHeight);

			context.fillStyle = 'rgba(255, 255, 255, 0.08)';
			drawPolygon(x, canvas.height, 0, leftWaveHeight, rightWaveHeight);
		}

		requestAnimationFrame(drawWave);
	}

	requestAnimationFrame(drawWave);
}

function FullBleedScript(props: FullBleedScriptProps) {
	return (
		<script
			type="text/javascript"
			dangerouslySetInnerHTML={{
				__html: `${animateFullBleed.toString()}; animateFullBleed(${JSON.stringify(
					props
				)})`,
			}}
		></script>
	);
}

export { FullBleedScript };

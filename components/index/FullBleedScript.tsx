import React from 'react';

type FullBleedScriptProps = {
	rootId: string;
	titleId: string;
	nextInPageId: string;
	imgSrc: string;
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

		return height < window.innerHeight / 2;
	}

	const fullBleedRoot = document.getElementById(rootId) as HTMLDivElement;

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
		nextInPage.classList.add('-mt-72');

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

	const img = new Image();
	img.src = imgSrc;
	img.onload = () => {
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

		const imgCanvas = document.createElement('canvas');
		imgCanvas.width = img.width;
		imgCanvas.height = img.height;
		imgCanvas.getContext('2d').drawImage(img, 0, 0);
		const imgData = imgCanvas
			.getContext('2d')
			.getImageData(0, 0, imgCanvas.width, imgCanvas.height);

		fullBleedRoot.appendChild(canvas);

		const context = canvas.getContext('2d');

		const COMMON_FILL = '#BA654F';
		const EDGE_FILL = '#c9765f';
		const IMG_FILL = '#aa391f';

		const SQUARE_SIZE = 10;

		let drawn: boolean[][] = [[]];

		const MAX_X = Math.floor(canvas.width / SQUARE_SIZE);
		const MAX_Y = Math.floor(canvas.height / SQUARE_SIZE);

		console.log({ MAX_X, MAX_Y });

		const particles: Array<Particle> = [
			{
				x: 0,
				y: 0,
				color: EDGE_FILL,
				currentAlpha: 0,
				targetAlpha: Math.random(),
			},
			{
				x: MAX_X,
				y: MAX_Y,
				color: EDGE_FILL,
				currentAlpha: 0,
				targetAlpha: Math.random(),
			},
			{
				x: MAX_X,
				y: 0,
				color: EDGE_FILL,
				currentAlpha: 0,
				targetAlpha: Math.random(),
			},
			{
				x: 0,
				y: MAX_Y,
				color: EDGE_FILL,
				currentAlpha: 0,
				targetAlpha: Math.random(),
			},
		];

		let squaresPerDraw = 1;

		function isInBounds(p: Point, bounds: Bounds): boolean {
			const x = p.x * SQUARE_SIZE;
			const y = p.y * SQUARE_SIZE;

			if (x > bounds.right) {
				return false;
			}

			if (x + SQUARE_SIZE < bounds.left) {
				return false;
			}

			if (y > bounds.bottom) {
				return false;
			}

			if (y + SQUARE_SIZE < bounds.top) {
				return false;
			}

			return true;
		}

		function isEdgeOfBounds(p: Point, bounds: Bounds): boolean {
			const leftBounds = {
				left: bounds.left - SQUARE_SIZE,
				right: bounds.left,
				top: bounds.top,
				bottom: bounds.bottom,
			};

			const rightBounds = {
				left: bounds.right,
				right: bounds.right + SQUARE_SIZE,
				top: bounds.top,
				bottom: bounds.bottom,
			};

			const topBounds = {
				left: bounds.left,
				right: bounds.right,
				top: bounds.top - SQUARE_SIZE,
				bottom: bounds.top,
			};

			const bottomBounds = {
				left: bounds.left,
				right: bounds.right,
				top: bounds.bottom,
				bottom: bounds.bottom + SQUARE_SIZE,
			};

			return [leftBounds, rightBounds, topBounds, bottomBounds].some((b) =>
				isInBounds(p, b)
			);
		}

		function isImgBounds(p: Point, imgData: ImageData): boolean {
			const dataIndex = p.y * imgData.width + p.x;

			const pixel = imgData.data[dataIndex * 4 + 3];

			return pixel !== 0 && pixel !== undefined;
		}

		function doesParticleHave(x: number, y: number): boolean {
			return particles.some((s) => s.x === x && s.y === y);
		}

		function getColorAndAlpha(x: number, y: number) {
			const p = { x, y };
			if (isEdgeOfBounds(p, titleBounds)) {
				return { color: EDGE_FILL, targetAlpha: 1 };
			} else if (isImgBounds(p, imgData)) {
				return { color: IMG_FILL, targetAlpha: 1 };
			} else {
				return { color: COMMON_FILL, targetAlpha: Math.random() };
			}
		}

		function drawSquare() {
			for (let i = 0; i < squaresPerDraw && particles.length > 0; ++i) {
				const randomIndex = Math.floor(Math.random() * particles.length);
				const particle = particles.splice(randomIndex, 1)[0];

				const { x, y } = particle;

				if (!isInBounds(particle, titleBounds)) {
					context.globalAlpha = 1;

					if (isEdgeOfBounds(particle, titleBounds)) {
						context.fillStyle = EDGE_FILL;
					} else if (isImgBounds(particle, imgData)) {
						context.fillStyle = IMG_FILL;
					} else {
						context.fillStyle = COMMON_FILL;
						context.globalAlpha = Math.random();
					}

					context.fillRect(
						x * SQUARE_SIZE,
						y * SQUARE_SIZE,
						SQUARE_SIZE,
						SQUARE_SIZE
					);
				}

				drawn[y] = drawn[y] ?? [];
				drawn[y][x] = true;

				if (x < MAX_X - 1 && !doesParticleHave(x + 1, y)) {
					const { color, targetAlpha } = getColorAndAlpha(x + 1, y);
					particles.push({ x: x + 1, y, color, currentAlpha: 0, targetAlpha });
				}

				if (x > 0 && !doesParticleHave(x - 1, y)) {
					const { color, targetAlpha } = getColorAndAlpha(x - 1, y);
					particles.push({ x: x - 1, y, color, currentAlpha: 0, targetAlpha });
				}

				if (y < MAX_Y - 1 && !doesParticleHave(x, y + 1)) {
					const { color, targetAlpha } = getColorAndAlpha(x, y + 1);
					particles.push({ x, y: y + 1, color, currentAlpha: 0, targetAlpha });
				}

				if (y > 0 && !doesParticleHave(x, y - 1)) {
					const { color, targetAlpha } = getColorAndAlpha(x, y - 1);
					particles.push({ x, y: y - 1, color, currentAlpha: 0, targetAlpha });
				}
			}

			if (particles.length > 0) {
				squaresPerDraw += 1;
				setTimeout(() => {
					requestAnimationFrame(drawSquare);
				}, 1);
			}
		}

		requestAnimationFrame(drawSquare);
	};
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

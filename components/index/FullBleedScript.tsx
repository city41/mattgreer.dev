import React from 'react';

type FullBleedScriptProps = {
	rootId: string;
	titleId: string;
};

type Spot = { x: number; y: number };
type Bounds = { left: number; top: number; right: number; bottom: number };

function animateFullBleed(fullBleedRootId: string, fullBleedTitleId: string) {
	function isInMobileMode(root: HTMLDivElement): boolean {
		const { height } = root.getBoundingClientRect();

		return height < window.innerHeight / 2;
	}

	const fullBleedRoot = document.getElementById(
		fullBleedRootId
	) as HTMLDivElement;

	if (!fullBleedRoot) {
		return;
	}

	if (fullBleedRoot.querySelector('canvas')) {
		return;
	}

	const bounds = fullBleedRoot.getBoundingClientRect();

	if (bounds.width === 0) {
		setTimeout(() => animateFullBleed(fullBleedRootId, fullBleedTitleId), 25);
		return;
	}

	const title = fullBleedRoot.querySelector(`#${fullBleedTitleId}`);

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

	if (isInMobileMode(fullBleedRoot)) {
		return;
	}

	const canvas = document.createElement('canvas');
	canvas.width = bounds.width;
	canvas.height = bounds.height;
	canvas.style.setProperty('position', 'absolute');
	canvas.style.setProperty('z-index', '0');
	canvas.style.setProperty('top', '0');
	canvas.style.setProperty('left', '0');

	fullBleedRoot.appendChild(canvas);

	const context = canvas.getContext('2d');

	const COMMON_FILL = '#BA654F22';
	const EDGE_FILL = '#c9765f';
	const SHADOW_FILL = '#50180b';

	const SQUARE_SIZE = 10;

	let drawn: boolean[][] = [[]];

	const MAX_X = Math.floor(canvas.width / SQUARE_SIZE);
	const MAX_Y = Math.floor(canvas.height / SQUARE_SIZE);

	const toDraw: Array<Spot> = [
		{ x: 0, y: 0 },
		{ x: MAX_X, y: MAX_Y },
		{ x: MAX_X, y: 0 },
		{ x: 0, y: MAX_Y },
	];

	let squaresPerDraw = 1;

	function isInBounds(spot: Spot, bounds: Bounds): boolean {
		const x = spot.x * SQUARE_SIZE;
		const y = spot.y * SQUARE_SIZE;

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

	function isEdgeOfBounds(spot: Spot, bounds: Bounds): boolean {
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
			isInBounds(spot, b)
		);
	}
	function isShadowBounds(spot: Spot, bounds: Bounds): boolean {
		return false;
		const shadowBounds = {
			left: bounds.left,
			right: bounds.right,
			top: bounds.bottom + SQUARE_SIZE,
			bottom: bounds.bottom + 2 * SQUARE_SIZE,
		};

		return isInBounds(spot, shadowBounds);
	}

	function drawSquare() {
		for (let i = 0; i < squaresPerDraw && toDraw.length > 0; ++i) {
			const randomIndex = Math.floor(Math.random() * toDraw.length);
			const spot = toDraw.splice(randomIndex, 1)[0];
			const { x, y } = spot;

			if (!isInBounds(spot, titleBounds)) {
				if (isEdgeOfBounds(spot, titleBounds)) {
					context.fillStyle = EDGE_FILL;
				} else if (isShadowBounds(spot, titleBounds)) {
					context.fillStyle = SHADOW_FILL;
				} else {
					context.fillStyle = COMMON_FILL;
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

			const nextSpots: Array<{ x: number; y: number }> = [];

			if (x < MAX_X - 1 && !drawn[y][x + 1]) {
				toDraw.push({ x: x + 1, y });
			}

			if (x > 0 && !drawn[y][x - 1]) {
				toDraw.push({ x: x - 1, y });
			}

			if (y < MAX_Y - 1 && !drawn[y + 1]?.[x]) {
				toDraw.push({ x, y: y + 1 });
			}

			if (y > 0 && !drawn[y - 1]?.[x]) {
				toDraw.push({ x, y: y - 1 });
			}
		}

		if (toDraw.length > 0) {
			squaresPerDraw += 1;
			setTimeout(() => {
				requestAnimationFrame(drawSquare);
			}, 1);
		}
	}

	requestAnimationFrame(drawSquare);
}

function FullBleedScript({ rootId, titleId }: FullBleedScriptProps) {
	return (
		<script
			type="text/javascript"
			dangerouslySetInnerHTML={{
				__html: `${animateFullBleed.toString()}; animateFullBleed('${rootId}', '${titleId}');`,
			}}
		></script>
	);
}

export { FullBleedScript };

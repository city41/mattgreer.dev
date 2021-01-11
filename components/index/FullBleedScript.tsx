import React from 'react';

type FullBleedScriptProps = {
	rootId: string;
	nextInPageId: string;
	floatingImgSrc: string;
	reflectionImgSrc: string;
};

function animateFullBleed(args: FullBleedScriptProps) {
	const { rootId, nextInPageId, floatingImgSrc, reflectionImgSrc } = args;

	const isSafari = !!(navigator.vendor?.indexOf('Apple') > -1);

	function isInMobileMode(): boolean {
		return window.innerWidth < 800;
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

	if (isInMobileMode()) {
		setTimeout(() => animateFullBleed(args), 2000);
		return;
	}

	const nextInPage = document.getElementById(nextInPageId);

	let waitingOnScroll = false;

	if (nextInPage) {
		nextInPage.classList.remove('mt-24');
		nextInPage.style.setProperty(
			'margin-top',
			`-${Math.round(window.innerHeight / 3)}px`
		);

		let scrollTop;

		document.addEventListener(
			'scroll',
			() => {
				scrollTop = document.scrollingElement.scrollTop;

				if (!waitingOnScroll) {
					requestAnimationFrame(() => {
						const margin = Math.min(
							document.scrollingElement.scrollTop,
							bounds.height
						);
						fullBleedRoot.style.setProperty(
							'transform',
							`translateY(-${margin}px)`
						);

						if (isSafari) {
							// fix a safari specific bug where the title/arrow disappear
							// when scrolling back up to the top of the page
							// they seem to disappear because the canvas gets z ordered on top of them
							// removing then re-adding the canvas is the only hack I could find that works
							fullBleedRoot.removeChild(canvas);
							fullBleedRoot.appendChild(canvas);
						}

						waitingOnScroll = false;
					});

					waitingOnScroll = true;
				}
			},
			{ passive: true }
		);
	}

	const canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	fullBleedRoot.style.setProperty('height', `${window.innerHeight}px`);
	canvas.style.setProperty('position', 'absolute');
	canvas.style.setProperty('z-index', '0');
	canvas.style.setProperty('top', '0');
	canvas.style.setProperty('left', '0');

	fullBleedRoot.appendChild(canvas);

	const context = canvas.getContext('2d');

	const seaGradient = context.createLinearGradient(0, 0, 0, canvas.height);
	seaGradient.addColorStop(0, '#118a8b');
	seaGradient.addColorStop(0.25, '#118a8b');
	seaGradient.addColorStop(1, '#063232');

	const BAR_COUNT = 40;
	let barWidth = Math.ceil(canvas.width / BAR_COUNT);
	const yOverlap = 20;
	const tickRate = 0.003;
	let tick = 0;

	window.addEventListener(
		'resize',
		() => {
			if (isInMobileMode()) {
				canvas.style.display = 'none';
				fullBleedRoot.style.removeProperty('height');
			} else {
				fullBleedRoot.style.setProperty('height', `${window.innerHeight}px`);
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				barWidth = Math.ceil(canvas.width / BAR_COUNT);

				canvas.style.display = 'block';
			}
		},
		{ passive: true }
	);

	// draw the polygons just slightly bigger so they overlap a bit.
	// since all colors are opaque, this won't cause any ill effects, and helps
	// ensure on all machines, there isn't a tiny/thin border between each bar
	const fudge = 1;

	function drawPolygon(
		x: number,
		upperLeftY: number,
		upperRightY: number,
		lowerLeftY: number,
		lowerRightY: number
	) {
		context.beginPath();
		context.moveTo(x - fudge, upperLeftY);
		context.lineTo(x - fudge, lowerLeftY);
		context.lineTo(x + barWidth + fudge, lowerRightY);
		context.lineTo(x + barWidth + fudge, upperRightY);
		context.closePath();
		context.fill();
	}

	let heightTweak = 0.5;

	function getWaveHeight(seed: number): number {
		const height =
			(Math.sin((seed + tick) / (BAR_COUNT / 10)) * canvas.height) / 5;

		return (height * Math.sin(heightTweak) * seed) / BAR_COUNT / 2; // * Math.cos((tick * seed) / BAR_COUNT); // / ((seed + 1) * 0.04);
	}

	const floaterIndex = Math.floor(BAR_COUNT * 0.8);

	const img = new Image();
	img.src = floatingImgSrc;
	const reflectionImg = new Image();
	reflectionImg.src = reflectionImgSrc;

	function drawFloater(waveOffset: number, tick: number) {
		if (!img.width || !reflectionImg.width) {
			return;
		}

		const leftHeight = getWaveHeight(floaterIndex - 1);
		const rightHeight = getWaveHeight(floaterIndex + 1);

		// by subtracting 2, it causes the floater to slightly desync with
		// the wave, giving the impression it's sloshing around in the water
		const x = (floaterIndex - 4) * barWidth;
		const y = (leftHeight + rightHeight) / 2 + waveOffset + yOverlap * 2.5;

		const angle = Math.atan(
			(rightHeight - leftHeight) / ((canvas.width * 2) / BAR_COUNT)
		);

		context.save();
		context.translate(x, y);
		context.rotate(angle);

		const sliceHeight = 2;

		for (let y = 6; y < reflectionImg.height; y += sliceHeight) {
			const rowXOffset = Math.sin(y / 4 + tick * 0.5) * 8;

			context.drawImage(
				reflectionImg,
				0,
				y,
				reflectionImg.width,
				sliceHeight,
				rowXOffset - 5,
				34 + y,
				reflectionImg.width,
				sliceHeight
			);
		}

		context.drawImage(
			img,
			0,
			0,
			img.width,
			img.height,
			0,
			0,
			img.width,
			img.height
		);
		context.restore();
	}

	let last;

	function mainDraw(timestamp: number) {
		if (last === undefined) {
			last = timestamp;
		}

		const delta = timestamp - last;
		last = timestamp;

		tick += tickRate * delta;

		if (waitingOnScroll || isInMobileMode()) {
			setTimeout(() => {
				// reset last so delta doesn't increase by 1 second, causing
				// a huge jump in the animation
				last = undefined;
				requestAnimationFrame(mainDraw);
			}, 1000);
			return;
		}

		context.clearRect(0, 0, canvas.width, canvas.height);

		heightTweak += 1 / 100;

		const waveOffset = canvas.height * 0.4;

		for (let i = 0; i < BAR_COUNT; i++) {
			const leftWaveHeight = getWaveHeight(i);
			const rightWaveHeight = getWaveHeight(i + 1);

			const x = i * barWidth;

			context.fillStyle = '#489393';

			drawPolygon(
				x,
				leftWaveHeight - yOverlap + waveOffset,
				rightWaveHeight - yOverlap + waveOffset,
				leftWaveHeight + waveOffset,
				rightWaveHeight + waveOffset
			);

			context.fillStyle = seaGradient;

			drawPolygon(
				x,
				leftWaveHeight + waveOffset,
				rightWaveHeight + waveOffset,
				canvas.height,
				canvas.height
			);
		}

		drawFloater(waveOffset, tick);

		requestAnimationFrame(mainDraw);
	}

	requestAnimationFrame(mainDraw);
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

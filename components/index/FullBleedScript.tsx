import React from 'react';

type FullBleedScriptProps = {
	id: string;
};

function animateFullBleed(fullBleedId: string) {
	const fullBleedRoot = document.getElementById(fullBleedId);

	if (!fullBleedRoot) {
		return;
	}

	if (fullBleedRoot.querySelector('canvas')) {
		return;
	}

	const bounds = fullBleedRoot.getBoundingClientRect();

	if (bounds.width === 0) {
		setTimeout(() => animateFullBleed(fullBleedId), 10);
		return;
	}

	console.log('width', bounds.width, 'height', bounds.height);

	const canvas = document.createElement('canvas');
	canvas.width = bounds.width;
	canvas.height = bounds.height;
	canvas.style.setProperty('position', 'absolute');
	canvas.style.setProperty('z-index', '0');
	canvas.style.setProperty('top', '0');
	canvas.style.setProperty('left', '0');

	fullBleedRoot.appendChild(canvas);

	const context = canvas.getContext('2d');

	// function drawSquare() {
	// 	const channel = Math.floor(Math.random() * 255);
	// 	context.fillStyle = `rgb(${channel}, ${channel}, ${channel})`;
	// 	context.fillRect(
	// 		Math.random() * canvas.width,
	// 		Math.random() * canvas.height,
	// 		10,
	// 		10
	// 	);
	//
	// 	requestAnimationFrame(drawSquare);
	// }
	//
	// requestAnimationFrame(drawSquare);

	context.fillStyle = 'blue';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function FullBleedScript({ id }: FullBleedScriptProps) {
	return (
		<script
			type="text/javascript"
			dangerouslySetInnerHTML={{
				__html: `${animateFullBleed.toString()}; animateFullBleed('${id}');`,
			}}
		></script>
	);
}

export { FullBleedScript };

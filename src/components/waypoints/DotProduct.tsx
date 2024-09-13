import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Point } from './simulation/sim/types';
import { Button } from './simulation/Button';
import {
	RiPlayLargeFill,
	RiPlayReverseLargeFill,
	RiStopFill,
} from 'react-icons/ri';

const MAGNITUDE = 80;

function getVectorFromAngle(angle: number, magnitude: number) {
	const x = magnitude * Math.cos(angle);
	const y = magnitude * Math.sin(angle);

	return { x, y };
}

function round(n: number) {
	return n.toFixed(1);
}

function dot(a: Point, b: Point) {
	return a.x * b.x + a.y * b.y;
}

function drawArrowHead(
	context: CanvasRenderingContext2D,
	angle: number,
	vector: Point,
	style: string
) {
	const centerX = context.canvas.width / 2;
	const centerY = context.canvas.height / 2;

	context.save();
	context.fillStyle = style;
	context.translate(centerX + vector.x, centerY + vector.y);
	context.rotate(angle);

	// draw triangle centered at zero
	context.beginPath();
	context.moveTo(-5, -5);
	context.lineTo(-5, 5);
	context.lineTo(5, 0);
	context.fill();
	context.restore();
}

function drawVector(
	context: CanvasRenderingContext2D,
	angle: number,
	vector: Point,
	style: string,
	lineWidth = 1
) {
	const centerX = context.canvas.width / 2;
	const centerY = context.canvas.height / 2;

	context.save();
	context.strokeStyle = style;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.moveTo(centerX, centerY);
	context.lineTo(centerX + vector.x, centerY + vector.y);
	context.stroke();
	context.restore();

	drawArrowHead(context, angle, vector, style);

	// now draw the label
	context.fillStyle = 'black';
	context.font = '12pt sans-serif';
	context.fillText(
		`(${round(vector.x)},${round(vector.y)})`,
		centerX + vector.x + 4,
		centerY + vector.y + 4
	);
}

function drawAngles(canvas: HTMLCanvasElement, angleA: number, angleB: number) {
	const context = canvas.getContext('2d');

	if (!context) {
		return;
	}

	context.fillStyle = 'white';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	const vectorA = getVectorFromAngle(angleA, MAGNITUDE);
	drawVector(context, angleA, vectorA, 'red', 2);
	const vectorB = getVectorFromAngle(angleB, MAGNITUDE);
	drawVector(context, angleB, vectorB, 'blue', 2);
}

function DotProduct({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [angleA, setAngleA] = useState(0);
	const angleB = Math.PI / 2 - 0.1;

	useEffect(() => {
		if (canvasRef.current) {
			drawAngles(canvasRef.current, angleA, angleB);
		}
	}, [angleA, angleB]);

	const vectorA = getVectorFromAngle(angleA, MAGNITUDE);
	const vectorB = getVectorFromAngle(angleB, MAGNITUDE);

	return (
		<div className={clsx(className, 'flex justify-center')}>
			<div className="relative">
				<canvas
					className="border border-black"
					ref={canvasRef}
					width={320}
					height={224}
				/>
				<div className="absolute top-2 left-0 right-0 w-full flex flex-col gap-y-2 items-center">
					<div>dot product: (a.x*b.x) + (a.y*b.y)</div>
					<div>
						({round(vectorA.x)}*{round(vectorB.x)}) + ({round(vectorA.y)}*
						{round(vectorB.y)}) = <b>{round(dot(vectorA, vectorB))}</b>
					</div>
				</div>
				<div className="text-3xl absolute left-0 bottom-0">
					<Button onClick={() => setAngleA((a) => a - 0.1)}>
						<RiPlayReverseLargeFill />
					</Button>
					<Button onClick={() => setAngleA((a) => a + 0.1)}>
						<RiPlayLargeFill />
					</Button>
				</div>
			</div>
		</div>
	);
}

export { DotProduct };

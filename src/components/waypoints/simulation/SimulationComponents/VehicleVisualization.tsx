import { useEffect, useRef } from 'react';
import { DEGREES_PER_INDEX, degreesToRadians } from '../sim/mathutil';
import { Point } from '../sim/types';
import clsx from 'clsx';
import { IVehicle, VEHICLE_LENGTH, VEHICLE_WIDTH } from '../sim/IVehicle';
import { Waypoint } from '../sim/Waypoint';

const SCALE = 10;
const SIZE = 500;

type VehicleVisualizationProps = {
	vehicle: IVehicle;
	waypoints: Waypoint[];
};

function drawBody(context: CanvasRenderingContext2D, vehicle: IVehicle) {
	context.save();
	context.translate(SIZE / 2, SIZE / 2);
	context.rotate(vehicle.velocityAngle);

	context.fillStyle = 'green';

	const l = VEHICLE_LENGTH * SCALE;
	const w = VEHICLE_WIDTH * SCALE;

	context.fillRect(-l / 2, -w / 2, l, w);
	context.restore();
}

function drawVector(
	context: CanvasRenderingContext2D,
	vector: Point,
	style: string,
	lineWidth = 1
) {
	const x = vector.x * SCALE;
	const y = vector.y * SCALE;

	const centerX = SIZE / 2;
	const centerY = SIZE / 2;

	context.save();
	context.strokeStyle = style;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.moveTo(centerX, centerY);
	context.lineTo(centerX + x, centerY + y);
	context.stroke();
	context.restore();
}

function getVectorFromAngle(angle: number, magnitude: number) {
	const x = magnitude * Math.cos(angle);
	const y = magnitude * Math.sin(angle);

	return { x, y };
}

function visualizeVehicle(
	canvas: HTMLCanvasElement,
	vehicle: IVehicle,
	waypoints: Waypoint[]
) {
	canvas.width = SIZE;
	canvas.height = SIZE;

	const context = canvas.getContext('2d');

	if (!context) {
		throw new Error('visualizeVehicle: failed to get the canvas context');
	}

	context.fillStyle = 'rgb(255, 200, 200)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	const waypoint = waypoints[vehicle.targetWaypoint];
	const translatedWaypoint = {
		x: waypoint.x - vehicle.x,
		y: waypoint.y - vehicle.y,
	};

	drawBody(context, vehicle);
	drawVector(context, translatedWaypoint, 'blue');

	vehicle.calcedTurnDecisionDots.forEach((ctdd) => {
		const vector = getVectorFromAngle(ctdd.turnedAngle, ctdd.magnitude);
		drawVector(
			context,
			vector,
			ctdd.best ? 'orange' : ctdd.turn == 0 ? 'white' : 'black',
			ctdd.best ? 3 : 1
		);
	});
}

function VehicleVisualization({
	vehicle,
	waypoints,
}: VehicleVisualizationProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef.current) {
			visualizeVehicle(canvasRef.current, vehicle, waypoints);
		}
	}, [vehicle]);

	return <canvas ref={canvasRef} width={SIZE} height={SIZE} />;
}

export { VehicleVisualization };

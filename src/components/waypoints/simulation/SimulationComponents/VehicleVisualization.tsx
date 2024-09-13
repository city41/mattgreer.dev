import { useEffect, useRef } from 'react';
import { Point } from '../sim/types';
import { IVehicle, VEHICLE_LENGTH, VEHICLE_WIDTH } from '../sim/IVehicle';
import { Waypoint } from '../sim/Waypoint';

const SCALE = 8;
const SIZE = 200;

type VehicleVisualizationProps = {
	className?: string;
	vehicle?: IVehicle;
	waypoints?: Waypoint[];
};

function drawBody(
	context: CanvasRenderingContext2D,
	vehicle: IVehicle | undefined
) {
	context.save();
	context.translate(SIZE / 2, SIZE / 2);
	context.rotate(vehicle?.velocityAngle ?? 0);

	context.fillStyle = 'rgb(200, 255, 200)';

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
	vehicle: IVehicle | undefined,
	waypoints: Waypoint[] | undefined
) {
	canvas.width = SIZE;
	canvas.height = SIZE;

	const context = canvas.getContext('2d');

	if (!context) {
		throw new Error('visualizeVehicle: failed to get the canvas context');
	}

	context.fillStyle = 'rgb(255, 200, 200)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	drawBody(context, vehicle);

	if (vehicle && waypoints) {
		const waypoint = waypoints[vehicle.targetWaypoint];
		const translatedWaypoint = {
			x: waypoint.x - vehicle.x,
			y: waypoint.y - vehicle.y,
		};

		drawVector(context, translatedWaypoint, 'red');

		vehicle.calcedTurnDecisionDots.forEach((ctdd) => {
			const vector = getVectorFromAngle(ctdd.turnedAngle, ctdd.magnitude);
			drawVector(
				context,
				vector,
				ctdd.best ? 'green' : 'black',
				ctdd.best ? 4 : 2
			);
		});
	}
}

function VehicleVisualization({
	className,
	vehicle,
	waypoints,
}: VehicleVisualizationProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef.current) {
			visualizeVehicle(canvasRef.current, vehicle, waypoints);
		}
	}, [vehicle]);

	return (
		<canvas
			style={{ backgroundColor: 'purple' }}
			className={className}
			ref={canvasRef}
			width={SIZE}
			height={SIZE}
		/>
	);
}

export { VehicleVisualization };

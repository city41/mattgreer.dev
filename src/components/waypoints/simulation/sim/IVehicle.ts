import { Waypoint } from './Waypoint';
import { Point, Circle } from './types';

export const VEHICLE_LENGTH = 10;
export const VEHICLE_WIDTH = 5;

type CalcedTurnDecisionDot = {
	turnedAngle: number;
	magnitude: number;
	best: boolean;
	turn: -1 | 0 | 1;
};

export interface IVehicle {
	x: number;
	y: number;
	prevX: number;
	prevY: number;
	targetWaypoint: number;
	velocityAngle: number;

	update(waypoints: Waypoint[]);
	draw(context: CanvasRenderingContext2D, shouldDrawBoundingCircle: boolean);
	clone(): IVehicle;
	steerAwayFrom(point: Point);

	boundingCircle: Circle;

	calcedTurnDecisionDots: CalcedTurnDecisionDot[];
}

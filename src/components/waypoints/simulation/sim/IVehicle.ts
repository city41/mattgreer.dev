import { Waypoint } from './Waypoint';
import { Point, Sphere } from './types';

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
	targetWaypoint: number;
	velocityAngle: number;

	update(waypoints: Waypoint[]);
	draw(context: CanvasRenderingContext2D);
	clone(): IVehicle;
	steerAwayFrom(point: Point);

	nearnessSphere: Sphere;

	calcedTurnDecisionDots: CalcedTurnDecisionDot[];
}

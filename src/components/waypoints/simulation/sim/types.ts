import { Waypoint } from './Waypoint';

export type Point = {
	x: number;
	y: number;
};

export type Sphere = Point & { radius: number };

export interface IVehicle {
	x: number;
	y: number;
	targetWaypoint: number;

	update(waypoints: Waypoint[]);
	draw(context: CanvasRenderingContext2D);
	clone(): IVehicle;
	steerAwayFrom(point: Point);

	nearnessSphere: Sphere;
}

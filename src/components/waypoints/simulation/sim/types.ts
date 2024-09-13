import { Waypoint } from './Waypoint';

export type Point = {
	x: number;
	y: number;
};

export type Sphere = Point & { radius: number };

import { Waypoint } from './Waypoint';

// the main difference is these waypoints keep the car on
// the track when it always goes straight towards the next
// waypoint
const basicWaypoints: Waypoint[] = [
	new Waypoint(261, 128, 16, 0),
	new Waypoint(270, 193, 20, 1),
	new Waypoint(160, 189, 20, 2),
	new Waypoint(158, 81, 20, 3),
	new Waypoint(272, 71, 16, 4),
	new Waypoint(260, 32, 16, 5),
	new Waypoint(60, 25, 20, 6),
	new Waypoint(65, 112, 20, 7),
];

const waypoints: Waypoint[] = [
	new Waypoint(261, 128, 16, 0),
	new Waypoint(230, 193, 20, 1, true),
	new Waypoint(160, 189, 20, 2),
	new Waypoint(158, 81, 20, 3),
	new Waypoint(209, 75, 16, 4),
	new Waypoint(272, 71, 16, 5),
	new Waypoint(240, 32, 16, 6),
	new Waypoint(162, 21, 16, 7),
	new Waypoint(82, 25, 20, 8),
	new Waypoint(73, 108, 20, 9, true),
	new Waypoint(129, 122, 16, 10),
];

export { basicWaypoints, waypoints };

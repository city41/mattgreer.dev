import { IVehicle } from './IVehicle';
import { Waypoint } from './Waypoint';
import { getDistance } from './trig';
import { Circle } from './types';

type HistoryEntry = {
	vehicles: IVehicle[];
};

function circlesOverlap(a: Circle, b: Circle): boolean {
	const distBetweenCenters = getDistance(a.x, a.y, b.x, b.y);

	return distBetweenCenters <= a.radius + b.radius;
}

type CollisionDetection = 'none' | 'undo' | 'steer-away';

type SimulationOptions = {
	frames: number;
	collisionDetection: CollisionDetection;
	drawboundingCircles: boolean;
};

const DEFAULT_OPTIONS: SimulationOptions = {
	frames: 100,
	collisionDetection: 'none',
	drawboundingCircles: false,
};

class Simulation {
	#canvas: HTMLCanvasElement;
	#vehicles: IVehicle[];
	#waypoints: Waypoint[];
	#track: HTMLImageElement | null;
	#trackBridge: HTMLImageElement | null;
	#history: HistoryEntry[];
	#fullOptions: SimulationOptions = DEFAULT_OPTIONS;

	constructor(
		canvas: HTMLCanvasElement,
		vehicles: IVehicle[],
		waypoints: Waypoint[],
		options: Partial<SimulationOptions> = DEFAULT_OPTIONS
	) {
		this.#fullOptions = { ...DEFAULT_OPTIONS, ...options };

		this.#canvas = canvas;

		canvas.width = 320;
		canvas.height = 224;

		this.#vehicles = vehicles;
		this.#waypoints = waypoints;

		this.#history = [];

		for (let i = 0; i < this.#fullOptions.frames; ++i) {
			this.#vehicles.forEach((v) => v.update(this.#waypoints));
			this.#collisionDetect(this.#fullOptions.collisionDetection);
			this.#history.push({
				vehicles: this.#vehicles.map((v) => v.clone()),
			});
		}

		this.#track = null;

		const trackImage = new Image();
		trackImage.onload = () => {
			this.#track = trackImage;
			this.#draw();
		};

		trackImage.src = '/track.png';

		this.#trackBridge = null;

		const trackBridgeImage = new Image();
		trackBridgeImage.onload = () => {
			this.#trackBridge = trackBridgeImage;
			this.#draw();
		};

		trackBridgeImage.src = '/trackBridge.png';
	}

	#collisionDetect(collisionDetectionType: CollisionDetection) {
		if (this.#vehicles.length <= 1) {
			// at most one car? no collisions can occur
			return;
		}

		if (collisionDetectionType === 'none') {
			return;
		}

		for (let v = 0; v < this.#vehicles.length; ++v) {
			for (let ov = v + 1; ov < this.#vehicles.length; ++ov) {
				const vehicle = this.#vehicles[v];
				const otherVehicle = this.#vehicles[ov];

				if (
					circlesOverlap(vehicle.boundingCircle, otherVehicle.boundingCircle)
				) {
					if (collisionDetectionType === 'undo') {
						vehicle.x = vehicle.prevX;
						vehicle.y = vehicle.prevY;
						otherVehicle.x = otherVehicle.prevX;
						otherVehicle.y = otherVehicle.prevY;
					} else {
						vehicle.steerAwayFrom(otherVehicle);
						otherVehicle.steerAwayFrom(vehicle);
					}
				}
			}
		}
	}

	#draw() {
		const context = this.#canvas.getContext('2d');

		if (!context) {
			throw new Error('Failed to get context!');
		}

		if (!this.#track || !this.#trackBridge) {
			return;
		}

		context.drawImage(this.#track, 0, 0, this.#track.width, this.#track.height);
		this.#vehicles.forEach((v) =>
			v.draw(context, this.#fullOptions.drawboundingCircles)
		);
		context.drawImage(
			this.#trackBridge,
			0,
			0,
			this.#trackBridge.width,
			this.#trackBridge.height
		);
		this.#vehicles.forEach((v) => {
			if (v.targetWaypoint === 0) {
				v.draw(context, this.#fullOptions.drawboundingCircles);
			}
		});

		this.#waypoints.forEach((w, i) =>
			w.draw(
				context,
				this.#vehicles.length === 1 && this.#vehicles[0].targetWaypoint === i
			)
		);
	}

	goTo(frame: number) {
		if (frame < 0 || frame >= this.#history.length) {
			throw new Error(`frame out of range: ${frame}`);
		}
		this.#vehicles = this.#history[frame].vehicles;

		this.#draw();
	}

	get historySize() {
		return this.#history.length;
	}

	get firstVehicle() {
		return this.#vehicles[0];
	}

	get waypoints() {
		return this.#waypoints;
	}
}

export { Simulation };

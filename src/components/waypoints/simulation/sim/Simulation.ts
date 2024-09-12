import { Waypoint } from './Waypoint';
import { getDistance } from './trig';
import { IVehicle, Sphere } from './types';

type HistoryEntry = {
	vehicles: IVehicle[];
};

function spheresOverlap(a: Sphere, b: Sphere): boolean {
	const distBetwweenCenters = getDistance(a.x, a.y, b.x, b.y);

	return distBetwweenCenters <= a.radius + b.radius;
}

class Simulation {
	#canvas: HTMLCanvasElement;
	#vehicles: IVehicle[];
	#waypoints: Waypoint[];
	#track: HTMLImageElement | null;
	#trackBridge: HTMLImageElement | null;
	#history: HistoryEntry[];

	constructor(
		canvas: HTMLCanvasElement,
		vehicles: IVehicle[],
		waypoints: Waypoint[],
		frames = 100
	) {
		this.#canvas = canvas;

		canvas.width = 320;
		canvas.height = 224;

		this.#vehicles = vehicles;
		this.#waypoints = waypoints;

		this.#history = [];

		for (let i = 0; i < frames; ++i) {
			this.#vehicles.forEach((v) => v.update(this.#waypoints));
			this.#collisionDetect();
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

	#collisionDetect() {
		if (this.#vehicles.length <= 1) {
			// at most one car? no collisions can occur
			return;
		}

		for (let v = 0; v < this.#vehicles.length; ++v) {
			for (let ov = v + 1; ov < this.#vehicles.length; ++ov) {
				const vehicle = this.#vehicles[v];
				const otherVehicle = this.#vehicles[ov];

				if (
					spheresOverlap(vehicle.nearnessSphere, otherVehicle.nearnessSphere)
				) {
					vehicle.steerAwayFrom(otherVehicle);
					otherVehicle.steerAwayFrom(vehicle);
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
		this.#vehicles.forEach((v) => v.draw(context));
		context.drawImage(
			this.#trackBridge,
			0,
			0,
			this.#trackBridge.width,
			this.#trackBridge.height
		);
		this.#vehicles.forEach((v) => {
			if (v.targetWaypoint === 0) {
				v.draw(context);
			}
		});

		this.#waypoints.forEach((w) => w.draw(context, false));
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
}

export { Simulation };

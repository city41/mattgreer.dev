import { Waypoint } from './Waypoint';
import { getDistance } from './trig';
import { IVehicle, Point, Sphere } from './types';
import cloneDeep from 'lodash/cloneDeep';

const FRICTION = 1 / 20;

class BasicVehicle implements IVehicle {
	static LENGTH = 10;
	static WIDTH = 5;

	x: number;
	y: number;
	accelValue: number;
	acceleration = 0;
	speed = 0;
	velocityAngle = 0;
	velocity: Point = { x: 0, y: 0 };
	color = 'white';
	targetWaypoint = 0;
	nearnessSphere: Sphere = { x: 0, y: 0, radius: 0 };
	waypoints: Waypoint[] = [];
	airDrag = 0;

	constructor(x: number, y: number, accelValue: number, color: string) {
		this.x = x;
		this.y = y;
		this.accelValue = accelValue;
		this.color = color;
	}

	getAngleToWaypoint(): number {
		const waypoint = this.waypoints[this.targetWaypoint];
		const x = waypoint.x - this.x;
		const y = waypoint.y - this.y;

		const angle = Math.atan(Math.abs(y) / Math.abs(x));

		if (x >= 0 && y >= 0) {
			// upper right quadrant
			return angle;
		}

		if (x < 0 && y >= 0) {
			// upper left quadrant
			return Math.PI - angle;
		}

		if (x < 0 && y < 0) {
			// lower left quadrant
			return Math.PI + angle;
		}

		// lower right quadrant
		return 2 * Math.PI - angle;
	}

	processWaypoint() {
		this.velocityAngle = this.getAngleToWaypoint();
	}

	updateCurrentWaypoint() {
		const currentWaypoint = this.waypoints[this.targetWaypoint];

		const distance = getDistance(
			this.x,
			this.y,
			currentWaypoint.x,
			currentWaypoint.y
		);

		if (distance <= this.speed) {
			this.targetWaypoint += 1;

			if (this.targetWaypoint >= this.waypoints.length) {
				this.targetWaypoint = 0;
			}
		}
	}

	getAirDrag(speed: number) {
		return (1 / 12) * speed;
	}

	handleAcceleration() {
		this.airDrag = this.getAirDrag(this.speed);

		this.acceleration = this.accelValue - FRICTION - this.airDrag;

		this.speed = Math.max(0, this.speed + this.acceleration);

		const cos = Math.cos(this.velocityAngle);
		const sin = Math.sin(this.velocityAngle);

		this.velocity.x = this.speed * cos;
		this.velocity.y = this.speed * sin;

		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}

	update(waypoints: Waypoint[]) {
		this.waypoints = waypoints;
		this.updateCurrentWaypoint();
		this.processWaypoint();
		this.handleAcceleration();
	}

	steerAwayFrom(_p: Point) {
		// not needed, but must implement IVehicle
	}

	draw(context: CanvasRenderingContext2D) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.velocityAngle);
		context.fillStyle = this.color;
		context.fillRect(
			-BasicVehicle.LENGTH / 2,
			-BasicVehicle.WIDTH / 2,
			BasicVehicle.LENGTH,
			BasicVehicle.WIDTH
		);
		context.restore();

		context.save();
		context.fillStyle = 'green';
		context.fillRect(this.x, this.y, 1, 1);
		context.restore();

		context.save();
		context.translate(this.x, this.y);
		context.strokeStyle = 'white';
		context.beginPath();
		context.arc(0, 0, this.nearnessSphere.radius, 0, 2 * Math.PI);
		context.stroke();
		context.restore();
	}

	clone(): IVehicle {
		const clone = new BasicVehicle(this.x, this.y, this.accelValue, this.color);

		(Object.keys(this) as Array<keyof BasicVehicle>).forEach((key) => {
			if (typeof this[key] !== 'function') {
				(clone[key] as any) = cloneDeep(this[key]) as any;
			}
		});

		return clone;
	}
}

export { BasicVehicle };

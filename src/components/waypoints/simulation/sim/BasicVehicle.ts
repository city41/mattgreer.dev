import { IVehicle, VEHICLE_LENGTH, VEHICLE_WIDTH } from './IVehicle';
import { Waypoint } from './Waypoint';
import { getDistance } from './trig';
import { Point, Sphere } from './types';
import cloneDeep from 'lodash/cloneDeep';

const FRICTION = 1 / 20;

class BasicVehicle implements IVehicle {
	x: number;
	y: number;
	accelValue: number;
	speed = 0;
	velocityAngle = 0;
	color = 'white';
	targetWaypoint = 0;
	nearnessSphere: Sphere = { x: 0, y: 0, radius: 0 };
	waypoints: Waypoint[] = [];
	calcedTurnDecisionDots = [];

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
		const airDrag = this.getAirDrag(this.speed);

		const acceleration = this.accelValue - FRICTION - airDrag;

		this.speed = Math.max(0, this.speed + acceleration);

		const cos = Math.cos(this.velocityAngle);
		const sin = Math.sin(this.velocityAngle);

		const velX = this.speed * cos;
		const velY = this.speed * sin;

		this.x += velX;
		this.y += velY;
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
			-VEHICLE_LENGTH / 2,
			-VEHICLE_WIDTH / 2,
			VEHICLE_LENGTH,
			VEHICLE_WIDTH
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

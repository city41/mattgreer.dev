import { IVehicle, VEHICLE_LENGTH, VEHICLE_WIDTH } from './IVehicle';
import { Waypoint } from './Waypoint';
import { degreesToRadians, sign0 } from './mathutil';
import { getDistance } from './trig';
import { Point, Circle } from './types';
import cloneDeep from 'lodash/cloneDeep';

type TurnDecision = 1 | 0 | -1;

const FRICTION = 1 / 20;

function dot(a: Point, b: Point): number {
	return a.x * b.x + a.y * b.y;
}

function normalizedDot(
	a: Point,
	aLength: number,
	b: Point,
	bLength: number
): number {
	if (aLength <= 0) {
		throw new Error(`normalizedDot: invalid aLength: ${aLength}`);
	}
	if (bLength <= 0) {
		throw new Error(`normalizedDot: invalid bLength: ${bLength}`);
	}

	const d = dot(a, b);
	const lens = aLength * bLength;

	return d / lens;
}

class SmoothTurningVehicle implements IVehicle {
	static DRIFT_BOOST_FACTOR = 10;

	x: number;
	y: number;
	prevX: number;
	prevY: number;
	targetWaypoint = 0;
	velocityAngle = 0;
	accelValue: number;
	speed = 0;
	velocity: Point = { x: 0, y: 0 };
	color = 'white';
	boundingCircle: Circle = { x: 0, y: 0, radius: 0 };
	steerAwayFromPoint: Point | null = null;
	calcedTurnDecisionDots = [];

	constructor(x: number, y: number, accelValue: number, color: string) {
		this.x = x;
		this.y = y;
		this.accelValue = accelValue;
		this.color = color;
	}

	calcTurnDecision(waypoint: Point): TurnDecision {
		if (this.speed === 0) {
			// not moving? no need to turn
			return 0;
		}

		const distanceToWp = getDistance(this.x, this.y, waypoint.x, waypoint.y);
		const vectorMagnitude = distanceToWp / 2;

		// translate the waypoint's center vector to be based off the vehicle's location,
		// so that the vectors can be compared
		const translatedWaypoint: Point = {
			x: waypoint.x - this.x,
			y: waypoint.y - this.y,
		};

		let bestD = Number.MIN_SAFE_INTEGER;
		let bestTurnResult = 0;

		this.calcedTurnDecisionDots = [];

		for (let t = 1; t >= -1; t -= 1) {
			const turnedAngle = this.velocityAngle + degreesToRadians(t * 15);

			const turnedCos = Math.cos(turnedAngle);
			const turnedSin = Math.sin(turnedAngle);

			// form a new hypothetical velocity vector based on the hypothetical turn
			const turnedVelocity: Point = {
				x: vectorMagnitude * turnedCos,
				y: vectorMagnitude * turnedSin,
			};

			// and calculate a new dot
			const turnedD = dot(turnedVelocity, translatedWaypoint);

			if (turnedD > bestD) {
				bestD = turnedD;
				bestTurnResult = t;
			}

			this.calcedTurnDecisionDots.push({
				turnedAngle,
				magnitude: vectorMagnitude,
				best: false,
				turn: t,
			});
		}

		this.calcedTurnDecisionDots.forEach((ctd) => {
			ctd.best = ctd.turn === bestTurnResult;
		});

		return bestTurnResult as TurnDecision;
	}

	calcVelocityAngleChangeRate(
		waypoint: Waypoint,
		turnDecision: TurnDecision
	): number {
		const distanceToWp = getDistance(this.x, this.y, waypoint.x, waypoint.y);
		const framesTillWp = (distanceToWp - waypoint.radius) / this.speed;

		const translatedWaypoint = {
			x: waypoint.x - this.x,
			y: waypoint.y - this.y,
		};

		const normD = normalizedDot(
			this.velocity,
			this.speed,
			translatedWaypoint,
			distanceToWp
		);

		if (normD < -1 || normD > 1) {
			throw new Error(`Invalid normalized dot: ${normD}`);
		}

		let velocityAngleSpan = Math.acos(normD) * 1.5;

		if (velocityAngleSpan > 2 * Math.PI) {
			velocityAngleSpan -= 2 * Math.PI;
			turnDecision = -turnDecision as TurnDecision;
		}

		return (velocityAngleSpan / framesTillWp) * turnDecision;
	}

	determineAngleChangeRate(waypoint: Waypoint) {
		let turnDecision: TurnDecision = 0;

		if (this.steerAwayFromPoint) {
			turnDecision = (this.calcTurnDecision(this.steerAwayFromPoint) *
				-1) as TurnDecision;
			this.steerAwayFromPoint = null;
		} else {
			turnDecision = this.calcTurnDecision(waypoint);
		}

		if (turnDecision !== 0) {
			return this.calcVelocityAngleChangeRate(waypoint, turnDecision);
		} else {
			return 0;
		}
	}

	updateCurrentWaypoint(waypoints: Waypoint[]) {
		const currentWaypoint = waypoints[this.targetWaypoint];

		const distance = getDistance(
			this.x,
			this.y,
			currentWaypoint.x,
			currentWaypoint.y
		);

		if (distance <= currentWaypoint.radius) {
			this.targetWaypoint += 1;

			if (this.targetWaypoint >= waypoints.length) {
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

		this.velocity.x = this.speed * cos;
		this.velocity.y = this.speed * sin;

		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}

	update(waypoints: Waypoint[]) {
		this.prevX = this.x;
		this.prevY = this.y;

		// move onto the next waypoint if we have
		// arrived at the current one
		this.updateCurrentWaypoint(waypoints);

		// grab the current waypoint
		const currentWaypoint = waypoints[this.targetWaypoint];

		// figure out how much to turn each frame to smoothly
		// arrive at that waypoint
		const angleChangeRate = this.determineAngleChangeRate(currentWaypoint);

		// update our turning accordingly
		this.velocityAngle += angleChangeRate;

		// and move the car
		this.handleAcceleration();
		this.boundingCircle = this.calcBoundingCircle();
	}

	calcBoundingCircle(): Circle {
		return {
			x: this.x,
			y: this.y,
			radius: Math.max(VEHICLE_WIDTH, VEHICLE_LENGTH) / 2,
		};
	}

	steerAwayFrom(p: Point) {
		this.steerAwayFromPoint = p;
	}

	draw(context: CanvasRenderingContext2D, shouldDrawBoundingCircle: boolean) {
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

		if (shouldDrawBoundingCircle) {
			context.save();
			context.translate(this.x, this.y);
			context.strokeStyle = 'white';
			context.beginPath();
			context.arc(0, 0, this.boundingCircle.radius, 0, 2 * Math.PI);
			context.stroke();
			context.restore();
		}
	}

	clone(): IVehicle {
		const clone = new SmoothTurningVehicle(
			this.x,
			this.y,
			this.accelValue,
			this.color
		);

		(Object.keys(this) as Array<keyof SmoothTurningVehicle>).forEach((key) => {
			if (typeof this[key] !== 'function') {
				(clone[key] as any) = cloneDeep(this[key]) as any;
			}
		});

		return clone;
	}
}

export { SmoothTurningVehicle };

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

class NaiveDriftVehicle implements IVehicle {
	static DRIFT_BOOST_FACTOR = 10;

	x: number;
	y: number;
	prevX = 0;
	prevY = 0;
	targetWaypoint = 0;
	steeringAngle = 0;
	velocityAngle = 0;
	steeringAngleChangeRate = 0;
	accelValue: number;
	speed = 0;
	velocity: Point = { x: 0, y: 0 };
	allowDrifting = true;
	shouldDrift = false;
	driftDuration = 0;
	color = 'white';
	boundingCircle: Circle = { x: 0, y: 0, radius: 0 };
	steerAwayFromPoint: Point | null = null;

	calcedTurnDecisionDots = [];

	constructor(
		x: number,
		y: number,
		accelValue: number,
		color: string,
		allowDrifting = true
	) {
		this.x = x;
		this.y = y;
		this.accelValue = accelValue;
		this.color = color;
		this.allowDrifting = allowDrifting;
	}

	calcTurnDecision(waypoint: Point): TurnDecision {
		if (this.speed == 0) {
			// not moving? no need to turn
			return 0;
		}

		const distanceToWp = getDistance(this.x, this.y, waypoint.x, waypoint.y);
		const vectorMagnitude = distanceToWp / 2;
		const baseAngle = this.shouldDrift
			? this.steeringAngle
			: this.velocityAngle;

		// "move" the waypoint's center vector to be based off the vehicle's location,
		// so that the vectors can be compared
		const adjustedCenter: Point = {
			x: waypoint.x - this.x,
			y: waypoint.y - this.y,
		};

		let bestD = Number.MIN_SAFE_INTEGER;
		let bestTurnResult = 0;

		this.calcedTurnDecisionDots = [];

		for (let t = 1; t >= -1; t -= 1) {
			const turnedAngle = baseAngle + degreesToRadians(t * 15);

			const turnedCos = Math.cos(turnedAngle);
			const turnedSin = Math.sin(turnedAngle);

			// form a new hypothetical velocity vector based on the hypothetical left turn
			const turnedVelocity: Point = {
				x: vectorMagnitude * turnedCos,
				y: vectorMagnitude * turnedSin,
			};

			// and calculate a new dot
			const turnedD = dot(turnedVelocity, adjustedCenter);

			this.calcedTurnDecisionDots.push({
				turn: t,
				turnedAngle,
				magnitude: vectorMagnitude,
				dot: turnedD,
				best: false,
			});

			if (turnedD > bestD) {
				bestD = turnedD;
				bestTurnResult = t;
			}
		}

		this.calcedTurnDecisionDots.forEach(
			(ctdd) => (ctdd.best = ctdd.turn == bestTurnResult)
		);

		return bestTurnResult as TurnDecision;
	}

	calcSteeringAngleChangeRate(
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

		let steeringAngle = Math.acos(normD) * 1.5;

		if (steeringAngle > 2 * Math.PI) {
			steeringAngle -= 2 * Math.PI;
			turnDecision = -turnDecision as TurnDecision;
		}

		return (steeringAngle / framesTillWp) * sign0(turnDecision);
	}

	turnDecision: TurnDecision = 0;

	determineSteeringAngleChangeRate(waypoint: Waypoint, nextWaypoint: Waypoint) {
		let turnDecision: TurnDecision = 0;

		if (this.steerAwayFromPoint) {
			turnDecision = (this.calcTurnDecision(this.steerAwayFromPoint) *
				-1) as TurnDecision;
			this.steerAwayFromPoint = null;
		} else {
			turnDecision = this.calcTurnDecision(waypoint);
		}

		if (turnDecision !== 0) {
			return this.calcSteeringAngleChangeRate(waypoint, turnDecision);
		} else {
			this.shouldDrift = false;
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

			this.shouldDrift =
				this.allowDrifting && waypoints[this.targetWaypoint].shouldDrift;
		}
	}

	airDrag = 0;

	getAirDrag(speed: number) {
		return (1 / 12) * speed;
	}

	handleAcceleration(driftBoost = 1) {
		this.airDrag = this.getAirDrag(this.speed);

		const acceleration = this.accelValue * driftBoost - FRICTION - this.airDrag;

		const driftPenaltyPercentage = (1000 - this.driftDuration) / 1000;

		this.speed = Math.max(
			0,
			(this.speed + acceleration) * driftPenaltyPercentage
		);

		const cos = Math.cos(this.velocityAngle);
		const sin = Math.sin(this.velocityAngle);

		this.velocity.x = this.speed * cos;
		this.velocity.y = this.speed * sin;

		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}

	moveTowardsSteeringAngle(isDrifting: boolean) {
		const diff = this.steeringAngle - this.velocityAngle;

		const stepMagnitude = degreesToRadians(isDrifting ? 2 : 8);
		const stepDirection = sign0(diff);

		const step = stepDirection * stepMagnitude;

		this.velocityAngle += step;

		if (stepDirection > 0 && this.velocityAngle > this.steeringAngle) {
			this.velocityAngle = this.steeringAngle;
		}

		if (stepDirection < 0 && this.velocityAngle < this.steeringAngle) {
			this.velocityAngle = this.steeringAngle;
		}
	}

	update(waypoints: Waypoint[]) {
		const lastShouldDrift = this.shouldDrift;

		this.updateCurrentWaypoint(waypoints);
		const currentWaypoint = waypoints[this.targetWaypoint];
		const nextWaypoint =
			waypoints[(this.targetWaypoint + 1) % waypoints.length];

		const steeringAngleChangeRate = this.determineSteeringAngleChangeRate(
			currentWaypoint,
			nextWaypoint
		);

		this.steeringAngle += steeringAngleChangeRate;

		let driftBoost = 1;

		if (lastShouldDrift && !this.shouldDrift) {
			// the drift has finished, was it long enough to warrant a boost?

			driftBoost =
				1 +
				Math.min(this.driftDuration / 60, 2) *
					NaiveDriftVehicle.DRIFT_BOOST_FACTOR;
			this.driftDuration = 0;

			this.velocityAngle = this.steeringAngle;
		}

		if (this.shouldDrift) {
			this.driftDuration += 1;
		}

		this.moveTowardsSteeringAngle(this.shouldDrift);
		this.handleAcceleration(driftBoost);

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

	drawBoundingCircle(context: CanvasRenderingContext2D) {
		context.save();
		context.translate(this.x, this.y);
		context.strokeStyle = 'white';
		context.beginPath();
		context.arc(0, 0, this.boundingCircle.radius, 0, 2 * Math.PI);
		context.stroke();
		context.restore();
	}

	draw(context: CanvasRenderingContext2D, shouldDrawBoundingCircle: boolean) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.steeringAngle);
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
			this.drawBoundingCircle(context);
		}
	}

	clone(): IVehicle {
		const clone = new NaiveDriftVehicle(
			this.x,
			this.y,
			this.accelValue,
			this.color,
			this.allowDrifting
		);

		(Object.keys(this) as Array<keyof NaiveDriftVehicle>).forEach((key) => {
			if (typeof this[key] !== 'function') {
				(clone[key] as any) = cloneDeep(this[key]) as any;
			}
		});

		return clone;
	}
}

export { NaiveDriftVehicle };

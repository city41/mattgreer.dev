import { IVehicle, VEHICLE_LENGTH, VEHICLE_WIDTH } from './IVehicle';
import { Waypoint } from './Waypoint';
import {
	DEGREES_PER_INDEX,
	NUM_ANGLES,
	degreesToRadians,
	radiansToDegrees,
	sign0,
} from './mathutil';
import { getDistance } from './trig';
import { Point, Sphere } from './types';
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

class DriftVehicle implements IVehicle {
	static DRIFT_BOOST_FACTOR = 10;

	x: number;
	y: number;
	prevX: number = 0;
	prevY: number = 0;
	targetWaypoint = 0;
	steeringAngleIndex = 0;
	velocityAngleIndex = 0;
	steeringAngleChangeRate = 0;
	velocityAngle = 0;
	accelValue: number;
	acceleration = 0;
	speed = 0;
	velocity: Point = { x: 0, y: 0 };
	allowDrifting = true;
	shouldDrift = false;
	driftDuration = 0;
	color = 'white';
	boundingSpheres: [Sphere, Sphere] = [
		{ x: 0, y: 0, radius: 0 },
		{ x: 0, y: 0, radius: 0 },
	];
	nearnessSphere: Sphere = { x: 0, y: 0, radius: 0 };
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
		const baseAngleIndex = this.shouldDrift
			? this.steeringAngleIndex
			: this.velocityAngleIndex;

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
			let turnedAngleIndex = baseAngleIndex + t * 2;

			if (turnedAngleIndex >= NUM_ANGLES) {
				turnedAngleIndex -= NUM_ANGLES;
			}

			if (turnedAngleIndex < 0) {
				turnedAngleIndex += NUM_ANGLES;
			}

			const turnedCos = Math.cos(
				degreesToRadians(turnedAngleIndex * DEGREES_PER_INDEX)
			);
			const turnedSin = Math.sin(
				degreesToRadians(turnedAngleIndex * DEGREES_PER_INDEX)
			);

			// form a new hypothetical velocity vector based on the hypothetical left turn
			const turnedVelocity: Point = {
				x: vectorMagnitude * turnedCos,
				y: vectorMagnitude * turnedSin,
			};

			// and calculate a new dot
			const turnedD = dot(turnedVelocity, adjustedCenter);

			this.calcedTurnDecisionDots.push({
				turn: t,
				turnedAngleIndex,
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

	distanceToWp = 0;
	distanceToWpIndex = 0;
	framesTillWp = 0;
	adjustedWaypointCenter: Point = { x: 0, y: 0 };
	normD = 0;
	angleIndexSpan = 0;
	calcedSteeringAngleChangeRate = 0;

	calcSteeringAngleChangeRate(
		waypoint: Waypoint,
		turnDecision: TurnDecision
	): number {
		this.distanceToWp = getDistance(this.x, this.y, waypoint.x, waypoint.y);
		this.distanceToWpIndex = waypoint.index;

		this.framesTillWp =
			Math.max(this.distanceToWp - waypoint.radius, 1) / this.speed;

		this.adjustedWaypointCenter = {
			x: waypoint.x - this.x,
			y: waypoint.y - this.y,
		};

		this.normD = normalizedDot(
			this.velocity,
			this.speed,
			this.adjustedWaypointCenter,
			this.distanceToWp
		);

		if (this.normD < -1 || this.normD > 1) {
			throw new Error(`Invalid normalized dot: ${this.normD}`);
		}

		this.angleIndexSpan =
			(radiansToDegrees(Math.acos(this.normD)) / DEGREES_PER_INDEX) * 1.5;

		if (this.angleIndexSpan > NUM_ANGLES) {
			this.angleIndexSpan -= NUM_ANGLES;
			turnDecision = -turnDecision as TurnDecision;
		}
		return (this.angleIndexSpan / this.framesTillWp) * sign0(turnDecision);
	}

	turnDecision: TurnDecision = 0;

	processWaypoint(waypoint: Waypoint, nextWaypoint: Waypoint) {
		if (this.steerAwayFromPoint) {
			this.turnDecision = (this.calcTurnDecision(this.steerAwayFromPoint) *
				-1) as TurnDecision;
			this.steerAwayFromPoint = null;
		} else {
			this.turnDecision = this.calcTurnDecision(waypoint);
		}

		if (this.turnDecision != 0) {
			this.steeringAngleChangeRate = this.calcSteeringAngleChangeRate(
				waypoint,
				this.turnDecision
			);
		} else {
			this.steeringAngleChangeRate = 0;
			if (this.shouldDrift) {
				this.shouldDrift = this.calcTurnDecision(nextWaypoint) != 0;
			}
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

		this.acceleration = this.accelValue * driftBoost - FRICTION - this.airDrag;

		const driftPenaltyPercentage = (1000 - this.driftDuration) / 1000;

		this.speed = Math.max(
			0,
			(this.speed + this.acceleration) * driftPenaltyPercentage
		);

		const cos = Math.cos(
			degreesToRadians(this.velocityAngleIndex * DEGREES_PER_INDEX)
		);
		const sin = Math.sin(
			degreesToRadians(this.velocityAngleIndex * DEGREES_PER_INDEX)
		);

		this.velocity.x = this.speed * cos;
		this.velocity.y = this.speed * sin;

		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}

	moveTowardsSteeringAngle(isDrifting: boolean) {
		const diff = this.steeringAngleIndex - this.velocityAngleIndex;

		const stepMagnitude = isDrifting ? 1 / 2 : 4;
		let stepDirection = sign0(diff);

		if (Math.abs(diff) > NUM_ANGLES / 2) {
			stepDirection = -stepDirection as TurnDecision;
		}

		const step = stepDirection * stepMagnitude;

		this.velocityAngleIndex += step;

		if (this.velocityAngleIndex >= NUM_ANGLES) {
			this.velocityAngleIndex -= NUM_ANGLES;
		}
		if (this.velocityAngleIndex < 0) {
			this.velocityAngleIndex += NUM_ANGLES;
		}

		if (
			stepDirection > 0 &&
			this.velocityAngleIndex > this.steeringAngleIndex
		) {
			this.velocityAngleIndex = this.steeringAngleIndex;
		}

		if (
			stepDirection < 0 &&
			this.velocityAngleIndex < this.steeringAngleIndex
		) {
			this.velocityAngleIndex = this.steeringAngleIndex;
		}
	}

	update(waypoints: Waypoint[]) {
		this.prevX = this.x;
		this.prevY = this.y;

		const lastShouldDrift = this.shouldDrift;

		this.updateCurrentWaypoint(waypoints);
		const currentWaypoint = waypoints[this.targetWaypoint];
		const nextWaypoint =
			waypoints[(this.targetWaypoint + 1) % waypoints.length];
		this.processWaypoint(currentWaypoint, nextWaypoint);

		this.steeringAngleIndex += this.steeringAngleChangeRate;

		while (this.steeringAngleIndex < 0) {
			this.steeringAngleIndex += NUM_ANGLES;
		}

		while (this.steeringAngleIndex >= NUM_ANGLES) {
			this.steeringAngleIndex -= NUM_ANGLES;
		}

		let driftBoost = 1;

		if (lastShouldDrift && !this.shouldDrift) {
			// the drift has finished, was it long enough to warrant a boost?

			driftBoost =
				1 +
				Math.min(this.driftDuration / 60, 2) * DriftVehicle.DRIFT_BOOST_FACTOR;
			this.driftDuration = 0;

			this.velocityAngleIndex = this.steeringAngleIndex;
		}

		if (this.shouldDrift) {
			this.driftDuration += 1;
		}

		this.moveTowardsSteeringAngle(this.shouldDrift);
		this.handleAcceleration(driftBoost);

		this.boundingSpheres = this.calcBoundingSpheres();
		this.nearnessSphere = this.calcNearnessSphere();
	}

	calcBoundingSpheres(): [Sphere, Sphere] {
		const radius = VEHICLE_LENGTH / 4;

		const cos = Math.cos(
			degreesToRadians(this.steeringAngleIndex * DEGREES_PER_INDEX)
		);
		const sin = Math.sin(
			degreesToRadians(this.steeringAngleIndex * DEGREES_PER_INDEX)
		);

		const cosOffset = radius * cos;
		const sinOffset = radius * sin;

		const center1: Point = {
			x: this.x + cosOffset,
			y: this.y + sinOffset,
		};
		const center2 = {
			x: this.x - cosOffset,
			y: this.y - sinOffset,
		};

		return [
			{ ...center1, radius },
			{ ...center2, radius },
		];
	}

	calcNearnessSphere(): Sphere {
		return {
			x: this.x,
			y: this.y,
			radius: Math.max(VEHICLE_WIDTH, VEHICLE_LENGTH) / 2,
		};
	}

	steerAwayFrom(p: Point) {
		this.steerAwayFromPoint = p;
	}

	draw(context: CanvasRenderingContext2D) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(
			degreesToRadians(this.steeringAngleIndex * DEGREES_PER_INDEX)
		);
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
		const clone = new DriftVehicle(
			this.x,
			this.y,
			this.accelValue,
			this.color,
			this.allowDrifting
		);

		(Object.keys(this) as Array<keyof DriftVehicle>).forEach((key) => {
			if (typeof this[key] !== 'function') {
				(clone[key] as any) = cloneDeep(this[key]) as any;
			}
		});

		return clone;
	}
}

export { DriftVehicle };

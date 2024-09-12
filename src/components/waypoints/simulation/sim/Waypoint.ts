class Waypoint {
	x: number;
	y: number;
	radius: number;
	index: number;
	shouldDrift = false;
	shouldDrawRadius = true;

	constructor(
		x: number,
		y: number,
		radius: number,
		index: number,
		shouldDrift = false,
		shouldDrawRadius = true
	) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.index = index;
		this.shouldDrift = shouldDrift;
		this.shouldDrawRadius = shouldDrawRadius;
	}

	static targetColor = 'orange';

	drawPoint(context: CanvasRenderingContext2D, isTarget: boolean) {
		context.save();
		context.fillStyle = isTarget ? Waypoint.targetColor : 'yellow';
		context.beginPath();

		const size = isTarget ? 4 : 2;

		context.arc(this.x, this.y, size, 0, 2 * Math.PI);
		context.fill();
		context.restore();
	}

	drawRadius(context: CanvasRenderingContext2D, isTarget: boolean) {
		context.save();
		context.strokeStyle = isTarget ? Waypoint.targetColor : 'yellow';
		context.fillStyle = isTarget ? Waypoint.targetColor : 'transparent';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.lineWidth = isTarget ? 2 : 1;

		context.stroke();

		context.globalAlpha = 0.125;
		context.fill();
		context.restore();
	}

	drawIndex(context: CanvasRenderingContext2D) {
		context.font = '12px sans-serif';
		context.fillStyle = 'white';
		context.fillText(this.index.toString(), this.x - 3, this.y + 12);
	}
	draw(context: CanvasRenderingContext2D, isTarget: boolean) {
		this.drawPoint(context, isTarget);

		if (this.shouldDrawRadius) {
			this.drawRadius(context, isTarget);
		}

		this.drawIndex(context);
	}
}

export { Waypoint };

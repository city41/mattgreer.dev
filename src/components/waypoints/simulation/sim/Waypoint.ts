class Waypoint {
	x: number;
	y: number;
	radius: number;
	index: number;
	shouldDrift = false;

	constructor(
		x: number,
		y: number,
		radius: number,
		index: number,
		shouldDrift = false
	) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.index = index;
		this.shouldDrift = shouldDrift;
	}

	drawPoint(context: CanvasRenderingContext2D, isTarget: boolean) {
		context.save();
		context.fillStyle = isTarget ? 'green' : 'yellow';
		context.beginPath();
		context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
		context.fill();
		context.restore();
	}
	drawRadius(context: CanvasRenderingContext2D, isTarget: boolean) {
		context.save();
		context.strokeStyle = isTarget ? 'green' : 'yellow';
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.stroke();
		context.restore();
	}
	drawIndex(context: CanvasRenderingContext2D) {
		context.font = '12px sans-serif';
		context.fillStyle = 'white';
		context.fillText(this.index.toString(), this.x - 3, this.y + 12);
	}
	draw(context: CanvasRenderingContext2D, isTarget: boolean) {
		this.drawPoint(context, isTarget);
		this.drawRadius(context, isTarget);
		this.drawIndex(context);
	}
}

export { Waypoint };

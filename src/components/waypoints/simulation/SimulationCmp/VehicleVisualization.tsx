import { useEffect, useRef } from "react";
import { Vehicle } from "../sim/Vehicle";
import { DEGREES_PER_INDEX, degreesToRadians } from "../sim/mathutil";
import { Point } from "../sim/types";
import clsx from "clsx";

const SCALE = 10;
const SIZE = 500;

type VehicleVisualizationProps = {
  vehicle: Vehicle;
};

function drawBody(context: CanvasRenderingContext2D, vehicle: Vehicle) {
  context.save();
  context.translate(SIZE / 2, SIZE / 2);
  context.rotate(
    degreesToRadians(vehicle.steeringAngleIndex * DEGREES_PER_INDEX)
  );
  context.fillStyle = vehicle.color;

  const l = Vehicle.LENGTH * SCALE;
  const w = Vehicle.WIDTH * SCALE;

  context.fillRect(-l / 2, -w / 2, l, w);
  context.restore();
}

function drawVector(
  context: CanvasRenderingContext2D,
  vector: Point,
  style: string,
  lineWidth = 1
) {
  const x = vector.x * SCALE;
  const y = vector.y * SCALE;

  const centerX = SIZE / 2;
  const centerY = SIZE / 2;

  context.save();
  context.strokeStyle = style;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(centerX + x, centerY + y);
  context.stroke();
  context.restore();
}

function drawBoundingSpheres(
  context: CanvasRenderingContext2D,
  vehicle: Vehicle
) {
  if (!vehicle.boundingSpheres) {
    return;
  }

  context.save();
  context.translate(SIZE / 2, SIZE / 2);

  const sphereSize = 6;

  context.fillStyle = "white";
  vehicle.boundingSpheres.forEach((bs) => {
    const bsx = (bs.x - vehicle.x) * SCALE;
    const bsy = (bs.y - vehicle.y) * SCALE;
    context.fillRect(
      bsx - sphereSize / 2,
      bsy - sphereSize / 2,
      sphereSize,
      sphereSize
    );

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(bsx, bsy, bs.radius * SCALE, 0, 2 * Math.PI);
    context.stroke();
  });

  context.restore();
}

function drawNearnessSphere(
  context: CanvasRenderingContext2D,
  vehicle: Vehicle
) {
  if (!vehicle.nearnessSphere.radius) {
    return;
  }

  context.save();
  context.translate(SIZE / 2, SIZE / 2);

  context.strokeStyle = "white";
  context.beginPath();
  context.arc(0, 0, vehicle.nearnessSphere.radius * SCALE, 0, 2 * Math.PI);
  context.stroke();

  context.restore();
}

function getVectorFromAngleIndex(angleIndex: number, magnitude: number) {
  const radians = degreesToRadians(angleIndex * DEGREES_PER_INDEX);

  const x = magnitude * Math.cos(radians);
  const y = magnitude * Math.sin(radians);

  return { x, y };
}

function scaleVector(v: Point, m: number): Point {
  return {
    x: v.x * m,
    y: v.y * m,
  };
}

function visualizeVehicle(canvas: HTMLCanvasElement, vehicle: Vehicle) {
  canvas.width = SIZE;
  canvas.height = SIZE;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("visualizeVehicle: failed to get the canvas context");
  }

  context.fillStyle = "rgb(255, 200, 200)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawBody(context, vehicle);
  drawBoundingSpheres(context, vehicle);
  drawNearnessSphere(context, vehicle);
  drawVector(context, vehicle.adjustedWaypointCenter, "blue");

  vehicle.calcedTurnDecisionDots.forEach((ctdd) => {
    const vector = getVectorFromAngleIndex(
      ctdd.turnedAngleIndex,
      ctdd.magnitude
    );
    drawVector(
      context,
      vector,
      ctdd.best ? "orange" : ctdd.turn == 0 ? "white" : "black",
      ctdd.best ? 3 : 1
    );
  });

  drawVector(context, scaleVector(vehicle.velocity, 5), "green", 5);

  if (vehicle.shouldDrift) {
    drawVector(
      context,
      getVectorFromAngleIndex(vehicle.steeringAngleIndex, 10),
      "rgb(255, 0, 0)"
    );
    drawVector(
      context,
      getVectorFromAngleIndex(vehicle.velocityAngleIndex, 10),
      "rgb(128, 0, 0)"
    );
  }
}

function VehicleVisualization({ vehicle }: VehicleVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      visualizeVehicle(canvasRef.current, vehicle);
    }
  }, [vehicle]);

  return (
    <div>
      <canvas ref={canvasRef} width={SIZE} height={SIZE} />
      <div>speed: {vehicle.speed}</div>
      <div>target: {vehicle.targetWaypoint}</div>
      <div>
        distance to wp {vehicle.distanceToWpIndex}: {vehicle.distanceToWp}
      </div>
      <div>
        loc: ({vehicle.x}, {vehicle.y})
      </div>
      {vehicle.calcedTurnDecisionDots.map((ctd) => {
        return (
          <div className={clsx({ "font-bold": ctd.best })}>
            {JSON.stringify(ctd)}
          </div>
        );
      })}
      <div>steeringAngleChangeRate: {vehicle.steeringAngleChangeRate}</div>
      <div>steeringAngleIndex: {vehicle.steeringAngleIndex}</div>
      <div>{JSON.stringify(vehicle.boundingSpheres)}</div>
      <div>{JSON.stringify(vehicle.nearnessSphere)}</div>
    </div>
  );
}

export { VehicleVisualization };

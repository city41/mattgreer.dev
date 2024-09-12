export const NUM_ANGLES = 96;
export const DEGREES_PER_INDEX = 360 / NUM_ANGLES;

export function degreesToRadians(d: number): number {
  return (d * Math.PI) / 180;
}

export function radiansToDegrees(r: number): number {
  return (r * 180) / Math.PI;
}

export function getClosestAngleIndex(
  degrees: number,
  numAngles: number
): number {
  const degreesPerIndex = 360 / numAngles;

  // this is due to hiding that conventional math and graphics flip the y
  // this was hidden by having the sin/cos tables stored backwards,
  // so we need backwards angles here too
  const index = 96 - degrees / degreesPerIndex;

  let roundedIndex = Math.round(index);

  while (roundedIndex < 0) {
    roundedIndex += numAngles;
  }
  while (roundedIndex >= numAngles) {
    roundedIndex -= numAngles;
  }

  return roundedIndex;
}

export function sign0(v: number): 1 | 0 | -1 {
  if (v < 0) {
    return -1;
  }

  if (v == 0) {
    return 0;
  }

  return 1;
}

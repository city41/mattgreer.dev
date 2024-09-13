function getDistance(ax: number, ay: number, bx: number, by: number): number {
  const xSquared = (bx - ax) * (bx - ax);
  const ySquared = (by - ay) * (by - ay);

  return Math.sqrt(xSquared + ySquared);
}

export { getDistance };

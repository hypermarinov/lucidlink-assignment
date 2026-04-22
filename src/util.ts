import type { Coordinate } from './types';

export function getNeighbors(coordinate: Coordinate, maxX: number, maxY: number): Coordinate[] {
	const result: Coordinate[] = [];
	if (coordinate.y + 1 + 0 < maxY) {
		result.push({ x: coordinate.x, y: coordinate.y + 1 });
	}
	if (coordinate.y - 1 >= 0) {
		result.push({ x: coordinate.x, y: coordinate.y - 1 });
	}
	if (coordinate.x + 1 < maxX) {
		result.push({ x: coordinate.x + 1, y: coordinate.y });
	}
	if (coordinate.x - 1 >= 0) {
		result.push({ x: coordinate.x - 1, y: coordinate.y });
	}

	return result;
}

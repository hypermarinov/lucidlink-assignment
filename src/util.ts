import type { Coordinate } from './types';

export function getNeighbors(coordinate: Coordinate, maxX: number, maxY: number): Coordinate[] {
	const result: Coordinate[] = [];
	if (coordinate.y + 1 < maxY) {
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

export function validateMatrix(input: (number | undefined)[][]) {
	if (input === null || input === undefined) {
		throw new ReferenceError('Provided argument must be not null and must be defined');
	}

	if (!Array.isArray(input)) {
		throw new TypeError('Provided argument must be an array');
	}

	validateRows(input);
}

export function validateCell(input: (number | undefined)[][], coordinate: Coordinate) {
	const value = input[coordinate.x]![coordinate.y];

	if (value !== undefined && !Number.isInteger(value)) {
		throw new TypeError('Each cell must be either an integer number or undefined');
	}
}

function validateRows(input: (number | undefined)[][]) {
	if (input.length === 0) {
		return;
	}

	if (input[0] == null) {
		throw new ReferenceError('Rows of the matrix must not be null and must be defined');
	}

	const rowLength = input[0].length;

	for (let i = 1; i < input.length; i++) {
		if (input[i] == null) {
			throw new ReferenceError('Rows of the matrix must not be null and must be defined');
		}

		if (input[i]?.length !== rowLength) {
			throw new RangeError('All rows of the matrix must be of the same length');
		}
	}
}

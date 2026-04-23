import { CoordinateSet } from './CoordinateSet';
import type { Coordinate } from './types';
import { getNeighbors, validateCell, validateMatrix } from './util';

/**
 * This function counts orthogonally connected groups in a (number | undefined) matrix synchronously
 * @param  input - the matrix (number | undefined)
 * @returns - count of the groups
 * @throws {TypeError}
 * @throws {ReferenceError}
 */
export function countGroupsSync(input: (number | undefined)[][]): number {
	validateMatrix(input);
	if (input === undefined) {
		return 0;
	}

	let result = 0;
	const visited: CoordinateSet = new CoordinateSet();

	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[i]!.length; j++) {
			const coordinate = { x: i, y: j };
			validateCell(input, coordinate);
			if (input[i]![j] !== undefined && !visited.has(coordinate)) {
				result++;
				visitGroupSync(visited, coordinate, input);
			}
		}
	}

	return result;
}

function visitGroupSync(
	visited: CoordinateSet,
	start: Coordinate,
	input: (number | undefined)[][]
) {
	const stack: Coordinate[] = [];
	stack.push(start);
	const groupElement = input[start.x]![start.y];

	while (stack.length != 0) {
		const current = stack.pop()!;

		if (!visited.has(current)) {
			visited.add(current);
		}

		const neighbors = getNeighbors(current, input.length, input[0]!.length);
		for (const neighbor of neighbors) {
			if (input[neighbor.x]![neighbor.y] !== groupElement || visited.has(neighbor)) {
				continue;
			}

			stack.push(neighbor);
		}
	}
}

/**
 * This function counts orthogonally connected groups in a (number | undefined) matrix asynchronously with a callback
 * @param input - the matrix (number | undefined)
 * @param callback - the callback to execute, the second parameter to which is a number
 * @throws {TypeError}
 * @throws {ReferenceError}
 */
export function countGroups(
	input: (number | undefined)[][],
	callback: (error: Error | null, result?: number) => void
): void {
	try {
		validateMatrix(input);
	} catch (error) {
		if (error instanceof Error) {
			return callback(error);
		} else {
			return callback(new TypeError('Unrecognized error', { cause: error }));
		}
	}

	let result = 0;
	const visited: CoordinateSet = new CoordinateSet();
	let i = 0;

	function processRow() {
		if (i >= input.length) {
			callback(null, result);
			return;
		}

		let j = 0;

		function processCell() {
			if (j >= input[i]!.length) {
				i++;
				setTimeout(processRow, 0);
				return;
			}

			if (j % 10 === 0) {
				setTimeout(doCell, 0);
			} else {
				doCell();
			}
		}

		function doCell() {
			const coordinate = { x: i, y: j };
			try {
				validateCell(input, coordinate);
			} catch (error) {
				if (error instanceof Error) {
					return callback(error);
				} else {
					return callback(new TypeError('Unrecognized error', { cause: error }));
				}
			}
			if (input[i]![j] !== undefined && !visited.has(coordinate)) {
				result++;
				visitGroup(visited, coordinate, input, (err) => {
					if (err) {
						callback(err);
						return;
					}
					j++;
					processCell();
				});
			} else {
				j++;
				processCell();
			}
		}

		setTimeout(processCell, 0);
	}

	processRow();
}

function visitGroup(
	visited: CoordinateSet,
	start: Coordinate,
	input: (number | undefined)[][],
	callback: (error: Error | null) => void
): void {
	const stack: Coordinate[] = [start];
	const groupElement = input[start.x]![start.y];

	function step() {
		if (stack.length === 0) {
			callback(null);
			return;
		}

		setTimeout(() => {
			const current = stack.pop()!;

			if (!visited.has(current)) {
				visited.add(current);
			}

			const neighbors = getNeighbors(current, input.length, input[0]!.length);
			for (const neighbor of neighbors) {
				if (input[neighbor.x]![neighbor.y] !== groupElement || visited.has(neighbor)) {
					continue;
				}
				stack.push(neighbor);
			}

			step();
		}, 0);
	}

	step();
}

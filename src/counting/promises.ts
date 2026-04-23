import { CoordinateSet } from '../CoordinateSet';
import type { Coordinate } from '../types';
import { getNeighbors, validateCell, validateMatrix } from '../util';

/**
 * This function counts orthogonally connected groups in a (number | undefined) matrix asynchronously with promises
 * @param  input - the matrix (number | undefined)
 * @returns - count of the groups
 * @throws {TypeError}
 * @throws {ReferenceError}
 */
export async function countGroups(input: (number | undefined)[][]): Promise<number> {
	validateMatrix(input);
	let result = 0;
	const visited: CoordinateSet = new CoordinateSet();

	for (let i = 0; i < input.length; i++) {
		await new Promise((resolve) => setTimeout(resolve, 0));
		for (let j = 0; j < input[i]!.length; j++) {
			if (j % 10 === 0) {
				await new Promise((resolve) => setTimeout(resolve, 0));
			}
			const coordinate = { x: i, y: j };
			validateCell(input, coordinate);
			if (input[i]![j] !== undefined && !visited.has(coordinate)) {
				result++;
				await visitGroup(visited, coordinate, input);
			}
		}
	}

	return result;
}

async function visitGroup(
	visited: CoordinateSet,
	start: Coordinate,
	input: (number | undefined)[][]
) {
	const stack: Coordinate[] = [];
	stack.push(start);
	const groupElement = input[start.x]![start.y];

	while (stack.length != 0) {
		const current = stack.pop()!;
		await new Promise((resolve) => setTimeout(resolve, 0));
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

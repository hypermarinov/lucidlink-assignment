import type { Coordinate } from './types';

export class CoordinateSet {
	#set: Set<string>;

	constructor() {
		this.#set = new Set<string>();
	}

	static #__serializeCoordinate(coordinate: Coordinate) {
		return `x${coordinate.x}y${coordinate.y}`;
	}

	add(coordinate: Coordinate) {
		const serialized = CoordinateSet.#__serializeCoordinate(coordinate);
		this.#set.add(serialized);
	}

	has(coordinate: Coordinate): boolean {
		const serialized = CoordinateSet.#__serializeCoordinate(coordinate);
		return this.#set.has(serialized);
	}
}

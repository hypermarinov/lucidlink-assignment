import { describe, it, expect } from 'vitest';
import { CoordinateSet } from '../../src/coordinate-set';
import type { Coordinate } from '../../src/types';

describe('Coordinate Set', () => {
	it('when set has item .has() should return true when the same reference to the item is passed', () => {
		const set = new CoordinateSet();
		const item: Coordinate = {
			x: 1,
			y: 1,
		};

		set.add(item);
		expect(set.has(item)).toBe(true);
	});

	it('when set has item .has() should return true when a different reference to same item structurally is passed', () => {
		const set = new CoordinateSet();
		const item: Coordinate = {
			x: 1,
			y: 1,
		};

		const queryItem: Coordinate = {
			x: 1,
			y: 1,
		};

		set.add(item);
		expect(set.has(queryItem)).toBe(true);
	});

	it('when set doesnt have an item .has() should return false', () => {
		const set = new CoordinateSet();
		const item: Coordinate = {
			x: 1,
			y: 1,
		};

		expect(set.has(item)).toBe(false);
	});

	it('coordinates with numeric adjacency should be treated as distinct', () => {
		const set = new CoordinateSet();
		const item: Coordinate = {
			x: 1,
			y: 23,
		};

		set.add(item);

		const adjacentItem: Coordinate = {
			x: 12,
			y: 3,
		};

		expect(set.has(adjacentItem)).toBe(false);
	});

	it('should be able to store multiple items', () => {
		const set = new CoordinateSet();
		const item1: Coordinate = {
			x: 1,
			y: 2,
		};
		const item2: Coordinate = {
			x: 3,
			y: 4,
		};
		const item3: Coordinate = {
			x: 5,
			y: 6,
		};

		set.add(item1);
		set.add(item2);

		expect(set.has(item1)).toBe(true);
		expect(set.has(item2)).toBe(true);
		expect(set.has(item3)).toBe(false);
	});
});

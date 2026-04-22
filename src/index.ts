import type { Coordinate } from './types';
import { CoordinateSet } from './CoordinateSet';

export { countGroups, countGroupsSync } from './counting';
export { countGroups as countGroupsPromise } from './counting/promises';

const x = {
	x: 1,
	y: 2,
};

const y: Coordinate = {
	x: 1,
	y: 2,
};

const set = new CoordinateSet();
set.add(x);
if (set.has(y)) {
	console.log('da');
}

/* eslint-disable @typescript-eslint/no-explicit-any */
//disabled because we need to test what happens when we run this as part of a javascript project (we don't have typechecking at compile time)
import { describe, it, expect } from 'vitest';
import { countGroupsSync, countGroups } from '../../src/counting';
import { countGroups as countGroupsPromise } from '../../src/counting/promises';

describe('counting', () => {
	describe('sync', () => {
		for (const testCase of happyPathTestCases) {
			it(testCase.name, () => {
				const result = countGroupsSync(testCase.input);

				expect(result).toBe(testCase.expectedValue);
			});
		}

		it('should validate that the matrix is not null', () => {
			const input: (number | undefined)[][] = null;
			try {
				countGroupsSync(input);
			} catch (err) {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Provided argument must be not null and must be defined');
			}
		});

		it('should validate that the matrix is not undefined', () => {
			const input: (number | undefined)[][] = undefined;
			try {
				countGroupsSync(input);
			} catch (err) {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Provided argument must be not null and must be defined');
			}
		});

		it('should validate that the input is an array', () => {
			try {
				countGroupsSync('a');
			} catch (err) {
				expect(err instanceof TypeError).toBeTruthy();
				const refError = err as TypeError;
				expect(refError.message).toBe('Provided argument must be an array');
			}
		});

		it('should validate that all the rows in the matrix have the same length', () => {
			const input: (number | undefined)[][] = [
				[1, 2],
				[1, 2, 3],
			];
			try {
				countGroupsSync(input);
			} catch (err) {
				expect(err instanceof RangeError).toBeTruthy();
				const refError = err as RangeError;
				expect(refError.message).toBe('All rows of the matrix must be of the same length');
			}
		});

		it('should validate that all the rows are not not null', () => {
			const input: (number | undefined)[][] = [null, [1, 2, 3]];
			try {
				countGroupsSync(input);
			} catch (err) {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Rows of the matrix must not be null and must be defined');
			}
		});

		it('should validate that all the rows are not not undefined', () => {
			const input: (number | undefined)[][] = [[1, 2, 3], undefined];
			try {
				countGroupsSync(input);
			} catch (err) {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Rows of the matrix must not be null and must be defined');
			}
		});

		it('should validate each cell', () => {
			const input: (number | undefined)[][] = [[Infinity]];
			try {
				countGroupsSync(input);
			} catch (err) {
				expect(err instanceof TypeError).toBeTruthy();
				const refError = err as TypeError;
				expect(refError.message).toBe('Each cell must be either an integer number or undefined');
			}
		});
	});

	describe('promises', () => {
		for (const testCase of happyPathTestCases) {
			it(testCase.name, async () => {
				const result = await countGroupsPromise(testCase.input);
				expect(result).toBe(testCase.expectedValue);
			});
		}

		it('should validate that the matrix is not null', async () => {
			const input: (number | undefined)[][] = null;
			try {
				await countGroupsPromise(input);
			} catch (err) {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Provided argument must be not null and must be defined');
			}
		});

		it('should validate that the matrix is not undefined', async () => {
			const input: (number | undefined)[][] = undefined;
			try {
				await countGroupsPromise(input);
			} catch (err) {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Provided argument must be not null and must be defined');
			}
		});

		it('should validate that the input is an array', async () => {
			try {
				await countGroupsPromise('a');
			} catch (err) {
				expect(err instanceof TypeError).toBeTruthy();
				const refError = err as TypeError;
				expect(refError.message).toBe('Provided argument must be an array');
			}
		});

		it('should validate that all the rows in the matrix have the same length', async () => {
			const input: (number | undefined)[][] = [
				[1, 2],
				[1, 2, 3],
			];
			try {
				await countGroupsPromise(input);
			} catch (err) {
				expect(err instanceof RangeError).toBeTruthy();
				const refError = err as RangeError;
				expect(refError.message).toBe('All rows of the matrix must be of the same length');
			}
		});

		it('should validate that all the rows are not not null', async () => {
			const input: (number | undefined)[][] = [null, [1, 2, 3]];
			try {
				await countGroupsPromise(input);
			} catch (err) {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Rows of the matrix must not be null and must be defined');
			}
		});

		it('should validate that all the rows are not not undefined', async () => {
			const input: (number | undefined)[][] = [[1, 2, 3], undefined];
			try {
				await countGroupsPromise(input);
			} catch (err) {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Rows of the matrix must not be null and must be defined');
			}
		});

		it('should validate each cell', async () => {
			const input: (number | undefined)[][] = [[Infinity]];
			try {
				await countGroupsPromise(input);
			} catch (err) {
				expect(err instanceof TypeError).toBeTruthy();
				const refError = err as TypeError;
				expect(refError.message).toBe('Each cell must be either an integer number or undefined');
			}
		});
	});

	describe('callback', () => {
		for (const testCase of happyPathTestCases) {
			it(testCase.name, () => {
				countGroups(testCase.input, (err, result) => {
					expect(err).toBeFalsy();
					expect(result).toBe(testCase.expectedValue);
				});
			});
		}

		it('should validate that the matrix is not null', () => {
			const input: (number | undefined)[][] = null;
			countGroups(input, (err) => {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Provided argument must be not null and must be defined');
			});
		});

		it('should validate that the matrix is not undefined', () => {
			const input: (number | undefined)[][] = undefined;
			countGroups(input, (err) => {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Provided argument must be not null and must be defined');
			});
		});

		it('should validate that the input is an array', () => {
			countGroups('a', (err) => {
				expect(err instanceof TypeError).toBeTruthy();
				const refError = err as TypeError;
				expect(refError.message).toBe('Provided argument must be an array');
			});
		});

		it('should validate that all the rows in the matrix have the same length', () => {
			const input: (number | undefined)[][] = [
				[1, 2],
				[1, 2, 3],
			];
			countGroups(input, (err) => {
				expect(err instanceof RangeError).toBeTruthy();
				const refError = err as RangeError;
				expect(refError.message).toBe('All rows of the matrix must be of the same length');
			});
		});

		it('should validate that all the rows are not not null', () => {
			const input: (number | undefined)[][] = [null, [1, 2, 3]];
			countGroups(input, (err) => {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Rows of the matrix must not be null and must be defined');
			});
		});

		it('should validate that all the rows are not not undefined', () => {
			const input: (number | undefined)[][] = [[1, 2, 3], undefined];
			countGroups(input, (err) => {
				expect(err instanceof ReferenceError).toBeTruthy();
				const refError = err as ReferenceError;
				expect(refError.message).toBe('Rows of the matrix must not be null and must be defined');
			});
		});

		it('should validate each cell', () => {
			const input: (number | undefined)[][] = [[Infinity]];
			countGroups(input, (err) => {
				expect(err instanceof TypeError).toBeTruthy();
				const typeError = err as TypeError;
				expect(typeError.message).toBe('Each cell must be either an integer number or undefined');
			});
		});
	});
});

const happyPathTestCases: {
	name: string;
	input: (number | undefined)[][];
	expectedValue: number;
}[] = [
	{
		name: 'should return 0 on empty input',
		input: [],
		expectedValue: 0,
	},
	{
		name: 'should return 0 on input of empty arrays',
		input: [[], [], []],
		expectedValue: 0,
	},
	{
		name: 'should return 1 on input with only one item',
		input: [[1]],
		expectedValue: 1,
	},
	{
		name: 'should return 0 on input with only one item which is undefined',
		input: [[undefined]],
		expectedValue: 0,
	},
	{
		name: 'should return 1 on input full with one value',
		input: [
			[1, 1, 1],
			[1, 1, 1],
			[1, 1, 1],
		],
		expectedValue: 1,
	},
	{
		name: 'should return 1 on input full with one value which is a single column',
		input: [[1], [1], [1]],
		expectedValue: 1,
	},
	{
		name: 'should return 1 on input full with one value which is a single row',
		input: [[1, 1, 1]],
		expectedValue: 1,
	},
	{
		name: 'should count groups in checkerboard pattern',
		input: [
			[1, 2, 1],
			[2, 1, 2],
			[1, 2, 1],
		],
		expectedValue: 9,
	},
	{
		name: 'should count 2 adjacent groups',
		input: [
			[1, 1, 1, 2, 2, 2],
			[1, 1, 1, 2, 2, 2],
			[1, 1, 1, 2, 2, 2],
		],
		expectedValue: 2,
	},
	{
		name: 'should count 2 groups when only one number is present separated by undefined',
		input: [
			[1, 1, 1, undefined, 1, 1, 1],
			[1, 1, 1, undefined, 1, 1, 1],
			[1, 1, 1, undefined, 1, 1, 1],
			[1, 1, 1, undefined, 1, 1, 1],
			[1, 1, 1, undefined, 1, 1, 1],
			[1, 1, 1, undefined, 1, 1, 1],
		],
		expectedValue: 2,
	},
	{
		name: 'should count multiple groups with different shapes',
		input: [
			[1, undefined, undefined, undefined, undefined],
			[1, undefined, 2, 2, undefined],
			[undefined, 2, undefined, 2, undefined],
			[undefined, 2, 2, 2, undefined],
			[undefined, undefined, undefined, undefined, 3],
		],
		expectedValue: 3,
	},
	{
		name: 'should count multiple groups with different shapes that overlap',
		input: [
			[1, undefined, undefined, undefined, undefined],
			[1, 1, 2, 2, undefined],
			[undefined, 2, 1, 2, undefined],
			[undefined, 2, 2, 2, undefined],
			[undefined, undefined, undefined, undefined, 3],
		],
		expectedValue: 4,
	},
];

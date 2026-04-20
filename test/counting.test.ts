import { describe, it, expect } from 'vitest';
import { countGroupsSync, countGroups } from '../src/counting';
import { countGroups as countGroupsPromise} from '../src/counting/promises';

describe('counting', () => {
    describe('sync', () => {
        for(const testCase of testCases) {
            it(testCase.name, () => {
                const result = countGroupsSync(testCase.input);

                expect(result).toBe(testCase.expectedValue);
            });
        }
    });

    describe('promises', () => {
        for(const testCase of testCases) {
            it(testCase.name, async () => {
                const result = await countGroupsPromise(testCase.input);
                expect(result).toBe(testCase.expectedValue); 
            })
        }
    });

    describe('callback', () => {
        for(const testCase of testCases) {
            it(testCase.name, () => {
                countGroups(testCase.input, (err, result) => {
                    expect(err).toBeFalsy();
                    expect(result).toBe(testCase.expectedValue);
                });
            });
        }
    });
});

export const testCases: {name: string, input: (number|undefined)[][], expectedValue: number}[] = [
    {
        name: 'should return 0 on empty input',
        input: [],
        expectedValue: 0
    },
    {
        name: 'should return 0 on input of empty arrays',
        input: [[], [], []],
        expectedValue: 0
    }, 
    {
        name: 'should return 1 on input with only one item',
        input: [[1]],
        expectedValue: 1
    }, 
    {
        name: 'should return 0 on input with only one item which is undefined',
        input: [[undefined]],
        expectedValue: 0
    }, 
    {
        name: 'should return 1 on input full with one value',
        input: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
        expectedValue: 1
    }, 
    {
        name: 'should return 1 on input full with one value which is a single column',
        input: [
                [1],
                [1],
                [1]
            ],
        expectedValue: 1
    }, 
    {
        name: 'should return 1 on input full with one value which is a single row',
        input: [
                [1, 1, 1]
            ],
        expectedValue: 1
    }, 
    {
        name: 'should count groups in checkerboard pattern',
        input: [
                [1, 2, 1],
                [2, 1, 2],
                [1, 2, 1]
            ],
        expectedValue: 9
    }, 
    {
        name: 'should count 2 adjacent groups',
        input: [
                [1, 1, 1, 2, 2, 2],
                [1, 1, 1, 2, 2, 2],
                [1, 1, 1, 2, 2, 2]
            ],
        expectedValue: 2
    }, 
    {
        name: 'should count 2 groups when only one number is present separated by undefined',
        input: [
                [1, 1, 1, undefined, 1, 1, 1],
                [1, 1, 1, undefined, 1, 1, 1],
                [1, 1, 1, undefined, 1, 1, 1],
                [1, 1, 1, undefined, 1, 1, 1],
                [1, 1, 1, undefined, 1, 1, 1],
                [1, 1, 1, undefined, 1, 1, 1]
            ],
        expectedValue: 2
    }, 
    {
        name: 'should count multiple groups with different shapes',
        input: [
                [1, undefined, undefined, undefined, undefined],
                [1, undefined, 2, 2, undefined],
                [undefined, 2, undefined, 2, undefined],
                [undefined, 2, 2, 2, undefined],
                [undefined, undefined, undefined, undefined, 3]
            ],
        expectedValue: 3
    }, 
    {
        name: 'should count multiple groups with different shapes that overlap',
        input: [
                [1, undefined, undefined, undefined, undefined],
                [1, 1, 2, 2, undefined],
                [undefined, 2, 1, 2, undefined],
                [undefined, 2, 2, 2, undefined],
                [undefined, undefined, undefined, undefined, 3]
            ],
        expectedValue: 4
    }
]
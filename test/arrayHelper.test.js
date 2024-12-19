/* npm test -- arrayHelper.test.js */

import {
    arrayGet,
    propertyGet,
    uniqueRecords
} from "@/app/lib/arrayHelper";

// Run: npm test -- createObjectMasterLogic.test.js
describe('The function arrayGet() should work fine.', () => {
    it('The 1st test case of the function arrayGet()', () => {
        const arr = ['a', 'b', 'c'];

        expect(arrayGet(arr, 2, 'z')).toBe('c');
        expect(arrayGet(arr, 200, 'z')).toBe('z');
    });

    it('The 2nd test case of the function arrayGet()', () => {
        const arr = [];

        expect(arrayGet(arr, 2, 'z')).toBe('z');
    });
});

describe('The function propertyGet() should work fine.', () => {
    it('The 1st test case of the function propertyGet()', () => {
        const obj = {
            user: {
                name: "Max",
                gender: "Male",
                location: {
                    city: "Toronto",
                    country: "Canada"
                }
            }
        };

        expect(propertyGet(obj, 'user.name', 'unknown')).toBe('Max');
        expect(propertyGet(obj, 'user.location.city', 'unknown')).toBe('Toronto');
        expect(propertyGet(obj, 'user2.location.city', 'unknown')).toBe('unknown');
    });

    it('The 2nd test case of the function propertyGet()', () => {
        const obj = {
            user: {
                name: "Max",
                gender: "Male",
                location: {
                    city: "Toronto",
                    country: "Canada"
                }
            }
        };

        expect(propertyGet(obj, 1, 'unknown')).toBe('unknown');
    });
});

describe('The function uniqueRecords() should work fine.', () => {
    it('The 1st test case of the function uniqueRecords()', () => {
        const data1 = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 1, name: 'Alice' },
            { id: 3, name: 'Charlie' }
        ];
        const data1Result = uniqueRecords(data1);
        expect(data1Result.length).toBe(3);
    });

    it('The 2nd test case of the function uniqueRecords()', () => {
        const data2 = [
            { id: 1, name: 'Alice' },
            { id: null, name: 'Eve' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
            { id: 3, name: 'Charlie' }
        ];
        const data2Result = uniqueRecords(data2);
        expect(data2Result.length).toBe(3);
    });

    it('The 3rd test case of the function uniqueRecords()', () => {
        const data3 = [
            { name: 'Alice' },
            { name: 'Bob' },
            { name: 'Alice' },
            { name: 'Charlie' }
        ];
        const data3Result = uniqueRecords(data3, 'name');
        expect(data3Result.length).toBe(3);
    });

    it('The 4th test case of the function uniqueRecords()', () => {
        const data4 = null;
        const data4Result = uniqueRecords(data4, 'name');
        expect(data4Result.length).toBe(0);
    });

    it('The 5th test case of the function uniqueRecords()', () => {
        const data = [
            'apple',
            'banana',
            'apple',
            'orange',
            'banana'
        ];
        const result = uniqueRecords(data, null);
        expect(result.length).toBe(3);
    });
});
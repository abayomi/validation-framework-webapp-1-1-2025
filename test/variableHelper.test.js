import variableHelper from "@/app/lib/variableHelper";

// Run: npm test -- createObjectMasterLogic.test.js
describe('The class variableHelper should work fine.', () => {
    it('The 1st test case of the method isArray()', () => {
        const arr1 = [];
        expect(variableHelper.isArray(arr1)).toBe(true);

        const arr2 = {};
        expect(variableHelper.isArray(arr2)).toBe(false);
    });

    it('The 1st test case of the method isEmptyObject()', () => {
        const obj1 = {};
        expect(variableHelper.isEmptyObject(obj1)).toBe(true);

        const obj2 = {
            name: 'Max'
        };
        expect(variableHelper.isEmptyObject(obj2)).toBe(false);
    });

    it('The 1st test case of the method isObject()', () => {
        const obj1 = [];
        expect(variableHelper.isObject(obj1)).toBe(true);

        const obj2 = {
            name: 'Max'
        };
        expect(variableHelper.isObject(obj2)).toBe(true);

        const obj3 = 'Max';
        expect(variableHelper.isObject(obj3)).toBe(false);
    });

    it('The 1st test case of the method deepCopy()', () => {
        const original = {
            name: 'Alice',
            age: 30,
            hobbies: ['reading', 'hiking']
        };

        const copied = variableHelper.deepCopy(original);

        expect(original !== copied).toBe(true);
    });
});
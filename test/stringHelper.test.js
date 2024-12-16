import stringHelper from "@/app/lib/stringHelper";

// Run: npm test -- createObjectMasterLogic.test.js
describe('The class stringHelper should work fine.', () => {
    it('The 1st test case of the method isEmpty()', () => {
        const str1 = null;
        expect(stringHelper.isEmpty(str1)).toBe(true);

        const str2 = ' ';
        expect(stringHelper.isEmpty(str2)).toBe(true);

        const str3 = 'Max';
        expect(stringHelper.isEmpty(str3)).toBe(false);
    });

    it('The 1st test case of the method isNotEmpty()', () => {
        const str1 = null;
        expect(stringHelper.isNotEmpty(str1)).toBe(false);

        const str3 = 'Max';
        expect(stringHelper.isNotEmpty(str3)).toBe(true);
    });
});
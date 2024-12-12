const stringHelper = {};

/**
 * Checks if a string is empty or null/undefined.
 * @param {string|null|undefined} str - The string to check.
 * @returns {boolean} True if the string is empty, null, or undefined; otherwise, false.
 */
stringHelper.isEmpty = function (str) {
    if (null == str) {
        return true; // In JavaScript, comparing null using == (rather than ===) checks for both null and undefined.
    }
    return (typeof str === 'string' && '' === str.trim());
};

/**
 * Checks if a string is not empty.
 * @param {string|null|undefined} str - The string to check.
 * @returns {boolean} True if the string is not empty, null, or undefined; otherwise, false.
 */
stringHelper.isNotEmpty = function (str) {
    return !this.isEmpty(str);
};

export default stringHelper;
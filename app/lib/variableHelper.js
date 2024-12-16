const variableHelper = {};

/**
 * Checks if a variable is an array.
 * @param {*} arr - The variable to check.
 * @returns {boolean} True if the variable is an array; otherwise, false.
 * @example
 * const arr = [];
 * console.log(variableHelper.isArray(arr)); // Output is true
 */
variableHelper.isArray = function(arr) {
    return arr instanceof Array;
};

/**
 * Checks if an object is empty.
 * @param {*} obj - The object to check.
 * @returns {boolean} True if the object is empty or not an object; otherwise, false.
 * @example
 * const obj = {};
 * console.log(variableHelper.isEmptyObject(obj)); // Output is true
 */
variableHelper.isEmptyObject = function(obj) {
    return !(obj instanceof Object) || 0 === Object.keys(obj).length;
}

/**
 * Checks if a variable is an object.
 * @param {*} variable - The variable to check.
 * @returns {boolean} True if the variable is an object; otherwise, false.
 */
variableHelper.isObject = function(variable) {
    return variable !== null && typeof variable === 'object';
}

/**
 * Creates a deep copy of an object.
 * @param {Object} originalObject - The object to copy.
 * @returns {Object} A deep copy of the original object.
 */
variableHelper.deepCopy = function(originalObject) {
    return JSON.parse(JSON.stringify(originalObject));
}

export default variableHelper;
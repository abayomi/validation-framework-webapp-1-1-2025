const variableHelper = {};

/**
 * const arr = [];
 * console.log(variableHelper.isArray(arr)); // Output is true
 */
variableHelper.isArray = function(arr) {
    return arr instanceof Array;
};

/**
 * const obj = {};
 * console.log(variableHelper.isEmptyObject(obj)); // Output is true
 */
variableHelper.isEmptyObject = function(obj) {
    return !(obj instanceof Object) || 0 === Object.keys(obj).length;
}

export default variableHelper;
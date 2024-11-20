const variableHelper = {};

variableHelper.isArray = function(arr) {
    return arr instanceof Array;
};

variableHelper.isEmptyObject = function(obj) {
    return !(obj instanceof Object) || 0 === Object.keys(obj).length;
}

export default variableHelper;
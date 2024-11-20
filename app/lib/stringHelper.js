const stringHelper = {};

stringHelper.isEmpty = function (str) {
    if (null == str) {
        return true; // In JavaScript, comparing null using == (rather than ===) checks for both null and undefined.
    }
    return (typeof str === 'string' && '' === str.trim());
};

stringHelper.isNotEmpty = function (str) {
    return !this.isEmpty(str);
};

export default stringHelper;
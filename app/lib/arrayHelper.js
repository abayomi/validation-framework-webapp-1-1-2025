/* istanbul ignore file */
/**
 * Retrieves the element at the specified index from an array.
 *
 * @example
 * const arr = ['a', 'b', 'c'];
 * console.log(arrayGet(arr, 2, 'z')); // Output: 'c'
 *
 * @param {Array} array - The array to retrieve the element from.
 * @param {number} index - The index of the element to retrieve.
 * @param {*} [defaultValue=null] - The default value to return if the array is empty or the index is out of bounds.
 * @returns {*} The element at the specified index or the default value.
 */
export function arrayGet(array, index, defaultValue = null) {
    if (!Array.isArray(array) || array.length === 0) {
        return defaultValue;
    }

    return array[index] ? array[index] : defaultValue;
}

/**
 * Retrieves the value of a nested property from an object.
 *
 * @example
 * const obj = {
 *     user: {
 *         name: "Max",
 *         gender: "Male",
 *         location: {
 *             city: "Toronto",
 *             country: "Canada"
 *         }
 *     }
 * };
 * console.log(propertyGet(obj, 'user.location.city', 'unknown')); // Output: 'Toronto'
 *
 * @param {Object} obj - The object to retrieve the property from.
 * @param {string} property - The dot-separated string representing the nested property path.
 * @param {*} [defaultValue=null] - The default value to return if the property is not found.
 * @returns {*} The value of the nested property or the default value.
 */
export function propertyGet(obj, property, defaultValue = null) {
    if (!obj || typeof property !== 'string') {
        return defaultValue;
    }

    const properties = property.split('.');
    let result = obj;

    for (let prop of properties) {
        if (result && result.hasOwnProperty(prop)) {
            result = result[prop];
        } else {
            return defaultValue;
        }
    }

    return result;
}

/**
 * Returns an array of unique records based on a specified key.
 *
 * @param {Array} data - The array of objects to filter for unique records.
 * @param {string} [key='id'] - The key to determine uniqueness.
 * @returns {Array} An array of unique records sorted by the specified key.
 */
export function uniqueRecords(data, key = 'id') {
    if (!data) {
        return [];
    }
    
    const uniqueData = data.reduce((acc, current) => {
        if (key) {
            if (!current[key]) {
                return acc;
            }
            const x = acc.find(item => item[key] === current[key]);
            if (!x) {
                return acc.concat([current]);
            }
        } else {
            const x = acc.find(item => item === current);
            if (!x) {
                return acc.concat([current]);
            }
        }
        return acc;
    }, []);
    return uniqueData.sort((a, b) => key ? b[key] - a[key] : b - a);
}
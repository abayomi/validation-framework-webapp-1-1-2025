
/*
Example: 
    const arr = ['a', 'b', 'c'];
    console.log(arrayGet(arr, 2, 'z'));
*/
export function arrayGet(array, index, defaultValue = null) {
    if (!Array.isArray(array) || array.length === 0) {
        return defaultValue;
    }

    return array[index];
}

/*
Example:
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
    console.log(propertyGet(obj, 'user.location.city', 'unknown'));
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
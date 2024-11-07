
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

export function uniqueRecords(data) {
    const uniqueData = data.reduce((acc, current) => {
        if (!current.id) {
            return acc;
        }
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    return uniqueData.sort((a, b) => b.id - a.id);
}
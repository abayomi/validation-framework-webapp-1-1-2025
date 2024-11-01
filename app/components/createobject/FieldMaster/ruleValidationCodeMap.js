"use client";
export const validationCodeOptions = {
    '1': '1 - Regex',
    '2': '2 - Rest API Call',
    '3': '3 - Function Code',
    '4': '4 - Allow blank',
    '5': '5 - Allow NULL',
};

export const errorMessageOptions = {
    '1': '1 - %f: Value is invalid, based on the regular expression.',
    '2': '2 - %f: Value is invalid, based on the API lookup.',
    '3': '3 - %f: Value is invalid, based on the function code validation.',
    '4': '4 - Value can be blank.',
    '5': '5 - Value can be NULL.',
    '6': '6 - %f: Century date must be 19 or 20.'
};

export const getErrorCodeOptions = (validationCode) => {
    switch (validationCode) {
        case '1':
            return ['1', '6'];
        case '2':
            return ['2'];
        case '3':
            return ['3'];
        case '4':
            return ['4'];
        case '5':
            return ['5'];
        default:
            return [];
    }
};


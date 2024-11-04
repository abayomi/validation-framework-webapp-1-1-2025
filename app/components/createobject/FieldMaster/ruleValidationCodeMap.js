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

export const conditionTypeOptions = {
    '1': '1 - Regex',
    '2': '2 - API Parameters',
    '3': '3 - API Id',
    '4': '4 - Function Body',
    '5': '5 - ARG Names',
    '6': '6 - ARG Params'
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

export const getConditions = (validationCode) => {
    switch (validationCode) {
        case '1':
            return [{
                type: '1',
                value: null
            }];
        case '2':
            return [
                {
                    type: '2',
                    value: null
                },
                {
                    type: '3',
                    value: null
                }];
        case '3':
            return [
                {
                    type: '4',
                    value: null
                },
                {
                    type: '5',
                    value: null
                },
                {
                    type: '6',
                    value: null
                }];
        default:
            return [];
    }
};



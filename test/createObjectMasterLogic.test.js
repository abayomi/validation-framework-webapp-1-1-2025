/* npm test -- createObjectMasterLogic.test.js */

import React from "react";
import {
    formatFieldRules,
    formatFormData,
    getAddedRulesForField,
    newEmptyFieldItem,
    updateFieldItems,
    replaceFieldItem,
    updateHandlerLogic,
    checkObjFieldRulesChanged,
    checkUserChanges
} from "@/app/components/createobject/createObjectMasterLogic.js";
import variableHelper from "@/app/lib/variableHelper";

const mockRawRules = [
    {
        id: '111',
        ruleGroupNumber: '2',
        longDescription: 'The long description',
        shortDescription: 'The short description',
        isMandatory: true
    },
    {
        id: '222',
        ruleGroupNumber: '10',
        longDescription: 'The long description',
        shortDescription: 'The short description',
        isMandatory: false
    }
];

const mockFormData = {
    "objectMasterId":"37",
    "objectName":"Test",
    "objectDef":"Test Definition",
    "labelName":"Test Label Name",
    "objMasterInUseInd":true,
    "fieldItems":[
        {
            "id":"c978e9a6-6180-4f11-ae68-77b9caaf61db",
            "objectFieldName":"Test Field Name",
            "fieldMasterName":"Test Master Name",
            "fieldMasterId":"137",
            "fieldXrefId":"1417",
            "rules": mockRawRules
        }
    ]
};

const mockAPIsToBeCalledFirstGroup = [
    {
        "apiName": "RemoveFieldFromObject",
        "variables": {
            "xrefIds": ["1712", "1713"]
        }
    },
    {
        "apiName": "AddFieldToObject",
        "variables": {
            "addFields": [
                {
                    "fieldMasterId": "2",
                    "objectFieldName": "test 222",
                    "objectMasterId": "390"
                },
                {
                    "fieldMasterId":"13",
                    "objectFieldName":"test 333",
                    "objectMasterId":"390"
                }
            ]
        },
        "extraData": {
            "rulesToBeAdded": [
                {
                    "fieldMasterId": "2",
                    "rules": [
                        {
                            "id": "2",
                            "ruleGroupNumber": 10,
                            "longDescription": "Corp code / client number valid",
                            "shortDescription": "Corp cd/cli no valid",
                            "isMandatory": true
                        }
                    ]
                },
                {
                    "fieldMasterId":"13",
                    "rules":[
                        {
                            "id":"13",
                            "ruleGroupNumber":10,
                            "longDescription":"Currency code (USD)",
                            "shortDescription":"Currency cd (USD)",
                            "isMandatory":true
                        }
                    ]
                }
            ]
        }
    }
];

// Run: npm test -- createObjectMasterLogic.test.js
describe('The test cases for the function newEmptyFieldItem()', () => {
    it('Function newEmptyFieldItem() 1st test case', () => {
        const item = newEmptyFieldItem();
        expect(item instanceof Object).toBe(true);
        expect(item.fieldMasterId).toBe('0');
        expect(item.fieldXrefId).toBe('0');
    });
});

describe('The test cases for the function getAddedRulesForField()', () => {
    it('Function getAddedRulesForField() 1st test case', () => {
        const mockFieldMasterId = '2'; // Should be a string
        const result = getAddedRulesForField(mockAPIsToBeCalledFirstGroup, mockFieldMasterId);

        expect(result.length).toBe(1);
        expect(result[0].id).toBe(mockFieldMasterId);
    });

    it('Function getAddedRulesForField() 2nd test case', () => {
        const mockFieldMasterId = '2'; // Should be a string
        const result = getAddedRulesForField(mockAPIsToBeCalledFirstGroup.slice(0, 1), mockFieldMasterId);

        expect(result.length).toBe(0);
    });

    it('Function getAddedRulesForField() 3rd test case', () => {
        const mockFieldMasterId = '200';
        const result = getAddedRulesForField(mockAPIsToBeCalledFirstGroup, mockFieldMasterId);

        expect(result.length).toBe(0);
    });

    it('Function getAddedRulesForField() 4th test case', () => {
        const mockData = mockAPIsToBeCalledFirstGroup.map(item => {
            return {
                ...item,
                extraData: {
                    rulesToBeAdded: null
                }
            };
        });
        const mockFieldMasterId = '2';
        const result = getAddedRulesForField(mockData, mockFieldMasterId);

        expect(result.length).toBe(0);
    });
});

describe('The test cases for the function formatFieldRules()', () => {
    it('Function formatFieldRules() 1st test case', () => {
        const formattedRules = formatFieldRules(mockRawRules);

        expect(formattedRules.length).toBe(2);
        expect(formattedRules[0].id).toBe('111');
        expect(Object.keys(formattedRules[0]).length).toBe(5);
    });

    it('Function formatFieldRules() 2nd test case', () => {
        const formattedRules = formatFieldRules([]);

        expect(formattedRules.length).toBe(0);
    });
});

describe('The test cases for the function formatFormData()', () => {
    it('Function formatFormData() 1st test case', () => {
        const rawData = {
            objectMasterId: '37',
            objectName: 'Test',
            objectDefinition: 'Test Definition',
            objectLabelName: 'Test Label Name',
            objMasterInUseInd: true,
            fields: [
                {
                    fieldName: 'Test Field Name',
                    fieldMasterName: 'Test Master Name',
                    fieldMasterId: '137',
                    fieldXrefId: '1417',
                    rules: mockRawRules
                }
            ]
        };
        const formattedData = formatFormData(rawData);

        expect(Object.keys(formattedData).length).toBe(6);
        expect(formattedData.fieldItems.length).toBe(1);
        expect(formattedData.fieldItems[0].rules.length).toBe(2);

        expect(formattedData.objectMasterId).toBe(rawData.objectMasterId);
        expect(formattedData.objectName).toBe(rawData.objectName);
        expect(formattedData.objectDef).toBe(rawData.objectDefinition);
        expect(formattedData.labelName).toBe(rawData.objectLabelName);
        expect(formattedData.objMasterInUseInd).toBe(rawData.objMasterInUseInd);

        expect(formattedData.fieldItems[0].objectFieldName).toBe(rawData.fields[0].fieldName);
        expect(formattedData.fieldItems[0].fieldMasterName).toBe(rawData.fields[0].fieldMasterName);
        expect(formattedData.fieldItems[0].fieldMasterId).toBe(rawData.fields[0].fieldMasterId);
        expect(formattedData.fieldItems[0].fieldXrefId).toBe(rawData.fields[0].fieldXrefId);

        expect(formattedData.fieldItems[0].rules[0].id).toBe(rawData.fields[0].rules[0].id);
        expect(formattedData.fieldItems[0].rules[0].ruleGroupNumber).toBe(rawData.fields[0].rules[0].ruleGroupNumber);
        expect(formattedData.fieldItems[0].rules[0].longDescription).toBe(rawData.fields[0].rules[0].longDescription);
        expect(formattedData.fieldItems[0].rules[0].shortDescription).toBe(rawData.fields[0].rules[0].shortDescription);
        expect(formattedData.fieldItems[0].rules[0].isMandatory).toBe(rawData.fields[0].rules[0].isMandatory);
    });

    it('Function formatFormData() 2nd test case', () => {
        const rawData = null;
        const result = formatFormData(rawData);
        expect(result instanceof Object).toBe(true);
    });
});

describe('The test cases for the function replaceFieldItem()', () => {
    it('Function updateFieldItems() 1st test case', () => {
        const newObjectFieldName = 'New Field Name';
        const newItem = {
            "id": "c978e9a6-6180-4f11-ae68-77b9caaf61db",
            "objectFieldName": newObjectFieldName,
            "fieldMasterName": "Test Master Name",
            "fieldMasterId": "137",
            "fieldXrefId": "1417",
            "rules": mockRawRules
        }
        const updatedFieldItems = replaceFieldItem(mockFormData.fieldItems, newItem);
        expect(updatedFieldItems[0].objectFieldName).toBe(newObjectFieldName);
    });
});

describe('The test cases for the function updateFieldItems()', () => {
    // Mock useState
    const setState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((initState) => [initState, setState]);

    it('Function updateFieldItems() 1st test case', () => {
        const newItemValue = {
            "id": "c978e9a6-6180-4f11-ae68-77b9caaf61db",
            "objectFieldName": "New Field Name", // New field name
            "fieldMasterName": "Test Master Name",
            "fieldMasterId": "137",
            "fieldXrefId": "1417",
            "rules": mockRawRules
        }

        updateFieldItems(setState, mockFormData, newItemValue);
        expect(setState).toHaveBeenCalledWith({
            ...mockFormData,
            fieldItems: [newItemValue]
        });
    });
});

describe('The test cases for the class updateHandlerLogic', () => {
    it('Method getAddedObjectFieldList() 1st test case', () => {
        const mockQueryResponseList = {
            AddFieldToObject: {
                data: {
                    AddFieldToObject: [
                        {
                            objectFieldXrefId: '1413',
                            objectMasterId: '37',
                            fieldMasterId: '11'
                        },
                        {
                            objectFieldXrefId: '1415',
                            objectMasterId: '38',
                            fieldMasterId: '12'
                        }
                    ]
                }
            }
        };
        const result = updateHandlerLogic.getAddedObjectFieldList(mockQueryResponseList);
        expect(result.length).toBe(2);
    });

    it('Method runMutationQuery() 1st test case', async () => {
        const apisToBeCalled = [
            {apiName: 'api1', variables: {var1: 'value1'}},
            {apiName: 'api2', variables: {var2: 'value2'}}
        ];

        const mutationQueryList = {
            api1: {mutationHandler: jest.fn().mockResolvedValue('response1')},
            api2: {mutationHandler: jest.fn().mockResolvedValue('response2')}
        };

        const expectedResponse = {
            api1: 'response1',
            api2: 'response2'
        };

        const result = await updateHandlerLogic.runMutationQuery(apisToBeCalled, mutationQueryList);

        expect(result).toEqual(expectedResponse);
        expect(mutationQueryList.api1.mutationHandler).toHaveBeenCalledWith({ variables: { var1: 'value1' } });
        expect(mutationQueryList.api2.mutationHandler).toHaveBeenCalledWith({ variables: { var2: 'value2' } });
    });
});

describe('The test cases for the class getValidationsToBeAdded', () => {
    it('Method getValidationsToBeAdded() 1st test case', () => {
        const mockAddedObjectFieldList = []; // Test: Empty array
        const result = updateHandlerLogic.getValidationsToBeAdded(mockAddedObjectFieldList, mockAPIsToBeCalledFirstGroup);
        expect(result.length).toBe(0);
    });

    it('Method getValidationsToBeAdded() 2nd test case', () => {
        const mockAddedObjectFieldList = [
            {
                objectFieldXrefId: '1314',
                fieldMasterId: '2'
            }
        ];
        const result = updateHandlerLogic.getValidationsToBeAdded(mockAddedObjectFieldList, mockAPIsToBeCalledFirstGroup);
        expect(result.length).toBe(1);
    });

    it('Method getValidationsToBeAdded() 3rd test case', () => {
        const mockAddedObjectFieldList = [
            {
                objectFieldXrefId: '1314',
                fieldMasterId: '200' // Test: No such fieldMasterId
            }
        ];
        const result = updateHandlerLogic.getValidationsToBeAdded(mockAddedObjectFieldList, mockAPIsToBeCalledFirstGroup);
        expect(result.length).toBe(0);
    });
});

describe('The test cases for the function checkObjFieldRulesChanged()', () => {
    const mockFieldToBeChecked = {
        "id": "396537e5-b076-4979-af56-2492fc215788",
        "objectFieldName": "dec 9 after ",
        "fieldMasterName": "cntry_cd",
        "fieldMasterId": "12",
        "fieldXrefId": "1717",
        "rules": [
            {
                "id": "11",
                "ruleGroupNumber": 10,
                "longDescription": "Regular expression",
                "shortDescription": "Regex",
                "isMandatory": true
            }
        ]
    };
    const mockFieldSnapshot = [
        {
            "id": "1f44ffc2-05a6-4443-b28e-b02e24b674eb",
            "objectFieldName": "acih_dlr_asgn_no_20241202_2057",
            "fieldMasterName": ">0",
            "fieldMasterId": "37",
            "fieldXrefId": "1713",
            "rules": [
                {
                    "id": "39",
                    "ruleGroupNumber": 10,
                    "longDescription": "Regular expression",
                    "shortDescription": "Regex",
                    "isMandatory": true
                }
            ]
        },
        {
            "id": "396537e5-b076-4979-af56-2492fc215788",
            "objectFieldName": "dec 9 after ",
            "fieldMasterName": "cntry_cd",
            "fieldMasterId": "12",
            "fieldXrefId": "1717",
            "rules": [
                {
                    "id": "11",
                    "ruleGroupNumber": 10,
                    "longDescription": "Regular expression",
                    "shortDescription": "Regex",
                    "isMandatory": true
                }
            ]
        },
        {
            "id": "e705ad4c-3c28-45fc-b39e-048913117adc",
            "objectFieldName": "test rule",
            "fieldMasterName": ">0",
            "fieldMasterId": "37",
            "fieldXrefId": "1714",
            "rules": [
                {
                    "id": "39",
                    "ruleGroupNumber": 10,
                    "longDescription": "Regular expression",
                    "shortDescription": "Regex",
                    "isMandatory": true
                }
            ]
        }];

    it('Function checkObjFieldRulesChanged() 1st test case', () => {
        const result = checkObjFieldRulesChanged(mockFieldToBeChecked, mockFieldSnapshot);
        expect(result.addedRules.length).toBe(0);
        expect(result.removedRules.length).toBe(0);
    });

    it('Function checkObjFieldRulesChanged() 2nd test case', () => {
        const fieldToBeChecked = {...mockFieldToBeChecked, id: 'no-such-id'};
        const result = checkObjFieldRulesChanged(fieldToBeChecked, mockFieldSnapshot);
        expect(result.addedRules.length).toBe(0);
        expect(result.removedRules.length).toBe(0);
    });

    it('Function checkObjFieldRulesChanged() 3rd test case', () => {
        const fieldToBeChecked = {
            ...mockFieldToBeChecked,
            rules: [
                ...mockFieldToBeChecked.rules,
                { // Add a new rule
                    "id": "12",
                    "ruleGroupNumber": 10,
                    "longDescription": "Allow Null",
                    "shortDescription": "Allow Null",
                    "isMandatory": true
                }
            ]
        };
        const result = checkObjFieldRulesChanged(fieldToBeChecked, mockFieldSnapshot);
        expect(result.addedRules.length).toBe(1);
        expect(result.removedRules.length).toBe(0);
    });

    it('Function checkObjFieldRulesChanged() 4th test case', () => {
        const fieldToBeChecked = {
            ...mockFieldToBeChecked,
            rules: [
                { // Add a new rule and remove a rule
                    "id": "12",
                    "ruleGroupNumber": 10,
                    "longDescription": "Allow Null",
                    "shortDescription": "Allow Null",
                    "isMandatory": true
                }
            ]
        };
        const result = checkObjFieldRulesChanged(fieldToBeChecked, mockFieldSnapshot);
        expect(result.addedRules.length).toBe(1);
        expect(result.removedRules.length).toBe(1);
    });
});

describe('The test cases for the function checkUserChanges()', () => {
    const formData = mockFormData;
    const formDataSnapshot = variableHelper.deepCopy(formData);

    it('Function checkUserChanges() 1st test case', () => {
        const result = checkUserChanges(formData, formDataSnapshot);
        expect(result.length).toBe(0); // Nothing changes
    });

    it('Function checkUserChanges() 2nd test case', () => {
        const changedFormData1 = {
            ...formData,
            objectName: 'New Test Label Name'
        };
        const result1 = checkUserChanges(changedFormData1, formDataSnapshot);
        expect(result1.length).toBe(1);

        const changedFormData2 = {
            ...formData,
            objectDef: 'New Test Def'
        };
        const result2 = checkUserChanges(changedFormData2, formDataSnapshot);
        expect(result2.length).toBe(1);
    });

    it('Function checkUserChanges() 3rd test case', () => {
        const changedFormData = {
            ...formData,
            objMasterInUseInd: false
        };
        const result = checkUserChanges(changedFormData, formDataSnapshot);
        expect(result.length).toBe(1);
    });

    it('Function checkUserChanges() 4th test case', () => {
        const changedFormData = {
            ...formData,
            fieldItems: [
                { // Add a field and remove a field
                    "id":"new-uuid-id",
                    "objectFieldName":"Test Field Name",
                    "fieldMasterName":"Test Master Name",
                    "fieldMasterId":"138",
                    "fieldXrefId":"1418",
                    "rules": mockRawRules
                }
            ]
        };
        const result = checkUserChanges(changedFormData, formDataSnapshot);

        const hasRemoveFieldFromObject = result.find(item => 'RemoveFieldFromObject' === item.apiName);
        expect(hasRemoveFieldFromObject instanceof Object).toBe(true);

        const hasAddFieldToObject = result.find(item => 'AddFieldToObject' === item.apiName);
        expect(hasAddFieldToObject instanceof Object).toBe(true);
    });

    it('Function checkUserChanges() 5th test case', () => {
        const changedFormData = formData;
        changedFormData.fieldItems[0].rules = changedFormData.fieldItems[0].rules.slice(0, 1);

        const result = checkUserChanges(changedFormData, formDataSnapshot);

        //console.log(JSON.stringify(result));

        const hasRemoveValidationFromObjectField = result.find(item => 'RemoveValidationFromObjectField' === item.apiName);
        expect(hasRemoveValidationFromObjectField instanceof Object).toBe(true);
    });

    it('Function checkUserChanges() 6th test case', () => {
        const changedFormData = formData;
        changedFormData.fieldItems[0].rules = [
            ...changedFormData.fieldItems[0].rules,
            { // Add a rule
                id: '333',
                ruleGroupNumber: '10',
                longDescription: 'The long description',
                shortDescription: 'The short description',
                isMandatory: false
            }
        ];

        const result = checkUserChanges(changedFormData, formDataSnapshot);

        const hasAddValidationToObjectField = result.find(item => 'AddValidationToObjectField' === item.apiName);
        expect(hasAddValidationToObjectField instanceof Object).toBe(true);
    });
});
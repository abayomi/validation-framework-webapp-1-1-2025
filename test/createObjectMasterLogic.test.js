import React, { useState } from "react";
import {
    formatFieldRules,
    formatFormData,
    getAddedRulesForField,
    newEmptyFieldItem,
    updateFieldItems,
    replaceFieldItem
} from "@/app/components/createobject/createObjectMasterLogic.js";

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
import {
    formatFieldRules,
    formatFormData,
    getAddedRulesForField
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

// Run: npm test -- createObjectMasterLogic.test.js
describe('createObjectMasterLogic', () => {

    it('getAddedRulesForField', () => {
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
        const mockFieldMasterId = '2'; // Should be a string
        const result = getAddedRulesForField(mockAPIsToBeCalledFirstGroup, mockFieldMasterId);

        expect(result.length).toBe(1);
        expect(result[0].id).toBe(mockFieldMasterId);
    });

    it('formatFieldRules', () => {
        const formattedRules = formatFieldRules(mockRawRules);

        expect(formattedRules.length).toBe(2);
        expect(formattedRules[0].id).toBe('111');
        expect(Object.keys(formattedRules[0]).length).toBe(5);
    });

    it('formatFormData', () => {
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
});
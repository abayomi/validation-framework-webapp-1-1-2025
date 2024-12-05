import { getAddedRulesForField } from "@/app/components/createobject/createObjectMasterLogic.js";

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
});
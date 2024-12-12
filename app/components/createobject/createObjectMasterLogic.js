import { v4 as uuidv4 } from "uuid";
import { propertyGet } from "@/app/lib/arrayHelper";
import variableHelper from "@/app/lib/variableHelper";
import { defaultDialectCode } from "@/app/components/config/dialectCodeMap";
import { useMutation } from "@apollo/client";
import graphqlForObjectMaster from "@/app/graphql/objectMasterQueries";


export function newEmptyFieldItem() {
    return { 
        id: uuidv4(),
        objectFieldName: '',
        fieldMasterName: '',
        fieldMasterId: '0',
        fieldXrefId: '0',
        rules: []
    };
}

export function updateFieldItems(setFormData, formData, newItemValue) {
    const replaceFieldItem = (fieldItems, newItem) => {
        return fieldItems.map(item => (item.id === newItem.id) ? {...item, ...newItem} : item);
    }

    const newFieldItems = replaceFieldItem(formData.fieldItems, newItemValue);

    setFormData({...formData, fieldItems: newFieldItems});
}

export function formatFieldRules(rawRules) {
    if (!rawRules || 0 === rawRules.length) {
        return [];
    }

    return rawRules.map(r => {
        return {
            id: r.id,
            ruleGroupNumber: r.ruleGroupNumber,
            longDescription: r.longDescription,
            shortDescription: r.shortDescription,
            isMandatory: r.isMandatory
        };
    });
}

export function formatFormData(rawData = null) {
    if (!rawData) {
        return {
            objectMasterId: '',
            objectName: '',
            objectDef: '',
            labelName: '',
            objMasterInUseInd: true,
            fieldItems: [newEmptyFieldItem()]
        };
    }

    return {
        "objectMasterId": rawData.objectMasterId,
        "objectName": rawData.objectName,
        "objectDef": propertyGet(rawData, 'objectDefinition', 'The API does not return this value.'),
        "labelName": rawData.objectLabelName,
        "objMasterInUseInd": rawData.objMasterInUseInd,
        "fieldItems": rawData.fields.map(f => {
            return {
                id: uuidv4(), // For UI render
                objectFieldName: f.fieldName,
                fieldMasterName: f.fieldMasterName, 
                fieldMasterId: f.fieldMasterId,
                fieldXrefId: f.fieldXrefId,
                rules: formatFieldRules(f.rules)
            };
        })
    };
}

export function checkUserChanges(formData, formDataSnapshot) {
    const apisToBeCalled = [];

    // Check if the objectName or the objectDef has been changed.
    const objectNameChanged = formData.objectName !== formDataSnapshot.objectName;
    const objectDefChanged = formData.objectDef !== formDataSnapshot.objectDef;
    if (objectNameChanged || objectDefChanged) {
        apisToBeCalled.push({
            apiName: 'UpdateValidationObjectName',
            //apiQuery: graphqlForObjectMaster.UpdateValidationObjectName,
            variables: {
                addField: {
                    dialectCode: defaultDialectCode,
                    objectDefinition: formData.objectDef,
                    objectName: formData.objectName,
                    objectMasterId: formData.objectMasterId,
                }
            }
        });
    }

    // Check if the objMasterInUseInd has been changed.
    const objMasterInUseIndChanged = formData.objMasterInUseInd !== formDataSnapshot.objMasterInUseInd;
    if (objMasterInUseIndChanged) {
        apisToBeCalled.push({
            apiName: 'UpdateValidationObjectInUseInd',
            //apiQuery: graphqlForObjectMaster.UpdateValidationObjectInUseInd,
            variables: {
                addField: {
                    objectInUseInd: formData.objMasterInUseInd,
                    objectMasterId: formData.objectMasterId
                }
            }
        });
    }

    // Check if a field in the formData snapshot is not in formData: it should be deleted.
    const fieldItemIds = formData.fieldItems.map(field => field.id);
    const fieldItemsToBeDeleted = formDataSnapshot.fieldItems.filter(field => false === fieldItemIds.includes(field.id));
    const objectFieldXrefIdList = fieldItemsToBeDeleted.map(field => field.fieldXrefId);
    if (objectFieldXrefIdList.length) {
        apisToBeCalled.push({
            apiName: 'RemoveFieldFromObject',
            //apiQuery: graphqlForObjectMaster.RemoveFieldFromObject,
            variables: {
                xrefIds: objectFieldXrefIdList
            }
        });
    }

    // Check if a field in the formData is not in the formData snapshot: it should be added.
    const snapshotFieldItemIds = formDataSnapshot.fieldItems.map(field => field.id);
    const fieldItemsToBeAdded = formData.fieldItems.filter(field => false === snapshotFieldItemIds.includes(field.id));
    if (fieldItemsToBeAdded.length > 0) {
        apisToBeCalled.push({
            apiName: 'AddFieldToObject',
            //apiQuery: graphqlForObjectMaster.AddFieldToObject,
            variables: {
                addFields: fieldItemsToBeAdded.map(field => {
                    return {
                        fieldMasterId: field.fieldMasterId,
                        objectFieldName: field.objectFieldName,
                        objectMasterId: formData.objectMasterId
                    };
                })
            },
            extraData: {
                rulesToBeAdded: fieldItemsToBeAdded.map(field => {
                    return {
                        fieldMasterId: field.fieldMasterId,
                        rules: field.rules // TODO Check if objField.rules is empty.
                    }
                })
            }
        });
    }

    // If a field is neither new nor pending deletion, check if its rule has changed.
    let addValidationsList = [];
    let removeValidationsList = [];
    const fieldItemsToBeChecked = formData.fieldItems.filter(field => snapshotFieldItemIds.includes(field.id));
    fieldItemsToBeChecked.forEach(field => {
        const changedRules = checkObjFieldRulesChanged(field, formDataSnapshot.fieldItems);
        changedRules.addedRules.forEach(changedItem => {
            addValidationsList.push({
                fieldValidRuleId: changedItem.rule.id,
                objectFieldXrefId: field.fieldXrefId
            });
        });
        changedRules.removedRules.forEach(changedItem => {
            removeValidationsList.push({
                fieldValidRuleId: changedItem.rule.id,
                objectFieldXrefId: field.fieldXrefId
            });
        });
    });
    if (addValidationsList.length) {
        apisToBeCalled.push({
            apiName: 'AddValidationToObjectField',
            //apiQuery: graphqlForObjectMaster.AddValidationToObjectField,
            variables: {
                addValidations: addValidationsList
            }
        });
    }
    if (removeValidationsList.length) {
        apisToBeCalled.push({
            apiName: 'RemoveValidationFromObjectField',
            //apiQuery: graphqlForObjectMaster.RemoveValidationFromObjectField,
            variables: {
                removeValidations: removeValidationsList
            }
        });
    }

    return apisToBeCalled;
}

function checkObjFieldRulesChanged(fieldToBeChecked, fieldSnapshot) {
    let changedRules = {
        addedRules: [],
        removedRules: []
    };

    const targetFieldSnapshot = fieldSnapshot.find(field => field.id === fieldToBeChecked.id);
    if (!targetFieldSnapshot) {
        return changedRules;
    }

    const getIds = (rules) => {
        return rules.map(r => r.id);
    };
    
    const snapShotRuleIds = getIds(targetFieldSnapshot.rules);
    fieldToBeChecked.rules.forEach(r => {
        const notFoundInOldData = false === snapShotRuleIds.includes(r.id);
        if (notFoundInOldData) {
            changedRules.addedRules.push({
                fieldMasterId: fieldToBeChecked.fieldMasterId,
                rule: r
            });
        }
    });

    const newRuleIds = getIds(fieldToBeChecked.rules);
    targetFieldSnapshot.rules.forEach(r => {
        const notFoundInNewData = false === newRuleIds.includes(r.id);
        if (notFoundInNewData) {
            changedRules.removedRules.push({
                fieldMasterId: fieldToBeChecked.fieldMasterId,
                rule: r
            });
        }
    });

    return changedRules;
}

export function useMultipleMutations() {
    const [mutationHandler1, { data: data1, loading: loading1, error: error1 }] = useMutation(graphqlForObjectMaster.UpdateValidationObjectName);
    const [mutationHandler2, { data: data2, loading: loading2, error: error2 }] = useMutation(graphqlForObjectMaster.UpdateValidationObjectInUseInd);
    const [mutationHandler3, { data: data3, loading: loading3, error: error3 }] = useMutation(graphqlForObjectMaster.RemoveFieldFromObject);
    const [mutationHandler4, { data: data4, loading: loading4, error: error4 }] = useMutation(graphqlForObjectMaster.AddFieldToObject);
    const [mutationHandler5, { data: data5, loading: loading5, error: error5 }] = useMutation(graphqlForObjectMaster.AddValidationToObjectField);
    const [mutationHandler6, { data: data6, loading: loading6, error: error6 }] = useMutation(graphqlForObjectMaster.RemoveValidationFromObjectField);

    return {
        UpdateValidationObjectName: {
            mutationHandler: mutationHandler1,
            mutationResponse: {
                data: data1,
                loading: loading1,
                error: error1
            }
        },
        UpdateValidationObjectInUseInd: {
            mutationHandler: mutationHandler2,
            mutationResponse: {
                data: data2,
                loading: loading2,
                error: error2
            }
        },
        RemoveFieldFromObject: {
            mutationHandler: mutationHandler3,
            mutationResponse: {
                data: data3,
                loading: loading3,
                error: error3
            }
        },
        AddFieldToObject: {
            mutationHandler: mutationHandler4,
            mutationResponse: {
                data: data4,
                loading: loading4,
                error: error4
            }
        },
        AddValidationToObjectField: {
            mutationHandler: mutationHandler5,
            mutationResponse: {
                data: data5,
                loading: loading5,
                error: error5
            }
        },
        RemoveValidationFromObjectField: {
            mutationHandler: mutationHandler6,
            mutationResponse: {
                data: data6,
                loading: loading6,
                error: error6
            }
        }
    };
}

export function updateFieldRule(formData, fieldUUID, fieldMasterId, checkedRule) {
    const newFormData = variableHelper.deepCopy(formData);
    let fieldToBeUpdated = newFormData.fieldItems.find(field => field.fieldMasterId === fieldMasterId && field.id === fieldUUID);
    if (!fieldToBeUpdated) {
        return;
    }

    const ruleExists = fieldToBeUpdated.rules.some(rule => rule.id === checkedRule.id);
    if (ruleExists) {
        // Remove the existing field
        fieldToBeUpdated.rules = fieldToBeUpdated.rules.filter(rule => rule.id !== checkedRule.id);
    } else {
        // Add a new filed
        fieldToBeUpdated.rules = [...fieldToBeUpdated.rules, checkedRule];
    }

    // Replace the original field with the new one.
    newFormData.fieldItems = newFormData.fieldItems.map(field => field.id === fieldToBeUpdated.id ? fieldToBeUpdated : field);

    return newFormData;
}

export function getAddedRulesForField(apisToBeCalledFirstGroup, fieldMasterId) {
    const targetAPIName = apisToBeCalledFirstGroup.find(item => 'AddFieldToObject' === item.apiName);
    if (!targetAPIName) {
        return [];
    }

    const rulesToBeAdded = targetAPIName.extraData.rulesToBeAdded;
    if (!variableHelper.isArray(rulesToBeAdded)) {
        return [];
    }

    const target = rulesToBeAdded.find(item => item.fieldMasterId === fieldMasterId);
    if (!target) {
        return [];
    }

    return target.rules;
}

const updateHandlerLogic = {};

updateHandlerLogic.runMutationQuery = async function (apisToBeCalled, mutationQueryList) {
    let queryResponseList = {};
    for (const api of apisToBeCalled) {
        const mutationQuery = mutationQueryList[api.apiName].mutationHandler;
        queryResponseList[api.apiName] = await mutationQuery({ variables: api.variables });
        console.log('queryResponseList', JSON.stringify(queryResponseList));
    }

    return queryResponseList;
}

updateHandlerLogic.getAddedObjectFieldList = function (queryResponseList) {
    let addedObjectFieldList = [];
    Object.entries(queryResponseList).forEach(([apiName, response]) => {
        if ('AddFieldToObject' === apiName) {
            response.data.AddFieldToObject.forEach(item => {
                addedObjectFieldList.push({
                    objectFieldXrefId: item.objectFieldXrefId,
                    objectMasterId: item.objectMasterId,
                    fieldMasterId: item.fieldMasterId
                });
            });
        }
    });

    return addedObjectFieldList;
}

updateHandlerLogic.getValidationsToBeAdded = function (addedObjectFieldList, apisToBeCalled) {
    let validationsToBeAdded = [];
    addedObjectFieldList.forEach(field => {
        const addedRules = getAddedRulesForField(apisToBeCalled, field.fieldMasterId);
        if (0 === addedRules.length) {
            return;
        }

        addedRules.forEach(rule => {
            validationsToBeAdded.push({
                objectFieldXrefId: field.objectFieldXrefId,
                fieldValidRuleId: rule.id
            });
        });
    });

    return validationsToBeAdded;
}

export { updateHandlerLogic };
"use client";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import variableHelper from "@/app/lib/variableHelper";
import { defaultDialectCode } from "@/app/components/config/dialectCodeMap";
import graphqlForObjectMaster from '@/app/graphql/objectMasterQueries';
import CreateObjectFields from '@/app/components/createobject/createObjectFields';

function updateFieldRuleChecked(setFormData, formData, uuid, ruleId) {
    const updatedFieldItems = formData.fieldItems;
    if (!updatedFieldItems) {
        return formData;
    }

    let targetFieldIndex = 0;

    const targetField = updatedFieldItems.filter((item, index) => {
        if (item.id === uuid) {
            targetFieldIndex = index;
            return true;
        }
        return false;
    }).pop();

    if (!(targetField instanceof Object)) {
        return;
    }
    if (!targetField.rules[ruleId]) {
        return;
    }

    const oldCheckedValue = targetField.rules[ruleId].isChecked;
    targetField.rules[ruleId].isChecked = !oldCheckedValue;
    updatedFieldItems[targetFieldIndex] = targetField;

    setFormData({...formData, fieldItems: updatedFieldItems});
}

function newEmptyFieldItem() {
    return { 
        id: uuidv4(),
        objectFieldName: '',
        fieldMasterName: '',
        fieldMasterId: '0',
        fieldXrefId: '0',
        rules: []
    };
};

function updateFieldItems(setFormData, formData, newItemValue) {
    const replaceFieldItem = (fieldItems, newItem) => {
        return fieldItems.map(item => 
            item.id === newItem.id ? { ...item, ...newItem } : item
        );
    }

    const newFieldItems = replaceFieldItem(formData.fieldItems, newItemValue);

    setFormData({...formData, fieldItems: newFieldItems});
}

function formatFieldRules(rawRules) {
    if (!rawRules || 0 === rawRules.length) {
        return [];
    }

    let result = {};

    rawRules.forEach(item => {
        result[item.id] = {
            id: item.id,
            ruleGroupNumber: item.ruleGroupNumber,
            longDescription: item.longDescription,
            shortDescription: item.shortDescription,
            isMandatory: item.isMandatory,
            isChecked: item.isMandatory // Add this field for the UI. If a rule is mandatory, the value is true and users cnnot change it.
        };
    });

    return result;
}

function getInitialFormData() {
    return {
        objectMasterId: '',
        objectName: '',
        objectDef: '',
        labelName: '',
        objMasterInUseInd: true,
        fieldItems: [newEmptyFieldItem()]
    };
}

function formatRawObjectMetaData(rawData) {
    const formateRuleList = (rawRules) => {
        let ruleList = {};
        rawRules.forEach(r => {
            ruleList[r.id] = {
                id: r.id,
                ruleGroupNumber: r.ruleGroupNumber,
                longDescription: r.longDescription,
                shortDescription: r.shortDescription,
                isMandatory: r.isMandatory,
                isChecked: r.isMandatory
            };
        });

        return ruleList;
    };

    const fieldItemList = rawData.fields.map(f => {
        return {
            id: uuidv4(),
            objectFieldName: f.fieldName,
            fieldMasterName: f.fieldMasterName, 
            fieldMasterId: f.fieldMasterId,
            fieldXrefId: f.fieldXrefId,
            rules: formateRuleList(f.rules)
        };
    });

    return {
        "objectMasterId": rawData.objectMasterId,
        "objectName": rawData.objectName,
        "objectDef": "test def", // TODO The API does not return this.
        "labelName": rawData.objectLabelName,
        "objMasterInUseInd": rawData.objMasterInUseInd,
        "fieldItems": fieldItemList
    };
}

function checkUserChanges(formData, formDataSnapshot) {
    const apisToBeCalled = [];

    // Check if the objectName or the objectDef has been changed.
    const objectNameChanged = formData.objectName !== formDataSnapshot.objectName;
    const objectDefChanged = formData.objectDef !== formDataSnapshot.objectDef;
    if (objectNameChanged || objectDefChanged) {
        apisToBeCalled.push({
            api: 'UpdateValidationObjectName',
            apiQuery: graphqlForObjectMaster.UpdateValidationObjectName, // TODO
            variables: {
                field: {
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
            api: 'UpdateValidationObjectInUseInd',
            apiQuery: graphqlForObjectMaster.UpdateValidationObjectInUseInd, // TODO
            variables: {
                field: {
                    objectInUseInd: formData.objMasterInUseInd,
                    objectMasterId: formData.objectMasterId
                }
            }
        });
    }

    // Check if a field in the formData snapshot is not in formData: it should be deleted.
    const fieldItemIds = formData.fieldItems.map(item => item.id);
    const fieldItemsToBeDeleted = formDataSnapshot.fieldItems.filter(objField => false === fieldItemIds.includes(objField.id));
    const objectFieldXrefIdList = fieldItemsToBeDeleted.map(objField => objField.fieldXrefId);
    if (objectFieldXrefIdList.length) {
        apisToBeCalled.push({
            api: 'RemoveFieldFromObject',
            apiQuery: graphqlForObjectMaster.RemoveFieldFromObject, // TODO
            variables: {
                objectFieldXrefIds: objectFieldXrefIdList
            }
        });
    }

    // Check if a field in the formData is not in the formData snapshot: it should be added.
    const snapshotFieldItemIds = formDataSnapshot.fieldItems.map(item => item.id);
    const fieldItemsToBeAdded = formData.fieldItems.filter(objField => false === snapshotFieldItemIds.includes(objField.id));
    const addFieldsList = fieldItemsToBeAdded.map(objField => {
        return {
            fieldMasterId: 0, // According to the definition of the schema and reference Postman Collection, the value is "0".
            objectFieldName: objField.objectFieldName,
            objectMasterId: formData.objectMasterId
        };
    });
    if (addFieldsList.length) {
        apisToBeCalled.push({
            api: 'AddFieldToObject',
            apiQuery: graphqlForObjectMaster.AddFieldToObject,
            variables: {
                addFields: addFieldsList
            }
        });
    }

    // If a field is neither new nor pending deletion, check if its rule has changed.
    const addValidationsList = [];
    const removeValidationsList = [];
    const fieldItemsToBeChecked = formData.fieldItems.filter(objField => snapshotFieldItemIds.includes(objField.id));
    fieldItemsToBeChecked.forEach(objField => {
        const changedRules = checkObjFieldRulesChanged(objField, formDataSnapshot.fieldItems);
        changedRules.forEach(item => {
            const validationItem = {
                fieldValidRuleId: item.rule.id,
                objectFieldXrefId: item.fieldXrefId
            };
            if (item.rule.isChecked) {
                addValidationsList.push(validationItem);
            } else {
                removeValidationsList.push(validationItem);
            }
        });
    });
    if (addValidationsList.length) {
        apisToBeCalled.push({
            api: 'AddValidationToObjectField',
            apiQuery: graphqlForObjectMaster.AddValidationToObjectField,
            variables: {
                addValidations: addValidationsList
            }
        });
    }
    if (removeValidationsList.length) {
        apisToBeCalled.push({
            api: 'RemoveValidationFromObjectField',
            apiQuery: graphqlForObjectMaster.RemoveValidationFromObjectField,
            variables: {
                addValidations: removeValidationsList
            }
        });
    }

    return apisToBeCalled;
}

function checkObjFieldRulesChanged(fieldItem, fieldItemsSnapshot) {
    const fieldSnapshot = fieldItemsSnapshot.filter(item => item.id === fieldItem.id).pop();
    if (!fieldSnapshot) {
        return null;
    }

    const changedRules = [];
    Object.entries(fieldItem.rules).forEach(([_, ruleToBeSubmit]) => {
        const ruleSnapshot = fieldSnapshot.rules[ruleToBeSubmit.id];
        if (ruleToBeSubmit.isChecked !== ruleSnapshot.isChecked) {
            changedRules.push({
                fieldMasterId: fieldItem.fieldMasterId,
                rule: ruleToBeSubmit
            });
        }
    });

    return changedRules;
};

const CreateObjectMaster = (props) => {
    const { location } = props
    const isUpdating = location.pathname.includes('/updatemasterobject/object');
    const initialFormData = getInitialFormData();
    const [formData, setFormData] = useState(initialFormData);
    const [formDataSnapshot, setFormDataSnapshot] = useState({...initialFormData}); // a deep copy of initialFormData

    const showAddMoreObjectFieldsSection = function() {
        const addOneObjectField = () => {
            const newFieldItems = [...formData.fieldItems, newEmptyFieldItem()];
            setFormData({...formData, fieldItems: newFieldItems});
        };

        const deleteOneRow = (targetRowId) => {
            const newFieldItems = formData.fieldItems.filter(item => targetRowId !== item.id);
            setFormData({...formData, fieldItems: newFieldItems});
        };

        const dropDownItemClickHandler = (uuid) => {
            return function (item) {
                const newItemValue = {
                    id: uuid,
                    fieldMasterName: item.value,
                    fieldMasterId: `${item.key}`,
                    rules: formatFieldRules(item.rules)
                };

                updateFieldItems(setFormData, formData, newItemValue);
            };
        };

        const inputBoxListForAddMore = formData.fieldItems.map(item => (
            <CreateObjectFields
                key={item.id}
                item={item}
                onInputChangeHandler={ handleInputChanged }
                onDeleteHandler={ () => deleteOneRow(item.id) }
                onDropDownItemClick={ dropDownItemClickHandler(item.id) }
                onFieldRuleCheckboxChange={ (e) => updateFieldRuleChecked(setFormData, formData, item.id, e.target.value) }
            />
        ));

        return (
            <>
                <Button className="mb-3" variant="info" onClick={ addOneObjectField }>
                    Add more object fields
                </Button>

                <Row>
                    <Form.Group as={Col} className="mb-3 col-3" controlId="objectFieldName">
                        <Form.Label>
                            Object Field Name <b>*</b>
                        </Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-3" controlId="fieldMasterName">
                        <Form.Label>
                            Field Master Name <b>*</b>
                        </Form.Label>
                    </Form.Group>
                </Row>

                { inputBoxListForAddMore }
            </>
        );
    };

    const handleInputChanged = (e) => {
        if ('checkbox' === e.target.type) {
            const newObjMasterInUseInd = !formData.objMasterInUseInd;
            setFormData({...formData, objMasterInUseInd: newObjMasterInUseInd});
            return;
        }

        if ('text' === e.target.type) {
            const name = e.target.name;

            if (name.startsWith('fields-')) {
                // User changed an item of Object Field Name or Field Master Name
                const newItemValue = {
                    id: name.replace('fields-objfieldname-', ''), // The name's format is "fields-objfieldname-<UUID string>"
                    objectFieldName: e.target.value,
                };

                updateFieldItems(setFormData, formData, newItemValue);
            } else {
                // User changed other input box: 
                //   - Object Name
                //   - Object Definition
                setFormData({ ...formData, [name]: e.target.value });
            }

            return;
        }
    };

    const [createValidationObject, createValidationObjectReponse] = useMutation(graphqlForObjectMaster.CreateValidationObject);

    const submitHandler = async (event) => {
        // TODO Disable the button after user's click
        event.preventDefault();

        console.log('formData', JSON.stringify(formData));
        return;

        const formatFieldValidation = (rules) => {
            const validationList = Object.entries(rules).map(([_, r]) => {
                if (r.isMandatory || r.isChecked) {
                    return {
                        fieldValidRuleId: r.id
                    };
                }
            });

            return validationList.filter(v => v instanceof Object);
        };

        const submitData = {
            dialectCode: defaultDialectCode,
            objectDefinition: formData.objectDef,
            objectLabelName: formData.labelName,
            objectName: formData.objectName,
            objectField: formData.fieldItems.map(item => {
                return {
                    fieldMasterId: item.fieldMasterId,
                    objectFieldName: item.objectFieldName,
                    fieldValidation: formatFieldValidation(item.rules)
                };
            })
        };

        try {
            //console.log('Submitted. Variables: ', JSON.stringify(submitData));
            const response = await createValidationObject({ variables: submitData });
            console.log('response', JSON.stringify(response));
        } catch (error) {
            console.log(error.name, JSON.stringify(error));
            window.alert(`${error.name}: ${error.message}`);
        }
    }

    const updateHandler = (event) => {
        event.preventDefault();

        // TODO Check what the user changes
        const apisToBeCalled = checkUserChanges(formData, formDataSnapshot);
        const apisToBeCalledSimple = apisToBeCalled.map(item => {
            return {
                api: item.api,
                variables: item.variables
            };
        });
        console.log('Call these APIs', JSON.stringify(apisToBeCalledSimple));

        // TODO Call specific APIs

        console.log('Updated', JSON.stringify(formData));
    }

    //if (isUpdating) {
        //const { id: objectMasterId } = useParams();
        //console.log('isUpdating. ID: ', objectMasterId);
    //}

    const objMetaDataResponse = useQuery(graphqlForObjectMaster.FetchObjectMetaDataByLabel, {
        variables: {
            objectLabelName: 'AssetAcquisitionInfoInput',
            dialectCode: defaultDialectCode
        },
        skip: false === isUpdating
    });

    useEffect(() => {
        // Render the list of Object Master
        if (objMetaDataResponse.error) {
            console.log('Error from GraphQL API: ', objMetaDataResponse.error.message);
        }
        if (objMetaDataResponse.data) {
            const rawObjMeataData = objMetaDataResponse.data.FetchObjectMetaDataByLabel;
            const formattedRawObjMeataData = formatRawObjectMetaData(rawObjMeataData[0]);
            setFormData(formattedRawObjMeataData);
            setFormDataSnapshot({...formattedRawObjMeataData});

            //console.log('Init.', JSON.stringify(rawObjMeataData));
        }
    }, [objMetaDataResponse, setFormData, setFormDataSnapshot]);

    // Submit the form and get the API response
    useEffect(() => {
        if (createValidationObjectReponse.error) {
            console.log('Failed to save Object Master.', createValidationObjectReponse.error.message);
        }
        if (createValidationObjectReponse.data) {
            navigate('/');
        }
    }, [createValidationObjectReponse]);

    // React Forms, refer to https://www.w3schools.com/react/react_forms.asp
    return (
        <>
            <h2 className="title is-1">
                { isUpdating ? 'Update Object Master' : 'Create Object Master' }
            </h2>

            <Form onSubmit={ isUpdating ? updateHandler : submitHandler }>
                <Row>
                    <Form.Group className="mb-3 col-4" controlId="objectName">
                        <Form.Label>
                            Object Name <b>*</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="objectName"
                            required
                            value={ formData.objectName }
                            onChange={ handleInputChanged }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 col-4" controlId="objMasterInUseInd">
                        <Form.Label>
                            In Use Indicator <b>*</b>
                        </Form.Label>
                        <Form.Check
                            type="checkbox"
                            name="objMasterInUseInd"
                            label="Check here to mark Object Master as 'In Use'"
                            className="mt-2"
                            checked={ formData.objMasterInUseInd }
                            onChange={ handleInputChanged }
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 col-4" controlId="objectDefinition">
                    <Form.Label>
                        Object Definition <b>*</b>
                    </Form.Label>
                    <Form.Control 
                        type="text"
                        name="objectDef"
                        required
                        value={ formData.objectDef }
                        onChange={ handleInputChanged }
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-4" controlId="labelName">
                    <Form.Label>
                        Label Name { !isUpdating && (<b>*</b>) }
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="labelName"
                        value={ formData.labelName }
                        onChange={ handleInputChanged }
                        disabled={ isUpdating /* The label name cannot be edited. */}
                    />
                </Form.Group>

                { showAddMoreObjectFieldsSection() }

                <Button variant="primary" type="submit">
                    { isUpdating ? 'Update' : 'Submit' }
                </Button>
            </Form>
        </>
    );
};

export default CreateObjectMaster;
"use client";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
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

function loadFormData(isUpdating) {
    if (true === isUpdating) {
        // TODO Fetch real data from API
        return {
            "objectName": "AssetRentalTest_2150_11_20_2024_1435",
            "objectDef": "test def",
            "labelName": "AssetRentalTest_2150_11_20_2024_1435",
            "fieldItems": [
              {
                "id": "ac1182fc-530c-4116-badc-650953cfc902",
                "objectFieldName": "birthday",
                "fieldMasterName": "0/1 indicator",
                "fieldMasterId": "25",
                "rules": {
                  "27": {
                    "id": "27",
                    "ruleGroupNumber": null,
                    "longDescription": "Regular expression",
                    "shortDescription": "Regex",
                    "isMandatory": true,
                    "isChecked": true
                  },
                  "105": {
                    "id": "105",
                    "ruleGroupNumber": null,
                    "longDescription": "Allow the value provided in this field to be blank",
                    "shortDescription": "Allow blank",
                    "isMandatory": false,
                    "isChecked": false
                  }
                }
              }
            ]
        };
    }

    return {
        objectName: '',
        objectDef: '',
        labelName: '',
        fieldItems: [newEmptyFieldItem()]
    };
}

const CreateObjectMaster = (props) => {
    const { location } = props
    const isUpdating = location.pathname.includes('/updatemasterobject/object');
    const initialFormData = loadFormData(isUpdating);
    const initialFormDataSnapshot = {...initialFormData};
    const [formData, setFormData] = useState(initialFormData);
    

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
        const name = e.target.name;
        const value = e.target.value;

        if (name.startsWith('fields-')) {
            // User changed an item of Object Field Name or Field Master Name
            const newItemValue = {
                id: name.replace('fields-objfieldname-', ''), // The name's format is "fields-objfieldname-<UUID string>"
                objectFieldName: value,
            };

            updateFieldItems(setFormData, formData, newItemValue);
        } else {
            // User changed other input box: 
            //   - Object Name
            //   - Object Definition
            //   - Label Name
            setFormData({...formData, [name]: value});
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

        // TODO Call specific APIs

        console.log('Update');
    }

    if (isUpdating) {
        const { id: objectMasterId } = useParams();
        console.log('isUpdating. ID: ', objectMasterId);
    }

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
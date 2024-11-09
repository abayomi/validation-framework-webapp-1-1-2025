"use client";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuidv4 } from 'uuid';

import CreateObjectFields from "./createObjectFields";

const newEmptyFieldItem = () => {
    return { 
        id: uuidv4(),
        objectFieldName: '',
        fieldMasterName: ''
    };
};

const CreateObjectMaster = (props) => {
    const { location } = props
    const [formData, setFormData] = useState({
        objectName: '',
        objectDef: '',
        labelName: '',
        fieldItems: [newEmptyFieldItem()]
    });
    const isUpdating = location.pathname.includes('/updatemasterobject/object');

    const showAddMoreObjectFieldsSection = function() {
        const addOneObjectField = () => {
            const newFieldItems = [...formData.fieldItems, newEmptyFieldItem()];
            setFormData({...formData, fieldItems: newFieldItems});
        };

        const deleteOneRow = (targetRowId) => {
            const newFieldItems = formData.fieldItems.filter(item => targetRowId !== item.id);
            setFormData({...formData, fieldItems: newFieldItems});
        };

        const fieldMasterNameData = [{id: 1, name: 'One'}, {id: 2, name: 'Two'}, {id: 3, name: 'Three'}]; // TODO Replace this with real data

        const createObjectFieldsList = formData.fieldItems.map(item => (
            <CreateObjectFields
                key={item.id}
                name={item.id}
                fieldMasterNameList={ fieldMasterNameData }
                onInputChangeHandler={ handleInputChanged }
                onDeleteHandler={ () => deleteOneRow(item.id) }
            />
        ));

        return (
            <>
                <Button className="mb-3" variant="info" size="sm" onClick={ addOneObjectField }>
                    Add more object fields
                </Button>

                <Row>
                    <Form.Group as={Col} className="mb-3 col-3" controlId="objectFieldName">
                        <Form.Label>Object Field Name</Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-3" controlId="fieldMasterName">
                        <Form.Label>Field Master Name</Form.Label>
                    </Form.Group>
                </Row>

                { createObjectFieldsList }
            </>
        );
    };

    const showObjectFieldValidationSection = () => (
        <>
            <h4 className="title is-1">Object Field Validation</h4>
            <Row>
                <Form.Group className="mb-3 col-3" controlId="validationCode">
                    <Form.Label>Validation Code</Form.Label>
                    <Form.Control type="text" disabled />
                </Form.Group>

                <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeCode">
                    <Form.Label>Rule Condition Type Code</Form.Label>
                    <Form.Control type="text" disabled />
                </Form.Group>

                <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeValue">
                    <Form.Label>Rule Condition Type Value</Form.Label>
                    <Form.Control type="text" disabled />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="onoff">
                    <Form.Label>On/Off</Form.Label>
                    <Form.Check className="mb-3 col-3 ms-3" type="checkbox" id="checkbox" checked onChange={() => true} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="mb-3 col-3" controlId="validationCode">
                    <Form.Control type="text" disabled />
                </Form.Group>

                <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeCode">
                    <Form.Control type="text" disabled />
                </Form.Group>

                <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeValue">
                    <Form.Control type="text" disabled />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="onoff">
                    <Form.Check className="mb-3 col-3 ms-3" type="checkbox" id="checkbox" />
                </Form.Group>
            </Row>
        </>
    );

    const replaceFieldItem = (fieldItems, newItem) => {
        return fieldItems.map(item => 
            item.id === newItem.id ? { ...item, ...newItem } : item
        );
    }

    const handleInputChanged = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name.startsWith('fields-')) {
            // User changed an item of Object Field Name or Field Master Name
            let newItemValue = null;
            if (name.startsWith('fields-objfieldname-')) { 
                // Object Field Name
                newItemValue = {
                    id: name.replace('fields-objfieldname-', ''), // The name's format is "fields-objfieldname-<UUID string>"
                    objectFieldName: value,
                };
            } else { 
                // Field Master Name
                newItemValue = {
                    id: name.replace('fields-fieldmastername-', ''), // The name's format is "fields-fieldmastername-<UUID string>"
                    fieldMasterName: value
                };
            }
            const newFieldItems = replaceFieldItem(formData.fieldItems, newItemValue);
            setFormData({...formData, fieldItems: newFieldItems});
        } else {
            // User changed other input box: 
            //   - Object Name
            //   - Object Definition
            //   - Label Name
            setFormData({...formData, [name]: value});
        }
    };

    // React Forms, refer to https://www.w3schools.com/react/react_forms.asp
    return (
        <>
            <h2 className="title is-1">
                { isUpdating ? 'Update Object Master' : 'Create Object Master' }
            </h2>

            <Form>
                <Form.Group className="mb-3 col-4" controlId="objectName">
                    <Form.Label>Object Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="objectName"
                        value={ formData.objectName }
                        onChange={ handleInputChanged }
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-4" controlId="objectDefinition">
                    <Form.Label>Object Definition</Form.Label>
                    <Form.Control 
                        type="text"
                        name="objectDef"
                        value={ formData.objectDef }
                        onChange={ handleInputChanged }
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-4" controlId="labelName">
                    <Form.Label>Label Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="labelName"
                        value={ formData.labelName }
                        onChange={ handleInputChanged }
                    />
                </Form.Group>

                { showAddMoreObjectFieldsSection() }

                { isUpdating && showObjectFieldValidationSection() }

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={ (event) => {
                        // TODO Disable the button after user's click
                        event.preventDefault();
                        console.log('submitted', JSON.stringify(formData));
                    } }
                >Submit</Button>

                <div className="mt-4">
                    <p><b>Debug output:</b></p>
                    <div>{ JSON.stringify(formData) }</div>
                </div>
            </Form>
        </>
    );
};

export default CreateObjectMaster;
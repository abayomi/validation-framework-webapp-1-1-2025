"use client";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CreateObjectFields from "./createObjectFields";

const CreateObjectMaster = (props) => {
    const { location } = props
    const [fieldCounter, setFieldCounter] = useState(1);
    const [objectName, updateObjectName] = useState('');
    const [labelName, updateLabelName] = useState('');
    const [fieldItems, setFieldItems] = useState([{ eventKey: 1 }]);

    const createObjectFieldsInputBoxList = fieldItems.map((_, key) => (
        <CreateObjectFields
            id={key}
            eventKey={key + 1}
            deleteRow={(index) => {
                const updatedObjectFieldList = fieldItems.filter((_, i) => i !== index - 1);
                setFieldItems(updatedObjectFieldList);
            }}
        />
    ));

    return (
        <div>
            <h2 className="title is-1">
                { location.pathname.includes("/updatemasterobject/object") ? 'Update Object Master' : 'Create Object Master' }
            </h2>

            <Form>
                <Form.Group className="mb-3 col-4" controlId="objectName">
                    <Form.Label>Object Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={objectName}
                        onChange={ (e) => updateObjectName(e.target.value) }
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-4" controlId="objectDefinition">
                    <Form.Label>Object Definition</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3 col-4" controlId="labelName">
                    <Form.Label>Label Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={labelName}
                        onChange={ (e) => updateLabelName(e.target.value) }
                    />
                </Form.Group>

                <Button
                    className="mb-3"
                    variant="info"
                    size="sm"
                    onClick={() => {
                        const updatedFieldCounter = fieldCounter + 1
                        setFieldCounter(updatedFieldCounter)
                        setFieldItems((prev) => [...prev, { eventKey: updatedFieldCounter }]);
                    }}
                >Define Object Fields</Button>

                <Row>
                    <Form.Group as={Col} className="mb-3 col-3" controlId="objectFieldName">
                        <Form.Label>Object Field Name</Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 col-3" controlId="fieldMasterName">
                        <Form.Label>Field Master Name</Form.Label>
                    </Form.Group>
                </Row>

                {createObjectFieldsInputBoxList}

                <h4 className="title is-1">Object Field Validation</h4>
                <Row>
                    <Form.Group className="mb-3 col-3" controlId="validationCode">
                        <Form.Label>Validation Code</Form.Label>
                        <Form.Control type="text" placeholder="" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeCode">
                        <Form.Label>Rule Condition Type Code</Form.Label>
                        <Form.Control type="text" placeholder="" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeValue">
                        <Form.Label>Rule Condition Type Value</Form.Label>
                        <Form.Control type="text" placeholder="" disabled />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="onoff">
                        <Form.Label>On/Off</Form.Label>
                        <Form.Check className="mb-3 col-3 ms-3" type="checkbox" id="checkbox" label="" checked onChange={() => true} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3 col-3" controlId="validationCode">
                        <Form.Control type="text" placeholder="" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeCode">
                        <Form.Control type="text" placeholder="" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeValue">
                        <Form.Control type="text" placeholder="" disabled />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="onoff">
                        <Form.Check className="mb-3 col-3 ms-3" type="checkbox" id="checkbox" label="" />
                    </Form.Group>
                </Row>


                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
};

export default CreateObjectMaster;
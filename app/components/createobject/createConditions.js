"use client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CreateConditions = (props) => {
    const {deleteRow, eventKey, isUpdate, onConditionChange, item } = props

    const [condition, setCondition] = useState( item || []);

    const handleConditionChange = (e) => {
        const { name, value } = e.target;

        const updatedCondition = { ...condition, [name]: value };
        setCondition(updatedCondition);
        onConditionChange(eventKey - 1, updatedCondition);
    };

    return (
        <div>
            <Row eventKey={ eventKey }>
            <Form.Group as={Col} className="mb-3 col-3" controlId="type">
                <Form.Select aria-label="Type" name="ruleConditionTypeCode" onChange={handleConditionChange}>
                <option></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 col-3" controlId="condition">
                <Form.Control
                as="textarea"
                name="ruleConditionValue"
                placeholder=""
                style={{ height: '100px' }}
                onChange={handleConditionChange}
                />
            </Form.Group>
            <Form.Group as={Col} className="mb-3 col-3" controlId="">
                <Button className="mb-3" variant="danger" size="sm" onClick={() => deleteRow(eventKey)}>Delete</Button>
            </Form.Group>
            </Row>
        </div>
    )
};

export default CreateConditions;
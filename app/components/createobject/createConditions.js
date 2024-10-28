"use client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CreateConditions = (props) => {
    const {deleteRow, eventkey, isUpdate, onConditionChange, item } = props

    const disabled = isUpdate && item;
    const [condition, setCondition] = useState( item || []);
    const handleConditionChange = (e) => {
        const { name, value } = e.target;

        const updatedCondition = { ...condition, [name]: value };
        setCondition(updatedCondition);
        onConditionChange(eventkey - 1, updatedCondition);
    };

    return (
        <div>
            <Row eventkey={ eventkey }>
            <Form.Group as={Col} className="mb-3 col-3" controlId="type">
                <Form.Select aria-label="Type" name="type" value={condition.type} onChange={handleConditionChange} disabled={disabled}>
                <option></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 col-3" controlId="condition">
                <Form.Control
                as="textarea"
                name="value"
                value={condition.value}
                placeholder=""
                style={{ height: '100px' }}
                onChange={handleConditionChange}
                disabled={disabled}
                />
            </Form.Group>
            <Form.Group as={Col} className="mb-3 col-3" controlId="">
                <Button className="mb-3" variant="danger" size="sm" onClick={() => deleteRow(eventkey)} disabled={disabled}>Delete Condition</Button>
            </Form.Group>
            </Row>
        </div>
    )
};

export default CreateConditions;
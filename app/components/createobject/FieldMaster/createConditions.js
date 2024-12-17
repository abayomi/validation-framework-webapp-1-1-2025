"use client";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {conditionTypeOptions} from './ruleValidationCodeMap';

/**
 * Component for creating or updating conditions.
 *
 * @returns {JSX.Element} The rendered component.
 */
const CreateConditions = (props) => {
    const {eventkey, isUpdate, onConditionChange, item } = props
    const disabled = isUpdate && item.id;
    const [condition, setCondition] = useState( item || []);

    useEffect(() => {
        setCondition(item || {});
    }, [item]);

    const handleConditionChange = (e) => {
        const { name, value } = e.target;
        const updatedCondition = { ...condition, ['value']: value };
        setCondition(updatedCondition);
        onConditionChange(eventkey, updatedCondition);
    };

    return (
        <div key={eventkey}>
            <Row eventkey={ eventkey }>
            <Form.Group as={Col} className="mb-3 col-3" controlId="condition_type">
                <Form.Select data-testid="condition-type-input" name="condition_type" value={condition.type} onChange={handleConditionChange} disabled>
                {Object.entries(conditionTypeOptions).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 col-9" controlId="condition_value">
                <Form.Control
                as="textarea"
                name="condition_value"
                rows={1}
                data-testid="condition-type-value"
                defaultValue={condition.value}
                placeholder=""
                onChange={handleConditionChange}
                disabled={disabled}
                required
                />
            </Form.Group>
            </Row>
        </div>
    )
};

export default CreateConditions;
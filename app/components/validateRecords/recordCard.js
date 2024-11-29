import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import ObjectFields from './objectFields';
import { useState } from "react";

const RecordCard = ({ id, item, onChange, fieldNameList, onDelete }) => {
    const [recordItem, setRecordItem] = useState(item ?? {});
    const [fieldItems, setFieldItems] = useState(item?.fields ?? []);

    const handleRecordChange = (e) => {
        const { name, value } = e.target;
        const updateRecordItem = { ...recordItem, [name]: value };
        setRecordItem(updateRecordItem);
        onChange(id, updateRecordItem);
    };

    const updateFieldItemsState  = (updatedItem) => {
        setFieldItems(updatedItem);
        handleRecordChange({ target: { name: 'fields', value: updatedItem } });
    }

    const handleFieldChange = (index, currentFieldItem) => {
        const updateFieldItems = [...fieldItems];
        updateFieldItems[index] = currentFieldItem;
        updateFieldItemsState (updateFieldItems);
    }

    const onAddBtnClick = (event) => {
        const updateFieldItems = [...fieldItems, {}];
        updateFieldItemsState (updateFieldItems);
    };
    
    const deleteRow = (index) => {
        const updateFieldItems = [...fieldItems];
        updateFieldItems.splice(index - 1, 1);
        updateFieldItemsState (updateFieldItems);
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                <Form.Group className="mb-3 col-12 d-flex align-items-center" as={Col} controlId="recordId">
                    <Form.Label className="w-15 me-3">Record ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        className="w-25"
                        name="recordId"
                        defaultValue={recordItem.recordId ?? ''}
                        required
                        disabled
                    />
                    <Button variant="danger" size="sm" onClick={() => onDelete(id)} className="ms-auto delete-object-record col-1">
                        Delete
                    </Button>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Col xs={3}>
                        <Form.Group controlId="objectFieldName">
                            <Form.Label>Field Name</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group controlId="fieldMasterName">
                            <Form.Label>Value</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xs={6} className="d-flex align-items-end">
                        <Button variant="info" size="sm" onClick={onAddBtnClick}>Add Field</Button>
                    </Col>
                </Row>
                {fieldItems && fieldItems.map((item, key) => (
                    <ObjectFields key={key} id={key} deleteRow={deleteRow} onChange={handleFieldChange} fieldNameList={fieldNameList} item={item} />
                ))}
            </Card.Body>
        </Card>
    );
};

export default RecordCard;
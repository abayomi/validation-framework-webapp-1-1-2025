"use client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";

/**
 * Component for rendering and managing object fields.
 *
 * @returns {JSX.Element} The rendered object fields component.
 */
const ObjectFields = (props) => {
    const {deleteRow, id, item, fieldNameList, onChange} = props
    const [fieldItem, setFieldItem] = useState( item ?? []);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        const updateFieldItem = { ...fieldItem, [name]: value };
        setFieldItem(updateFieldItem);
        onChange(id, updateFieldItem);
    };

    return (
        <div className="row-object-field">
          <Row key={ id }>
                <Form.Group as={Col} className="mb-3 col-3" controlId="fieldName">
                    <Form.Select aria-label="fieldName" name="fieldName" value={fieldItem.fieldName ?? ''} onChange={handleFieldChange} required>
                    <option></option>
                        {fieldNameList.map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-3" controlId="fieldValue">
                    <Form.Control type="text" placeholder="" name="fieldValue" value={fieldItem.fieldValue ?? ''} onChange={handleFieldChange}/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 col-3" controlId="">
                    <Button className="mb-3 delete-object-field" variant="danger" size="sm" onClick={(e) => deleteRow(id)}>Delete</Button>
                </Form.Group>
            </Row>
        </div>
    )
};

export default ObjectFields;
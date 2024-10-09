"use client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CreateConditions = (props) => {
    const {deleteRow, eventKey, setDateTwo, dateTwo, isUpdate} = props
    return (
        <div>
            <Row eventKey={ eventKey }>
                <Form.Group as={Col} className="mb-3 col-3" controlId="type">
                    <Form.Select aria-label="Type">
                        <option></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-3" controlId="condition">
                    <Form.Control
                    as="textarea"
                    placeholder=""
                    style={{ height: '100px' }}
                    />
                </Form.Group>
                {isUpdate ? (
                    <Form.Group as={Col} className="mb-3 col-3" controlId="value">
                        <Form.Control
                            type="date"
                            name="datepic"
                            placeholder="DateRange"
                            value={dateTwo}
                            onChange={(e) => setDateTwo(e.target.value)}
                            disabled
                        />
                    </Form.Group>
                ) : (
                    ''
                )}
            
                
                
                <Form.Group as={Col} className="mb-3 col-3" controlId="">
                    <Button className="mb-3" variant="danger" size="sm" onClick={(e) => deleteRow(eventKey)}>Delete</Button>
                </Form.Group>
            </Row>      
        </div>
    )
};

export default CreateConditions;
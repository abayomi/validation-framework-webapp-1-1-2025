"use client";
import { useState } from "react";
import withAuth from "../withAuth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Accordion from 'react-bootstrap/Accordion';
import CreateConditions from './createConditions'


function CustomToggle({ children, eventKey, deleteOnClick }) {
  return (
    <div class="w-100">        
        <span>Rule - {eventKey}</span>
        <Button className="float-end" variant="danger" size="sm" onClick={(e) => deleteOnClick(e, eventKey)} >
            Delete
        </Button>
        
    </div> 
  );
}

const CreateRules = (props) => {
    console.log(props);
    const {id, eventKey, isUpdate, deleteOnClick} = props
    const [date, setDate] = useState(new Date());    
    const [dateTwo, setDateTwo] = useState(new Date());


    const [conditionCounter, setConditionCounter] = useState(1);    
    const [conditionItems, setConditionItems] = useState([{eventKey : 1}]);

    const onAddCondition = (event) => {
        let updatedConditionCounter = conditionCounter + 1
        setConditionCounter(updatedConditionCounter)
        setConditionItems((prev) => [...prev, {eventKey : updatedConditionCounter}]);
        console.log(conditionItems);
    };

    const deleteRow = (index) => {
        const newArr = [...conditionItems];
        newArr.splice(index - 1, 1);
        setConditionItems(newArr);
    }
    
    return (
        <div>
            <Accordion.Item eventKey={ eventKey }>
                <Accordion.Header>
                    <CustomToggle eventKey={ eventKey } deleteOnClick={ deleteOnClick }></CustomToggle>
                </Accordion.Header>
                <Accordion.Body>
                    <Row>
                        {/* <h4 className="title is-1">Rules</h4> */}
                        <Form.Group as={Col} className="mb-3" controlId="ruleGroupNumber">
                            <Form.Label>Rule group Number</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>

                    
                        <Form.Group as={Col} className="mb-3" controlId="validationCode">
                            <Form.Label>Validation code</Form.Label>
                            <Form.Select aria-label="Validation code">
                                <option></option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="validationErrorCode">
                            <Form.Label>Validation error code</Form.Label>
                            <Form.Select aria-label="Validation error code">
                                <option></option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>   

                        <Form.Group as={Col} className="mb-3" controlId="errorMessage">
                            <Form.Label>Error message</Form.Label>
                            <Form.Control type="text" placeholder="" disabled/>
                        </Form.Group>
                        {isUpdate ? (
                            <Form.Group as={Col} className="mb-3" controlId="errorMessage">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="datepic"
                                placeholder="DateRange"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                disabled
                            />
                            </Form.Group>
                        ) : (
                            ''
                        )}
                        
                        <Form.Group as={Col} className="mb-3" controlId="errorMessage">
                            <Form.Label>Mandatory rule indicator</Form.Label>
                            <center><Form.Check className="mb-3 col-3" type="checkbox" id="checkbox" label="" checked disabled={isUpdate} /></center>
                        </Form.Group>
                    </Row>

                    
                    <h4 className="title is-1">Conditions
                        <Button className="ms-3" variant="info" size="sm" onClick={onAddCondition}>Add Conditions</Button>
                    </h4>

                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="type">
                            <Form.Label>Type</Form.Label>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="condition">
                            <Form.Label>Condition</Form.Label>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="startDate">
                            <Form.Label>Start date</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3"></Form.Group>
                    </Row>

                    {conditionItems.map((item, key) => (
                        <CreateConditions isUpdate={isUpdate} id="0" eventKey={key + 1} dateTwo={dateTwo} deleteRow={deleteRow} setDateTwo={setDateTwo} />
                    ))} 

                </Accordion.Body>
            </Accordion.Item>
        </div>
       
    )
};

export default CreateRules;
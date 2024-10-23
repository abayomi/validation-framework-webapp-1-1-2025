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
    <div className="w-100">        
        <span>Rule - {eventKey}</span>
        <Button className="float-end" variant="danger" size="sm" onClick={(e) => deleteOnClick(e, eventKey)} >
            Delete
        </Button>
        
    </div> 
  );
}

const CreateRules = ({ id, eventKey, isUpdate, deleteOnClick, onRuleChange, item }) => {
   
    const [rule, setRule] = useState({
            ...item,
            condition: item?.condition || []
    });


    const [conditionCounter, setConditionCounter] = useState(0);    
    const [conditionItems, setConditionItems] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedRule = { ...rule, [name]: value };
        setRule(updatedRule);
        onRuleChange(eventKey - 1, updatedRule);
    };

    const handleConditionChange = (index, updatedCondition) => {
        const updatedConditions = [...rule.condition];
        updatedConditions[index] = updatedCondition;
      
        const updatedRule = { ...rule, condition: updatedConditions };
        setRule(updatedRule);
        onRuleChange(eventKey - 1, updatedRule);
      };

    const onAddCondition = (event) => {
        let updatedConditionCounter = conditionCounter + 1
        setConditionCounter(updatedConditionCounter)
        setConditionItems((prev) => [...prev, {}]);
    };

    const deleteRow = (index) => {
        const newConditions = [...conditionItems];
        newConditions.splice(index - 1, 1);
        setConditionItems(newConditions);
        const updatedRule = { ...rule, condition: newConditions };
        setRule(updatedRule);
        onRuleChange(eventKey - 1, updatedRule);
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
                            <Form.Control type="text" name="ruleGroupNumber" placeholder="" onChange={handleChange}/>
                        </Form.Group>

                    
                        <Form.Group as={Col} className="mb-3" controlId="validationRuleCode">
                            <Form.Label>Validation code</Form.Label>
                            <Form.Select aria-label="Validation code" name="validationRuleCode" onChange={handleChange}>
                                <option></option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                                <option value="5">Five</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="validationErrorCode">
                            <Form.Label>Validation error code</Form.Label>
                            <Form.Select aria-label="Validation error code" name="validationErrorCode" onChange={handleChange}>
                                <option></option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                                <option value="5">Five</option>
                            </Form.Select>
                        </Form.Group>   

                        <Form.Group as={Col} className="mb-3" controlId="errorMessage">
                            <Form.Label>Error message</Form.Label>
                            <Form.Control type="text" placeholder="" disabled/>
                        </Form.Group>
                        
                        <Form.Group as={Col} className="mb-3" controlId="errorMessage">
                            <Form.Label>Mandatory rule indicator</Form.Label>
                            <center><Form.Check className="mb-3 col-3" type="checkbox" id="checkbox" name="mandatoryRuleInd" label="" onChange={handleChange}/></center>
                        </Form.Group>
                    </Row>

                    
                    <h4 className="title is-1">Conditions
                        <Button className="ms-3" variant="info" size="sm" onClick={onAddCondition}>Add Conditions</Button>
                    </h4>

                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="type">
                            <Form.Label>Type</Form.Label>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-2" controlId="condition">
                            <Form.Label>Condition</Form.Label>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-1" controlId="condition">
                            <Form.Label></Form.Label>
                        </Form.Group>
                    </Row>

                    {conditionItems.map((item, key) => (
                        <CreateConditions isUpdate={isUpdate} id={key} eventKey={key + 1} deleteRow={deleteRow} onConditionChange={handleConditionChange} item={item}/>
                    ))} 

                </Accordion.Body>
            </Accordion.Item>
        </div>
       
    )
};

export default CreateRules;
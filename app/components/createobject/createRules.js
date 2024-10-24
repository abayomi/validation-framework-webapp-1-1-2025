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

    const disabled = isUpdate && item;
    const [rule, setRule] = useState({
            ...item,
            conditions: item?.conditions || []
    });
    const [conditionCounter, setConditionCounter] = useState(0);    
    const [conditionItems, setConditionItems] = useState(item?.conditions || []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedRule = { ...rule, [name]: value };
        setRule(updatedRule);
        onRuleChange(eventKey - 1, updatedRule);
    };

    const handleConditionChange = (index, updatedCondition) => {
        const updatedConditions = [...rule.conditions];
        updatedConditions[index] = updatedCondition;
      
        const updatedRule = { ...rule, conditions: updatedConditions };
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
        const updatedRule = { ...rule, conditions: newConditions };
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
                    
                        <Form.Group as={Col} className="mb-3" controlId="validationRuleCode">
                            <Form.Label>Validation code</Form.Label>
                            <Form.Select aria-label="Validation code" name="type" value={rule.type} onChange={handleChange} disabled={disabled}>
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
                            <Form.Select aria-label="Validation error code" name="errorCode" value={rule.errorCode} onChange={handleChange} disabled={disabled}>
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
                            <Form.Control type="text" value={rule.errorMessage} placeholder="" disabled/>
                        </Form.Group>
                        
                        <Form.Group as={Col} className="mb-3" controlId="ruleGroupNumber">
                            <Form.Label>Rule group Number</Form.Label>
                            <Form.Control type="text" name="ruleGroupNumber" value={rule.ruleGroupNumber} placeholder="" onChange={handleChange} disabled={disabled}/>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="errorMessage">
                            <Form.Label>Mandatory rule indicator</Form.Label>
                            <center><Form.Check className="mb-3 col-3" type="checkbox" id="checkbox" name="mandatoryRuleInd" label="" onChange={handleChange} disabled={disabled}/></center>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="shortDescription0">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="text" name="shortDescription0" value={rule.shortDescription0} placeholder="" onChange={handleChange} disabled={disabled}/>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="longDescription0">
                            <Form.Label>Long Description</Form.Label>
                            <Form.Control type="text" name="longDescription0" value={rule.longDescription0} placeholder="" onChange={handleChange} disabled={disabled}/>
                        </Form.Group>
                    </Row>
                    <h4 className="title is-1">Conditions
                        <Button className="ms-3" variant="info" size="sm" onClick={onAddCondition} disabled={disabled}>Add Conditions</Button>
                    </h4>

                    {conditionItems.map((condition, key) => (
                        <CreateConditions isUpdate={isUpdate} id={key} eventKey={key + 1} deleteRow={deleteRow} onConditionChange={handleConditionChange} item={condition}/>
                    ))} 

                </Accordion.Body>
            </Accordion.Item>
        </div>
       
    )
};

export default CreateRules;
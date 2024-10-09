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
import CreateObjectFields from "./createObjectFields";

function CustomToggle({ children, eventKey }) {
  return (
      "Field - " + eventKey
  );
}



const CreateObjectMaster = ( props ) => {
  const { location } = props
  const isUpdate = Boolean(location.pathname === ("/updatemasterobject/object" ||"/updatemasterobject/field"));
  const [fieldCounter, setFieldCounter] = useState(1);    
  const [objectName, updateObjectName] = useState("");    
  const [labelName, updateLabelName] = useState("");    
  const [isLabelNameModified, modifyLabelName] = useState(false);  
  const [fieldItems, setFieldItems] = useState([{eventKey : 1}]);

  const onAddBtnClick = (event) => {
    let updatedFieldCounter = fieldCounter + 1
    setFieldCounter(updatedFieldCounter)
    setFieldItems((prev) => [...prev, {eventKey : updatedFieldCounter}]);
    console.log(fieldItems);
  };

  const changeObjectName = (data) => {
    updateObjectName(data)
    if(!isLabelNameModified) {
        updateLabelName(data)
    }
  }
  const changeLabelName = (data) => {
    modifyLabelName(true)
    updateLabelName(data)
  }

  const deleteRow = (index) => {
    const newArr = [...fieldItems];
    newArr.splice(index - 1, 1);
    setFieldItems(newArr);
  }


  return (
    <div>
        {isUpdate ? (
            <h2 className="title is-1">Update Object Master</h2>
        ) : (
            <h2 className="title is-1">Create Object Master</h2>
        )}
      
      <Form>
        <Form.Group className="mb-3 col-4" controlId="objectName">
            <Form.Label>Object name</Form.Label>
            <Form.Control type="text" placeholder="" value={objectName} onChange={(e) => changeObjectName(e.target.value)}/>
        </Form.Group>
        
        <Form.Group className="mb-3 col-4" controlId="objectDefinition">
            <Form.Label>Object definition</Form.Label>
            <Form.Control type="text" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3 col-4" controlId="labelName">
            <Form.Label>Label name</Form.Label>
            <Form.Control type="text" placeholder="" value={labelName} onChange={(e) => changeLabelName(e.target.value)}/>
        </Form.Group>
        
        <Button className="mb-3" variant="info" size="sm" onClick={onAddBtnClick}>Define Object Fields</Button>

        <Row>
            <Form.Group as={Col} className="mb-3 col-3" controlId="objectFieldName">
                <Form.Label>Object Field Name</Form.Label>
            </Form.Group>

            <Form.Group as={Col} className="mb-3 col-3" controlId="fieldMasterName">
                <Form.Label>Field Master Name</Form.Label>
            </Form.Group>
        </Row>
        {fieldItems.map((item, key) => (
            <CreateObjectFields id="0" eventKey={key + 1} deleteRow={deleteRow} />
        ))} 

        <h4 className="title is-1">Object field Validation</h4>
        <Row>
            <Form.Group className="mb-3 col-3" controlId="validationCode">
                <Form.Label>Validation Code</Form.Label>
                <Form.Control type="text" placeholder="" disabled />
            </Form.Group>
            
            <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeCode">
                <Form.Label>Rule condition type code</Form.Label>
                <Form.Control type="text" placeholder="" disabled />
            </Form.Group>

            <Form.Group className="mb-3 col-3" controlId="ruleConditionTypeValue">
                <Form.Label>Rule condition type value</Form.Label>
                <Form.Control type="text" placeholder="" disabled />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="onoff">
                <Form.Label>On/Off</Form.Label>
                <Form.Check className="mb-3 col-3 ms-3" type="checkbox" id="checkbox" label="" checked />
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
        
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
};

export default CreateObjectMaster;
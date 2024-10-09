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
import CreateRules from "./createRules";

function CustomToggle({ children, eventKey }) {
  return (
      "Field - " + eventKey
  );
}

const CreateFieldMasterObject = ( props ) => {
  const { location } = props
  const isUpdate = Boolean(location.pathname === ("/updatemasterobject/object" ||"/updatemasterobject/field"));
  const [fieldCounter, setFieldCounter] = useState(0);  
  const [fieldItems, setFieldItems] = useState([{eventKey : 0}]);

  const onAddBtnClick = (event) => {
    setFieldItems((prev) => [...prev, {eventKey : fieldCounter}]);
    setFieldCounter(fieldCounter + 1)
    console.log(fieldCounter);    
    console.log(fieldItems);
  };

  const deleteOnClick = (e, index) => {
    console.log(e);
    e.stopPropagation();
    const newArr = [...fieldItems];
        newArr.splice(index - 1, 1);
        setFieldItems(newArr);
  };

  return (
    <div>
        {isUpdate ? (
            <h2 className="title is-1">Update Field Master</h2>
        ) : (
            <h2 className="title is-1">Create Field Master</h2>
        )}
      
      <Form>
          <Form.Group className="mb-3 col-3" as={Col} controlId="fieldName">
            <Form.Label>Field Name</Form.Label>
            <Form.Control type="text" placeholder="" disabled={isUpdate}/>
          </Form.Group>
          <Form.Group className="mb-3 col-3" as={Col} controlId="fieldDefinition">
            <Form.Label>Field Definition</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <Form.Check className="mb-3 col-3" 
            type="checkbox"
            id="default-checkbox"
            label="Enterprise field indicator"
          />
        
        <Button className="mb-3" variant="info" size="sm" onClick={onAddBtnClick}>Add Rules</Button>
        <Accordion className="mb-3" defaultActiveKey="0" flush>
            {fieldItems.map((item, key) => (
            <CreateRules eventKey={key + 1} isUpdate={isUpdate} deleteOnClick={deleteOnClick} />
            ))}
        </Accordion>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
};

export default CreateFieldMasterObject;
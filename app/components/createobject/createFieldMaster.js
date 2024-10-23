"use client";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import CreateRules from "./createRules";

import {gql, useMutation} from '@apollo/client';

function CustomToggle({ children, eventKey }) {
  return (
      "Field - " + eventKey
  );
}
const CREATE_ENTERPRISE_FIELD = gql`
  mutation CreateEnterpriseField(
    $fieldName: String!
    $fieldDefinition: String!
    $dialectCode: DialectCodes!
    $fieldMasterInUseInd: Boolean!
    $enterpriseFieldInd: Boolean!
    $rule: FieldMasterRule
  ) {
    CreateEnterpriseField(field: {
      dialectCode: $dialectCode, 
      enterpriseFieldInd: $enterpriseFieldInd, 
      fieldDefinition: $fieldDefinition, 
      fieldMasterInUseInd: $fieldMasterInUseInd, 
      fieldName: $fieldName
      rule: $rule
    }) {
      fieldMasterId
      fieldName
    }
  }
`;

const CreateFieldMasterObject = ( props ) => {
  
  const { location } = props
  const isUpdate = Boolean(location.pathname === "/updatemasterobject/object" || location.pathname === "/updatemasterobject/field");
  const [fieldCounter, setFieldCounter] = useState(0);  
  const [ruleItems, setRuleItems] = useState([]);

  const [formData, setFormData] = useState({
    enterpriseFieldInd: false,
    fieldMasterInUseInd: false,
  });
  const [createEnterpriseField, { data, loading, error }] = useMutation(CREATE_ENTERPRISE_FIELD);

  const onAddBtnClick = (event) => {
    setRuleItems((prev) => [...prev, {0 : fieldCounter}]);
    setFieldCounter(fieldCounter + 1)
    console.log(fieldCounter);    
    console.log(ruleItems);
  };

  const deleteOnClick = (e, index) => {
    console.log(e);
    e.stopPropagation();
    const newArr = [...ruleItems];
        newArr.splice(index - 1, 1);
        setRuleItems(newArr);
  };

  const handleRuleChange = (index, newRule) => {
    const updatedRules = [...ruleItems];
    updatedRules[index] = newRule;
    setRuleItems(updatedRules);
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const variables = {
        dialectCode: formData.dialectCode,
        fieldName: formData.fieldName,
        fieldDefinition: formData.fieldDefinition,
        enterpriseFieldInd: formData.enterpriseFieldInd,
        fieldMasterInUseInd: formData.fieldMasterInUseInd,
      };

      if (ruleItems.length > 0) {
        const rules = ruleItems.map(item => {
          const rule = {
            validationRuleCode: item.validationRuleCode,
            validationErrorCode: item.validationErrorCode,
            mandatoryRuleInd: 'true',
            description: {
              shortDescription: "short",
              longDescription: "long"
            },
            ruleGroupNumber: item.ruleGroupNumber
          };

          if (item.condition && item.condition.length > 0) {
              rule.condition = item.condition;
          }

          return rule;
        });
        variables.rule = rules[0];
      }
      console.log(variables);
      await createEnterpriseField({
        variables,
      });
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
        {isUpdate ? (
            <h2 className="title is-1">Update Field Master</h2>
        ) : (
            <h2 className="title is-1">Create Field Master</h2>
        )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 col-3" as={Col} controlId="dialectCode">
          <Form.Label>Dialect code</Form.Label>
          <Form.Select aria-label="Dialect code" value={formData.dialectCode} onChange={handleInputChange}>
            <option value=""></option>
            <option value="us_en">us_en</option>
            <option value="ca_en">ca_en</option>
            <option value="ca_fr">ca_fr</option>
            <option value="gb_en">gb_en</option>
            <option value="mx_es">mx_es</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-3" as={Col} controlId="fieldName">
          <Form.Label>Field Name</Form.Label>
          <Form.Control type="text" placeholder="" value={formData.fieldName} onChange={handleInputChange} disabled={isUpdate} />
        </Form.Group>
        <Form.Group className="mb-3 col-3" as={Col} controlId="fieldDefinition">
          <Form.Label>Field Definition</Form.Label>
          <Form.Control type="text" placeholder="" value={formData.fieldDefinition} onChange={handleInputChange} />
        </Form.Group>
        <Form.Check className="mb-3 col-3" 
          type="checkbox"
          id="enterpriseFieldInd"
          label="Enterprise field indicator"
          checked={formData.enterpriseFieldInd}
          onChange={handleInputChange}
        />
        <Form.Check className="mb-3 col-3" 
          type="checkbox"
          id="fieldMasterInUseInd"
          label="Field Master InUse indicator"
          checked={formData.fieldMasterInUseInd}
          onChange={handleInputChange}
        />
        <Button className="mb-3" variant="info" size="sm" onClick={onAddBtnClick}>Add Rules</Button>
        <Accordion className="mb-3" defaultActiveKey="0" flush>
            {ruleItems.map((item, key) => (
            <CreateRules 
              id={key + 1}
              eventKey={key + 1} 
              isUpdate={false} 
              deleteOnClick={deleteOnClick}
              onRuleChange={handleRuleChange}
              item={item} />
            ))}
        </Accordion>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {loading && <p>Submitting...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <><p>Field Master added successfully!</p><p>{JSON.stringify(data)}</p></>}
    </div>
  )
};

export default CreateFieldMasterObject;
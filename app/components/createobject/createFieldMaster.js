"use client";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import CreateRules from "./FieldMaster/createRules";
import { useNavigate } from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';
import { dialectCodeOptions } from "../config/dialectCodeMap";

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
      fieldDefinition
    }
  }
`;

const CreateFieldMasterObject = ( props ) => {
  const { location } = props
  const isUpdate = Boolean(location.pathname === "/updatemasterobject/object" || location.pathname === "/updatemasterobject/field");
  const navigate = useNavigate();
  const emptyFormData = {
    fieldMasterId: '',
    enterpriseFieldInd: false,
    fieldMasterInUseInd: false,
    fieldName:'',
    fieldDefinition:'',
    dialectCode:'',
  };
  const [formData, setFormData] = useState(emptyFormData); 
  const [ruleItems, setRuleItems] = useState([]);

  useEffect(() => {
    if (isUpdate && location.state) {
      const fieldData = location.state.fieldData;
      if (!fieldData) {
        return ;
      }
      setFormData(fieldData);

      if (fieldData.rules) {
        const valid_rules = fieldData.rules.filter(rule => {
          if (rule.id) {
              return rule;
          }
        });
        setRuleItems(valid_rules);
      }
    }
    if (!isUpdate) {
      setFormData(emptyFormData);
      setRuleItems([]);
    }
  }, [isUpdate, location.state]);
  const [ruleCounter, setRuleCounter] = useState(0);
  const [createEnterpriseField, { data, loading, error }] = useMutation(CREATE_ENTERPRISE_FIELD);

  const onAddBtnClick = (event) => {
    setRuleItems((prev) => [...prev, []]);
    setRuleCounter(ruleCounter + 1);  
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

      console.log(variables);
      const response = await createEnterpriseField({
        variables,
      });
      const newData = response.data['CreateEnterpriseField'][0];
      const newFieldMaster = { 
        'fieldMasterId': newData.fieldMasterId,
        'fieldName': newData.fieldName,
        'enterpriseFieldInd': variables.enterpriseFieldInd,
        'fieldMasterInUseInd': variables.fieldMasterInUseInd,
        'fieldDefinition': newData.fieldDefinition,
        'rules':[],
      };
      navigate(`/updatemasterobject/field`, { state: { fieldData: newFieldMaster } });
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
        <Form.Group className="mb-3 col-3" as={Col} controlId="fieldMasterId">
          <Form.Label>Field Master ID</Form.Label>
          <Form.Control type="text" placeholder="" value={formData.fieldMasterId} disabled/>
        </Form.Group>
        <Form.Group className="mb-3 col-3" as={Col} controlId="dialectCode">
          <Form.Label>Dialect code</Form.Label>
          <Form.Select aria-label="Dialect code" value={formData.dialectCode} onChange={handleInputChange} disabled={isUpdate} required>
            <option value=""></option>
            {Object.entries(dialectCodeOptions).map(([key, value]) => (
                <option key={value} value={value}>{value}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-3" as={Col} controlId="fieldName">
          <Form.Label>Field Name</Form.Label>
          <Form.Control type="text" placeholder="" value={formData.fieldName} onChange={handleInputChange} disabled={isUpdate} required/>
        </Form.Group>
        <Form.Group className="mb-3 col-10" as={Col} controlId="fieldDefinition">
          <Form.Label>Field Definition</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="" value={formData.fieldDefinition} onChange={handleInputChange} disabled={isUpdate} required/>
        </Form.Group>
        <Form.Check className="mb-3 col-10" id="enterpriseFieldInd">
          <Form.Check.Input type="checkbox" className="custom-check-border" checked={formData.enterpriseFieldInd} onChange={handleInputChange} disabled={isUpdate}/>
          <Form.Check.Label>Enterprise field indicator</Form.Check.Label>
        </Form.Check>
        <Form.Check className="mb-3 col-10" id="fieldMasterInUseInd">
          <Form.Check.Input type="checkbox" className="custom-check-border" checked={formData.fieldMasterInUseInd} onChange={handleInputChange} disabled={isUpdate}/>
          <Form.Check.Label>Field Master InUse indicator</Form.Check.Label>
        </Form.Check>
        {isUpdate && <Button className="mb-3" variant="info" size="sm" onClick={onAddBtnClick}>Add Rules</Button>}
        <Accordion className="mb-3" defaultActiveKey="0" flush>
        {ruleItems.map((item, index) => {
            return (
              <CreateRules
                eventkey={item.id ?? '0'} 
                isUpdate={isUpdate} 
                deleteOnClick={deleteOnClick}
                onRuleChange={handleRuleChange}
                item={item} 
                fieldMasterId={formData.fieldMasterId}/>
            );
          })}
        </Accordion>

        {!isUpdate && <Button variant="primary" type="submit">
          Submit
        </Button>}
      </Form>
      {loading && <p>Submitting...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <><p>Field Master added successfully!</p></>}
    </div>
  )
};

export default CreateFieldMasterObject;
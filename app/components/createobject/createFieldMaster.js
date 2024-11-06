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
import { uniqueRecords } from "../../lib/arrayHelper";
import {CREATE_ENTERPRISE_FIELD, REMOVE_RULE_FROM_ENTERPRISE_FIELD} from "../../graphql/filedmasterMutations";

const CreateFieldMasterObject = ( props ) => {
  const { location } = props
  const isUpdate = Boolean(location.pathname === "/updatemasterobject/object" || location.pathname === "/updatemasterobject/field");
  const navigate = useNavigate();
  const emptyFormData = {
    fieldMasterId: '',
    enterpriseFieldInd: false,
    fieldMasterInUseInd: true,
    fieldName:'',
    fieldDefinition:'',
    dialectCode:'us_en',
  };
  const [formData, setFormData] = useState(emptyFormData); 
  const [ruleItems, setRuleItems] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [createEnterpriseField, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_ENTERPRISE_FIELD);
  const [removeRuleFromEnterpriseField, { data: removeData, loading: removeLoading, error: removeError }] = useMutation(REMOVE_RULE_FROM_ENTERPRISE_FIELD);

  useEffect(() => {
    if (isUpdate && location.state) {
      const fieldData = location.state.fieldData;
      if (!fieldData) {
        return ;
      }
      setFormData(fieldData);

      if (fieldData.rules) {
        const valid_rules = uniqueRecords(fieldData.rules);
        setRuleItems(valid_rules);
      }
    }
    if (!isUpdate) {
      setFormData(emptyFormData);
      setRuleItems([]);
    }
  }, [isUpdate, location.state]);

  useEffect(() => {
    if (removeData) {
      const { RemoveRuleFromEnterpriseField } = removeData;
      if (RemoveRuleFromEnterpriseField.status && deleteId) {
          alert(`Deleted successfully: ${deleteId}`);
          const newArr = ruleItems.filter(item => item.id !== deleteId);
          setRuleItems(newArr);
          setDeleteId(null);
      }
    }
  }, [removeData, removeError]);
  

  const onAddBtnClick = (event) => {
    setRuleItems((prev) => [...prev, {'id':0}]);  
    console.log(ruleItems);
  };

  const deleteOnClick = async (e, index) => {
    console.log(index);
    e.stopPropagation();
    if (index > 0) {
      const userConfirmed = window.confirm("Are you sure you want to delete this rule?");
    
      if (!userConfirmed) {
        return;
      }

      const variables = {
        field_valid_rule_id: index,
      };
  
      console.log(variables);
      setDeleteId(index);
      const response = await removeRuleFromEnterpriseField({
        variables,
      });
      if (!response['data']) {
        alert(response);
      }
      return ;
    }

    const newArr = ruleItems.filter(item => item.id !== index);
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
      alert("Added successfully");
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
          <Form.Label>Dialect Code</Form.Label>
          <Form.Select aria-label="Dialect code" value={formData.dialectCode} onChange={handleInputChange} disabled={isUpdate} required>
            <option value=""></option>
            {Object.entries(dialectCodeOptions).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-10" as={Col} controlId="fieldName">
          <Form.Label>Field Name</Form.Label>
          <Form.Control type="text" placeholder="" value={formData.fieldName} onChange={handleInputChange} disabled={isUpdate} required/>
        </Form.Group>
        <Form.Group className="mb-3 col-10" as={Col} controlId="fieldDefinition">
          <Form.Label>Field Definition</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="" value={formData.fieldDefinition} onChange={handleInputChange} disabled={isUpdate} required/>
        </Form.Group>
        <Form.Check className="mb-3 col-10" id="enterpriseFieldInd">
          <Form.Check.Input type="checkbox" className="custom-check-border" checked={formData.enterpriseFieldInd} onChange={handleInputChange} disabled={isUpdate}/>
          <Form.Check.Label>Enterprise Field Indicator</Form.Check.Label>
        </Form.Check>
        <Form.Check className="mb-3 col-10" id="fieldMasterInUseInd">
          <Form.Check.Input type="checkbox" className="custom-check-border" checked={formData.fieldMasterInUseInd} onChange={handleInputChange} disabled={isUpdate}/>
          <Form.Check.Label>Field Master In-Use Indicator</Form.Check.Label>
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
      {createLoading && <p>Submitting...</p>}
      {createError && <p>Error: {createError.message}</p>}
      {createData && <><p>Field Master added successfully!</p></>}
    </div>
  )
};

export default CreateFieldMasterObject;
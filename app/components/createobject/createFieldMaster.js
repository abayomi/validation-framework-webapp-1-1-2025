"use client";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import CreateRules from "./FieldMaster/createRules";
import { useNavigate } from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';

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
    enterpriseFieldInd: false,
    fieldMasterInUseInd: false,
    fieldName:'',
    fieldDefinition:'',
  };
  const [formData, setFormData] = useState(emptyFormData); 
  const [ruleItems, setRuleItems] = useState([]);

  useEffect(() => {
    if (isUpdate && location.state) {
      const fieldData = location.state.fieldData;
      if (!fieldData) {
        return ;
      }
      console.log(fieldData);
      setFormData(fieldData);
      if (fieldData.rules) {
        setRuleItems(fieldData.rules);
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

      if (ruleItems.length > 0) {
        const rules = ruleItems.map(item => {
          const rule = {
            validationRuleCode: item.type,
            validationErrorCode: item.errorCode,
            mandatoryRuleInd: 'true',
            description: {
              shortDescription: item.shortDescription0,
              longDescription: item.longDescription0 || '',
            },
            ruleGroupNumber: item.ruleGroupNumber
          };

          if (item.conditions && item.conditions.length > 0) {
              rule.condition = item.conditions.map(condition => {
                  return {
                    ruleConditionTypeCode: condition.type,
                    ruleConditionValue: condition.value,
                  }
              });
          }

          return rule;
        });
        variables.rule = rules[0];
      }
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
            <option value="us_en">us_en</option>
            <option value="ca_en">ca_en</option>
            <option value="ca_fr">ca_fr</option>
            <option value="gb_en">gb_en</option>
            <option value="mx_es">mx_es</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-3" as={Col} controlId="fieldName">
          <Form.Label>Field Name</Form.Label>
          <Form.Control type="text" placeholder="" value={formData.fieldName} onChange={handleInputChange} disabled={isUpdate} required/>
        </Form.Group>
        <Form.Group className="mb-3 col-3" as={Col} controlId="fieldDefinition">
          <Form.Label>Field Definition</Form.Label>
          <Form.Control type="text" placeholder="" value={formData.fieldDefinition} onChange={handleInputChange} disabled={isUpdate} required/>
        </Form.Group>
        <Form.Check className="mb-3 col-3" 
          type="checkbox"
          id="enterpriseFieldInd"
          label="Enterprise field indicator"
          checked={formData.enterpriseFieldInd}
          onChange={handleInputChange}
          disabled={isUpdate}
        />
        <Form.Check className="mb-3 col-3" 
          type="checkbox"
          id="fieldMasterInUseInd"
          label="Field Master InUse indicator"
          checked={formData.fieldMasterInUseInd}
          onChange={handleInputChange}
          disabled={isUpdate}
        />
        {isUpdate && <Button className="mb-3" variant="info" size="sm" onClick={onAddBtnClick}>Add Rules</Button>}
        <Accordion className="mb-3" defaultActiveKey="0" flush>
        {ruleItems.map((item, index) => {
            return (
              <CreateRules
                eventkey={index + 1} 
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
      {data && <><p>Field Master added successfully!</p><p>{JSON.stringify(data)}</p></>}
    </div>
  )
};

export default CreateFieldMasterObject;
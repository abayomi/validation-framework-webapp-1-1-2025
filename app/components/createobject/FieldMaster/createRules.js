"use client";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Accordion from 'react-bootstrap/Accordion';
import CreateConditions from './createConditions';
import {validationCodeOptions, getErrorCodeOptions, errorMessageOptions} from './ruleValidationCodeMap';

import {gql, useMutation} from '@apollo/client';

const ADD_RULE_TO_ENTERPRISE_FIELD = gql`
  mutation AddRuleToEnterpriseField(
    $fieldMasterId: ID!
    $dialectCode: DialectCodes!
    $validationRuleCode: ID!
    $validationErrorCode: ID!
    $mandatoryRuleInd: Boolean!
    $description: FieldMasterRuleDescription!
    $ruleGroupNumber: Int!
  ) {
    AddRuleToEnterpriseField(rule: {
      fieldMasterId: $fieldMasterId, 
      dialectCode: $dialectCode, 
      validationRuleCode: $validationRuleCode, 
      validationErrorCode: $validationErrorCode, 
      mandatoryRuleInd: $mandatoryRuleInd
      description: $description
      ruleGroupNumber: $ruleGroupNumber
    }) {
      fieldMasterId
      rules
    }
  }
`;

function CustomToggle({ id, eventkey, hidden, deleteOnClick, submitOnClick }) {
    const decoratedOnClick = useAccordionButton(eventkey);

    return (
        <div className="d-flex justify-content-between align-items-center w-100 p-2">
            <div className="d-flex align-items-center">
                <span onClick={decoratedOnClick} style={{ cursor: 'pointer' }}>
                    Rule - {id ? id : 0}
                </span>
                <Button variant="success" size="sm" onClick={(e) => submitOnClick(e, eventkey)} className="ms-3" hidden={hidden}>
                    Submit
                </Button>
            </div>
            <Button variant="danger" size="sm" onClick={(e) => deleteOnClick(e, eventkey)}>
                Delete
            </Button>
        </div>
    );
}

const CreateRules = ({ eventkey, isUpdate, deleteOnClick, onRuleChange, item, fieldMasterId = 0 }) => {
    console.log("============================CreateRules====", item);
    const disabled = isUpdate && item.id > 0;
    const [rule, setRule] = useState({
            ...item,
            conditions: item?.conditions || []
    });
    const [conditionCounter, setConditionCounter] = useState(0);
    const [conditionItems, setConditionItems] = useState(item?.conditions || []);
    const [addRuleToEnterpriseField, { data, loading, error }] = useMutation(ADD_RULE_TO_ENTERPRISE_FIELD);
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedRule = { ...rule, [name]: value };

        if (name === 'type') {
            const errorCodes = getErrorCodeOptions(value);
            updatedRule = { ...updatedRule, errorCode: errorCodes[0] };
        }
        setRule(updatedRule);
        onRuleChange(eventkey - 1, updatedRule);
    };

    const handleSubmit = async (e) => {
        console.log("==========================handleSubmit===="), e;
        e.preventDefault();
        try {
          const variables = {
            fieldMasterId: fieldMasterId,
            dialectCode: "us_en",
            validationRuleCode: rule.type,
            validationErrorCode: rule.errorCode,
            mandatoryRuleInd: rule.mandatoryRuleInd,
            description: {
                shortDescription: rule.shortDescription || 'test',
                longDescription: rule.longDescription || '',
              },
            ruleGroupNumber: rule.ruleGroupNumber,
          };
    
          console.log(variables);
          const response = await addRuleToEnterpriseField({
            variables,
          });
          console.log("==============================response=========", response);

        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };

    const handleConditionChange = (index, updatedCondition) => {
        const updatedConditions = [...rule.conditions];
        updatedConditions[index] = updatedCondition;
      
        const updatedRule = { ...rule, conditions: updatedConditions };
        setRule(updatedRule);
        onRuleChange(eventkey - 1, updatedRule);
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
        onRuleChange(eventkey - 1, updatedRule);
    }

    return (
        <div>
            <Accordion.Item eventkey={ eventkey }>
            <CustomToggle id={rule.id} eventkey={eventkey} hidden={disabled} deleteOnClick={deleteOnClick} submitOnClick={handleSubmit}/>
            <Accordion.Collapse eventKey={eventkey}>  
            <div className="p-2">
                <Row>
                    {/* <h4 className="title is-1">Rules</h4> */}
                
                    <Form.Group as={Col} xs={3} className="mb-3" controlId="validationRuleCode">
                        <Form.Label>Validation Code</Form.Label>
                            <Form.Select aria-label="Validation code" name="type" value={rule.type} onChange={handleChange} disabled={disabled} required>
                                <option></option>
                                {Object.entries(validationCodeOptions).map(([key, value]) => (
                                    <option key={key} value={key}>{value}</option>
                                ))}
                            </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" xs={6} controlId="errorCode">
                        <Form.Label>Validation Error Code</Form.Label>
                        <Form.Select aria-label="Validation errorMessage" name="type" value={rule.errorCode} onChange={handleChange} disabled={disabled} required>
                        {getErrorCodeOptions(rule.type).map((key) => (
                        <option key={key} value={key}>
                            {errorMessageOptions[key]}
                        </option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group as={Col} className="mb-3" controlId="ruleGroupNumber">
                        <Form.Label>Rule Group Number</Form.Label>
                        <Form.Control type="text" name="ruleGroupNumber" value={rule.ruleGroupNumber} placeholder="" onChange={handleChange} disabled={disabled} required/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" xs={2} controlId="errorMessage">
                        <Form.Label>Mandatory Rule Indicator</Form.Label>
                        <center>
                            <Form.Check className="mb-3 col-3" type="checkbox" id="mandatoryRuleInd" 
                            name="mandatoryRuleInd" label="" onChange={handleChange} value={rule.mandatoryRuleInd} disabled={disabled}/>
                        </center>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" xs={4} controlId="shortDescription">
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control type="text" name="shortDescription" value={rule.shortDescription} placeholder="" onChange={handleChange} disabled={disabled} required/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="longDescription">
                        <Form.Label>Long Description</Form.Label>
                        <Form.Control type="text" name="longDescription" value={rule.longDescription} placeholder="" onChange={handleChange} disabled={disabled}/>
                    </Form.Group>
                </Row>
                <h4 className="title is-1">Conditions
                    <Button className="ms-3" variant="info" size="sm" onClick={onAddCondition} disabled={disabled}>Add Conditions</Button>
                </h4>

                {conditionItems.map((condition, key) => (
                    <CreateConditions isUpdate={isUpdate} id={key} eventkey={key + 1} deleteRow={deleteRow} onConditionChange={handleConditionChange} item={condition}/>
                ))}
            </div>
            </Accordion.Collapse>
            </Accordion.Item>
        </div>
       
    )
};

export default CreateRules;
"use client";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Accordion from 'react-bootstrap/Accordion';
import CreateConditions from './createConditions';
import {validationCodeOptions, getErrorCodeOptions, errorMessageOptions} from './ruleValidationCodeMap';

import {useMutation} from '@apollo/client';

import {ADD_RULE_TO_ENTERPRISE_FIELD} from '../../../graphql/addRuleToEnterpriseField';

function CustomToggle({ eventkey, hidden, deleteOnClick, submitOnClick }) {

    const decoratedOnClick = useAccordionButton(eventkey);

    return (
        <div className="d-flex justify-content-between align-items-center w-100 p-2">
            <div className="d-flex align-items-center">
                <span onClick={decoratedOnClick} style={{ cursor: 'pointer' }}>
                    Rule - {eventkey == '0' ? 'new' : eventkey}
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
    const disabled = isUpdate && item.id > 0;
    const navigate = useNavigate();
    const [rule, setRule] = useState({
            ...item,
            conditions: item?.conditions || []
    });
    const [conditionCounter, setConditionCounter] = useState(0);
    const [conditionItems, setConditionItems] = useState(item?.conditions || []);
    const [addRuleToEnterpriseField, { data, loading, error }] = useMutation(ADD_RULE_TO_ENTERPRISE_FIELD);

    useEffect(() => {
        setRule({
            ...item,
            id: item?.id,
            conditions: item?.conditions || []
        });
        const valid_conditions = item.conditions.filter(condition => {
            if (condition.id) {
                return condition;
            }
        });
        setConditionItems(valid_conditions || []);
    }, [item]);

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
        e.preventDefault();
        try {
            const variables = {
                fieldMasterId: fieldMasterId,
                dialectCode: "us_en",
                validationRuleCode: rule.type,
                validationErrorCode: rule.errorCode,
                mandatoryRuleInd: rule.mandatoryRuleInd ?? false,
                description: {
                    shortDescription: rule.shortDescription || 'test',
                    longDescription: rule.longDescription || '',
                },
                ruleGroupNumber: rule.ruleGroupNumber
            };

            if (rule.conditions && rule.conditions.length > 0) {
                variables.condition = rule.conditions.map(condition => {
                    return {
                        ruleConditionTypeCode: condition.type,
                        ruleConditionValue: condition.value,
                    }
                });
            }

            console.log(variables);
            const response = await addRuleToEnterpriseField({
                variables,
            });
          if (response.data) {
            const newFieldMaster = response['data']['AddRuleToEnterpriseField'][0];
            navigate(`/updatemasterobject/field`, { state: { fieldData: newFieldMaster } });
          } else if (response.errors) {
            alert(response.errors);
            console.error('Mutation failed:', response.errors);
          }
        } catch (error) {
            alert(error);
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
            <CustomToggle eventkey={eventkey} hidden={disabled} deleteOnClick={deleteOnClick} submitOnClick={handleSubmit}/>
            <Accordion.Collapse eventKey={eventkey}>  
            <div className="p-2">
                <Row>
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
                            name="mandatoryRuleInd" label="" onChange={handleChange} value={rule.mandatoryRuleInd ?? false} disabled={disabled}/>
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
                {conditionItems.length > 0 && <h4 className="title is-1">Conditions</h4>}

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
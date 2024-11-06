"use client";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import {useMutation} from '@apollo/client';
import { defaultDialectCode } from "../config/dialectCodeMap";

import CreateConditions from './createConditions';
import {validationCodeOptions, getErrorCodeOptions, errorMessageOptions, getConditions} from './ruleValidationCodeMap';
import {ADD_RULE_TO_ENTERPRISE_FIELD} from '../../../graphql/addRuleToEnterpriseField';
import { dialectCodeOptions } from "../../config/dialectCodeMap";
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
    const [conditionItems, setConditionItems] = useState(item?.conditions || []);
    const [addRuleToEnterpriseField, { data, loading, error }] = useMutation(ADD_RULE_TO_ENTERPRISE_FIELD);

    useEffect(() => {
        setRule({
            ...item,
            id: item?.id,
            conditions: item?.conditions || []
        });
        if (item?.conditions) {
            const valid_conditions = item.conditions.filter(condition => {
                if (condition.id) {
                    return condition;
                }
            });
            setConditionItems(valid_conditions || []);
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedRule = { ...rule, [name]: value };

        if (name === 'type') {
            const errorCodes = getErrorCodeOptions(value);
            const conditions = getConditions(value);
            updatedRule = { ...updatedRule, errorCode: errorCodes[0], conditions: conditions };
            setRule(updatedRule);
            setConditionItems(conditions);
            
        } else {
            setRule(updatedRule);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!rule.type) {
                throw new Error('Validation Code is not met');
            }
            if (!rule.ruleGroupNumber) {
                throw new Error('Rule Group Number is not met');
            }
            if (!rule.shortDescription) {
                throw new Error('shortDescription value is not met');
            }
            const variables = {
                fieldMasterId: fieldMasterId,
                dialectCode: defaultDialectCode,
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
                    if (!condition.value) {
                        throw new Error('Condition value is not met');
                    }
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
        }
      };

    const handleConditionChange = (index, updatedCondition) => {
        const updatedConditions = [...rule.conditions];
        updatedConditions[index] = updatedCondition;
      
        const updatedRule = { ...rule, conditions: updatedConditions };
        setRule(updatedRule);
        onRuleChange(eventkey - 1, updatedRule);
    };

    return (
        <div key={eventkey}>
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
                        <Form.Select aria-label="Validation errorMessage" name="errorCode" value={rule.errorCode} onChange={handleChange} disabled={disabled} required>
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
                    <Form.Group className="mb-3 col-2" as={Col} controlId="dialectCode">
                        <Form.Label>Dialect code</Form.Label>
                        <Form.Select aria-label="Dialect code" value={rule.dialectCode} onChange={handleChange} disabled={disabled} required>
                            <option value=""></option>
                            {Object.entries(dialectCodeOptions).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" xs={2} controlId="errorMessage">
                        <Form.Label>Mandatory Rule Indicator</Form.Label>
                        <center>
                            <Form.Check type="checkbox" id="mandatoryRuleInd" >
                                <Form.Check.Input type="checkbox" name="mandatoryRuleInd" className="custom-check-border"
                                    onChange={handleChange} value={rule.mandatoryRuleInd ?? false} disabled={disabled} />
                            </Form.Check>
                        </center>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" xs={4} controlId="shortDescription">
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control type="text" name="shortDescription" value={rule.shortDescription} placeholder="" onChange={handleChange} disabled={disabled} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="longDescription">
                        <Form.Label>Long Description</Form.Label>
                        <Form.Control type="text" name="longDescription" value={rule.longDescription} placeholder="" onChange={handleChange} disabled={disabled}/>
                    </Form.Group>
                </Row>
                {conditionItems.length > 0 && <h4 className="title is-1">Conditions</h4>}

                {conditionItems.map((condition, key) => {
                    return (
                        <CreateConditions 
                            isUpdate={isUpdate} 
                            eventkey={key} 
                            onConditionChange={handleConditionChange} 
                            item={condition}
                        />
                    );
                })}
            </div>
            </Accordion.Collapse>
            </Accordion.Item>
        </div>
       
    )
};

export default CreateRules;
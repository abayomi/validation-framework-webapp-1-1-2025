"use client";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { useMutation } from '@apollo/client';

import CreateConditions from './createConditions';
import { validationCodeOptions, getErrorCodeOptions, errorMessageOptions, getConditions } from './ruleValidationCodeMap';
import { ADD_RULE_TO_ENTERPRISE_FIELD } from '../../../graphql/fieldmasterMutations';
import { dialectCodeOptions } from "../../config/dialectCodeMap";
import { uniqueRecords } from "../../../lib/arrayHelper";

function CustomToggle({ eventkey, deleteOnClick }) {

    const decoratedOnClick = useAccordionButton(eventkey);

    return (
        <div className="d-flex justify-content-between align-items-center w-100 p-2">
            <div className="d-flex align-items-center col-10">
                <span onClick={decoratedOnClick} style={{ cursor: 'pointer' }} className="col-8">
                    Rule - {eventkey == '0' ? 'New' : eventkey}
                </span>
            </div>
            <Button variant="danger" size="sm" onClick={(e) => deleteOnClick(e, eventkey)}>
                Delete
            </Button>
        </div>
    );
}

const CreateRules = ({ eventkey, isUpdate, deleteOnClick, onRuleChange, item, fieldMasterId = 0, dialectCode, ruleGroupNumberList }) => {

    const disabled = isUpdate && item.id > 0;
    const navigate = useNavigate();
    const [rule, setRule] = useState([]);
    const [conditionItems, setConditionItems] = useState([]);
    const [ruleGroupNumber, setRuleGroupNumber] = useState(item?.ruleGroupNumber || null)
    const [addRuleToEnterpriseField, { data: addData, loading, error: addError }] = useMutation(ADD_RULE_TO_ENTERPRISE_FIELD);


    useEffect(() => {
        setRule({
            ...item,
            id: item?.id,
            conditions: item?.conditions || []
        });
        setRuleGroupNumber(item.ruleGroupNumber ?? null);
        if (item?.conditions) {
            const valid_conditions = uniqueRecords(item.conditions);
            setConditionItems(valid_conditions || []);
        }
    }, [item]);

    useEffect(() => {
        if (addData) {
            let newFieldMaster = addData.AddRuleToEnterpriseField[0];
            newFieldMaster['dialectCode'] = dialectCode;
            navigate(`/updatemasterobject/field`, { state: { updateFieldData: newFieldMaster } });
        }
        if (addError) {
            alert(addError);
        }
    }, [addData, addError]);

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
            const variables = {
                fieldMasterId: fieldMasterId,
                dialectCode: dialectCode,
                validationRuleCode: rule.type,
                validationErrorCode: rule.errorCode,
                mandatoryRuleInd: rule.mandatoryRuleInd ?? false,
                description: {
                    shortDescription: rule.shortDescription,
                    longDescription: rule.longDescription,
                },
                ruleGroupNumber: ruleGroupNumber
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
            console.log(response);
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
            <Accordion.Item eventkey={eventkey}>
                <CustomToggle eventkey={eventkey} deleteOnClick={deleteOnClick} />
                <Accordion.Collapse eventKey={eventkey}>
                    <div className="p-2">
                        <Form onSubmit={handleSubmit}>
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
                                    <InputGroup className="mb-3">
                                        <Form.Control type="text" name="ruleGroupNumber" value={ruleGroupNumber ?? ''} placeholder="" onChange={e => setRuleGroupNumber(e.target.value)} disabled={disabled} required />
                                        {!disabled && ruleGroupNumberList.length > 0 && <DropdownButton
                                            variant="outline-secondary"
                                            title=""
                                            onSelect={(eventKey) => setRuleGroupNumber(eventKey)}
                                            data-testid="input-group-dropdown-1"
                                        >
                                            {ruleGroupNumberList.map((key, value) => (
                                                <Dropdown.Item key={key} eventKey={key}>
                                                    {key}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>}
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3 col-3" as={Col} controlId="dialectCode">
                                    <Form.Label>Dialect code</Form.Label>
                                    <Form.Select aria-label="Dialect code" value={rule.dialectCode ?? dialectCode} disabled required>
                                        {Object.entries(dialectCodeOptions).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3 col-2" controlId="mandatoryRuleInd">
                                    <Form.Label>Mandatory Rule</Form.Label>
                                    <Form.Check type="checkbox" id="mandatoryRuleInd" aria-labelledby="mandatory-rule-label" >
                                        <Form.Check.Input type="checkbox" name="mandatoryRuleInd" className="custom-check-border"
                                            onChange={handleChange} value={rule.mandatoryRuleInd ?? false} disabled={disabled} />
                                    </Form.Check>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" xs={3} controlId="shortDescription">
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control type="text" name="shortDescription" value={rule.shortDescription ?? ""} placeholder="" onChange={handleChange} disabled={disabled} required />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="longDescription">
                                    <Form.Label>Long Description</Form.Label>
                                    <Form.Control type="text" name="longDescription" value={rule.longDescription ?? ""} placeholder="" onChange={handleChange} disabled={disabled} />
                                </Form.Group>
                            </Row>
                            {conditionItems.length > 0 && <h4 className="title is-1">Conditions</h4>}

                            {conditionItems.map((condition, key) => {
                                return (
                                    <CreateConditions
                                        key={key}
                                        isUpdate={isUpdate}
                                        eventkey={key}
                                        onConditionChange={handleConditionChange}
                                        item={condition}
                                    />
                                );
                            })}
                            <div className="d-flex justify-content-center">
                                <Button type="submit" className="ms-3 col-2" hidden={disabled}>Submit</Button>
                            </div>
                        </Form>
                    </div>
                </Accordion.Collapse>
            </Accordion.Item>
        </div>

    )
};

export default CreateRules;
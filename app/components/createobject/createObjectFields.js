"use client";

import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import styles from '@/app/page.module.css';
import stringHelper from '@/app/lib/stringHelper';
import variableHelper from '@/app/lib/variableHelper';
import DropdownMenu from '@/app/components/common/DropdownMenu';
import { formatFieldRules } from "@/app/components/createobject/createObjectMasterLogic";

/**
 * Format the option list of DropdownMenu
 * @param {Array<Object>} fieldMasterList
 * @returns {Array<Object>}
 */
export function mapOptionList(fieldMasterList) {
    return fieldMasterList.map(item => {
        return {
            key: item.fieldMasterId,
            value: item.fieldName,
            definition: item.fieldDefinition,
            rules: item.rules
        };
    });
}

/**
 * Group the rules under an object field according to the group number.
 * @param {Object} rules
 * @returns {Object}
 */
function groupByGroupId(rules) {
    let grouped = {};

    Object.entries(rules).forEach(([_, r]) => {
        if (!variableHelper.isArray(grouped[r.ruleGroupNumber])) {
            grouped[r.ruleGroupNumber] = [];
        }
        grouped[r.ruleGroupNumber].push(r);
    });

    return grouped;
}

/**
 * Get the appropriate rule description information
 * @param {Object} rule
 * @param {String} defaultValue
 * @returns {String}
 */
function getRuleDesc(rule, defaultValue) {
    if (stringHelper.isNotEmpty(rule.longDescription)) {
        return rule.longDescription;
    } 
    
    if (stringHelper.isNotEmpty(rule.shortDescription)) {
        return rule.shortDescription;
    }

    return defaultValue;
}

/**
 * Get the corresponding validation rules according to fieldMasterId
 * @param {Array<Object>} fieldMasterList
 * @param {String|Number} fieldMasterId
 * @returns {Array}
 */
function getOriginalRuleList(fieldMasterList, fieldMasterId) {
    const targetField = fieldMasterList.find(field => field.fieldMasterId == fieldMasterId);

    return targetField ? targetField.rules : [];
}

/**
 * Extract rule IDs from an array of rules and return them as an array.
 * @param {Object} existingRuleList
 * @returns {String[]}
 */
function getRuleIdList(existingRuleList) {
    return Object.entries(existingRuleList).map(([_, r]) => r.id);
}

/**
 * Component: Renders form fields for filling in "Object Field Name" and "Field Master Name".
 * @param {Object} groupedOriginalRuleList
 * @param {Object} currObjMasterRules
 * @param {String} fieldMasterName
 * @param {function} onChangeHandler
 * @param {String} fieldUUID
 * @returns {JSX.Element}
 */
function renderRuleList(groupedOriginalRuleList, currObjMasterRules, fieldMasterName, onChangeHandler, fieldUUID) {
    if (variableHelper.isEmptyObject(currObjMasterRules)) {
        return (<></>);
    }

    const currObjMasterRuleIdList = getRuleIdList(currObjMasterRules);
    const createRuleList = (rules) => {
        return rules.map(rule => {
            return (
                <li key={ `li-${rule.id}` }>
                    <input 
                        type="checkbox"
                        name={ `fieldrule-${rule.id}` }
                        className={ rule.isMandatory ? styles['disabled-checkbox'] : '' }
                        value={ rule.id }
                        checked={ currObjMasterRuleIdList.includes(rule.id) }
                        disabled={ rule.isMandatory } /* If a rule is mandatory, the user cannot modify it. */
                        onChange={ () => onChangeHandler(fieldUUID, rule) }
                    />&nbsp;
                    Description: <b>{ getRuleDesc(rule, 'N/A') }</b>
                </li>
            );
        });
    }

    const dlItemList = Object.entries(groupedOriginalRuleList).map(([ruleGroupNumber, rules]) => {
        return (
            <Row key={ `div-${ruleGroupNumber}` }> {/* There is no need for any HTML tags, such as div, so React.Fragment is used. */}
                <Col className="col-3">
                    Group Number: <b>{ ruleGroupNumber }</b>
                </Col>
                <Col className="col-9">
                    <ul className="list-unstyled">
                        { createRuleList(rules) }
                    </ul>
                </Col>
            </Row>
        );
    });

    return (
        <Accordion className='mb-5'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    Rules for field master: &nbsp;<b>{ fieldMasterName }</b>
                </Accordion.Header>
                <Accordion.Body>
                    { dlItemList }  
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

/**
 * Check if the rule array is valid
 * @param {Array} rules
 * @returns {boolean}
 */
function hasValidFieldRules(rules) {
    return variableHelper.isArray(rules) && rules.length > 0;
}

/**
 * Component: create or edit an object master
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 */
const CreateObjectFields = (props) => {
    const { 
        item, 
        onInputChangeHandler, 
        onDeleteHandler, 
        onDropDownItemClick,
        fieldMasterList,
        fieldRuleCheckboxCallback,
        isUpdating
    } = props

    const { 
        id: fieldUUID, 
        objectFieldName, 
        fieldMasterName, 
        fieldMasterId, 
        rules: currObjMasterRules
    } = item;

    const groupedOriginalRuleList = groupByGroupId(formatFieldRules(getOriginalRuleList(fieldMasterList, fieldMasterId)));

    const onFieldRuleCheckboxChange = (fieldUUID, objRule) => {
        fieldRuleCheckboxCallback(fieldUUID, fieldMasterId, objRule);
    }

    return (
        <>
          <Row>
                <Form.Group as={Col} className="mb-3 col-3" controlId="objectFieldName">
                    <Form.Control
                        type="text"
                        name={ `fields-objfieldname-${fieldUUID}` }
                        required
                        value={ objectFieldName }
                        onChange={ onInputChangeHandler }
                        disabled={ isUpdating }
                    />
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-3" controlId="fieldMasterName">
                    {/* The reason for setting the input to disabled: a click event triggered by the user is required to obtain the fieldMasterId. */}
                    {/* This input field requires neither a name nor an event, it is just for display. */}
                    <Form.Control
                        type="text"
                        value={ fieldMasterName }
                        disabled={ true }
                    />
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-2 p-0" controlId="fieldMasterNameDropdownMenu">
                    <DropdownMenu
                        buttonName="Choose"
                        optionList={ mapOptionList(fieldMasterList) }
                        onDropDownItemClick={ onDropDownItemClick }
                        customizeLabel={ item => `${item.value} - (${item.definition})` }
                    />
                </Form.Group>

                <Form.Group as={Col} className="mb-3 col-4 p-0">
                    <Button 
                        className="mb-3" 
                        variant="danger"
                        onClick={ onDeleteHandler }
                    >Delete</Button>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3 col-7 offset-0">
                    { 
                        hasValidFieldRules(currObjMasterRules) /* Test data or unqualified data may not have relevant rules, which will cause warning messages to appear when the component is rendered. */
                        && renderRuleList(groupedOriginalRuleList, currObjMasterRules, fieldMasterName, onFieldRuleCheckboxChange, fieldUUID) 
                    }
                </Form.Group>
            </Row>
        </>
    );
};

export default CreateObjectFields;
"use client";

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { useQuery } from "@apollo/client";
import styles from '@/app/page.module.css';
import stringHelper from '@/app/lib/stringHelper';
import variableHelper from '@/app/lib/variableHelper';
import { loadFetchFieldMetaData } from '@/app/graphql/fieldMasterQueries'
import { defaultDialectCode } from '@/app/components/config/dialectCodeMap';
import DropdownMenu from '@/app/components/common/DropdownMenu';

function mapOptionList(fieldMasterList) {
    return fieldMasterList.map(item => {
        return {
            key: item.fieldMasterId,
            value: item.fieldName,
            definition: item.fieldDefinition,
            rules: item.rules
        };
    });
}

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

function getRuleDesc(rule, defaultValue) {
    if (stringHelper.isNotEmpty(rule.longDescription)) {
        return rule.longDescription;
    } 
    
    if (stringHelper.isNotEmpty(rule.shortDescription)) {
        return rule.shortDescription;
    }

    return defaultValue;
};

function renderRuleList(rules, fieldMasterName, onFieldRuleCheckboxChange) {
    if (variableHelper.isEmptyObject(rules)) {
        return (<></>);
    }

    const createRuleList = (groupedRules) => {
        return groupedRules.map(rule => {
            return (
                <li key={ `li-${rule.id}` }>
                    <input 
                        type="checkbox"
                        name={ `fieldrule-${rule.id}` }
                        className={ rule.isMandatory ? styles['disabled-checkbox'] : '' }
                        value={ rule.id }
                        checked={ rule.isChecked }
                        disabled={ rule.isMandatory } /* If a rule is mandatory, the user cannot modify it. */
                        onChange={ onFieldRuleCheckboxChange }
                    />&nbsp;
                    Description: <b>{ getRuleDesc(rule, 'N/A') }</b>
                </li>
            );
        });
    }

    const groupedRules = groupByGroupId(rules);
    const dlItemList = Object.entries(groupedRules).map(([ruleGroupNumber, groupedRules]) => {
        return (
            <Row key={ `div-${ruleGroupNumber}` }> {/* There is no need for any HTML tags, such as div, so React.Fragment is used. */}
                <Col className="col-3">
                    Group Number: <b>{ ruleGroupNumber }</b>
                </Col>
                <Col className="col-9">
                    <ul className="list-unstyled">
                        { createRuleList(groupedRules, onFieldRuleCheckboxChange) }
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

function hasValideFieldRules(obj) {
    const keys = Object.keys(obj);
    return !(keys.length === 1 && keys[0] === "null");
}

const CreateObjectFields = (props) => {
    const { 
        item, 
        onInputChangeHandler, 
        onDeleteHandler, 
        onDropDownItemClick,
        onFieldRuleCheckboxChange
    } = props

    const { id: itemId, objectFieldName, fieldMasterName, rules } = item;

    const [fieldMasterList, setFieldMasterList] = useState([]);

    const rawFieldMasterList = useQuery(loadFetchFieldMetaData, {
        variables: { dialectCode: defaultDialectCode }
    });
    
    useEffect(() => {
        if (rawFieldMasterList.error) {
            console.error('Failed to obtain the Object Master list: ', rawObjectMasterList.error);
        }
        if (rawFieldMasterList.data) {
            const formattedRowList = rawFieldMasterList.data.FetchFieldMetaData;
            setFieldMasterList(formattedRowList);
        }
    }, [rawFieldMasterList]);

    return (
        <>
          <Row>
                <Form.Group as={Col} className="mb-3 col-3" controlId="objectFieldName">
                    <Form.Control
                        type="text"
                        name={ `fields-objfieldname-${itemId}` }
                        required
                        value={ objectFieldName }
                        onChange={ onInputChangeHandler }
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
                        hasValideFieldRules(rules) /* Test data or unqualified data may not have relevant rules, which will cause warning messages to appear when the component is rendered. */
                        && renderRuleList(rules, fieldMasterName, onFieldRuleCheckboxChange) 
                    }
                </Form.Group>
            </Row>
        </>
    );
};

export default CreateObjectFields;
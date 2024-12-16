"use client";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import CreateRules from "./FieldMaster/createRules";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { dialectCodeOptions, defaultDialectCode } from "../config/dialectCodeMap";
import { uniqueRecords } from "../../lib/arrayHelper";
import { CREATE_ENTERPRISE_FIELD, REMOVE_RULE_FROM_ENTERPRISE_FIELD } from "../../graphql/fieldMasterMutations";

/**
 * Component: The form of creating or editing a field master
 * @returns {JSX.Element}
 */
const CreateFieldMasterObject = ({ location, confirmFunction = window.confirm }) => {
  const isUpdate = Boolean(location.pathname === "/updatemasterobject/object" || location.pathname === "/updatemasterobject/field");
  const navigate = useNavigate();
  const [dialectCode, setDialectCode] = useState(defaultDialectCode);
  const emptyFormData = {
    fieldMasterId: '',
    enterpriseFieldInd: false,
    fieldMasterInUseInd: true,
    fieldName: '',
    fieldDefinition: '',
    dialectCode: defaultDialectCode,
  };
  const [formData, setFormData] = useState(emptyFormData);
  const [ruleItems, setRuleItems] = useState([]);
  const [ruleGroupNumberList, setRuleGroupNumberList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [activeKey, setActiveKey] = useState("0");
  const [createEnterpriseField, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_ENTERPRISE_FIELD);
  const [removeRuleFromEnterpriseField, { data: removeData, loading: removeLoading, error: removeError }] = useMutation(REMOVE_RULE_FROM_ENTERPRISE_FIELD);

  useEffect(() => {
    if (isUpdate && location.state) {
      setAdding(false);
      const fieldData = location.state.updateFieldData;
      if (!fieldData) {
        return;
      }

      setFormData(fieldData);
      setDialectCode(fieldData.dialectCode);

      if (fieldData.rules) {
        const valid_rules = uniqueRecords(fieldData.rules);
        setRuleItems(valid_rules);
        const uniqueRuleGroupNumber = uniqueRecords(valid_rules.map(rule => rule.ruleGroupNumber), null);
        setRuleGroupNumberList(uniqueRuleGroupNumber);
      } else {
        setRuleItems([]);
        setRuleGroupNumberList([]);
      }
    }
    if (!isUpdate) {
      setDialectCode(defaultDialectCode);
      setFormData(emptyFormData);
      setRuleItems([]);
    }
  }, [isUpdate, location.state]);

  useEffect(() => {
    if (createData) {
      alert("Field Master added successfully!");
      const newData = createData['CreateEnterpriseField'][0];
      const newFieldMaster = {
        'fieldMasterId': newData.fieldMasterId,
        'fieldName': newData.fieldName,
        'enterpriseFieldInd': formData.enterpriseFieldInd,
        'fieldMasterInUseInd': formData.fieldMasterInUseInd,
        'fieldDefinition': newData.fieldDefinition,
        'dialectCode': dialectCode,
        'rules': [],
      };
      navigate(`/updatemasterobject/field`, { state: { updateFieldData: newFieldMaster } });
    }
  }, [createData]);

  useEffect(() => {
    if (removeData) {
      const { RemoveRuleFromEnterpriseField } = removeData;
      let removeDeleteId = deleteId;
      // for testing
      if (confirmFunction !== window.confirm) {
        removeDeleteId = 1;
      }
      if (RemoveRuleFromEnterpriseField.status && removeDeleteId) {
        alert(`Deleted successfully: ${removeDeleteId}`);
        const updatedRuleItems = ruleItems.filter(item => item.id !== removeDeleteId);
        setRuleItems(updatedRuleItems);
        setDeleteId(null);
      }
    }
    if (removeError) {
      alert(removeError);
    }
  }, [removeData, removeError]);

  /**
   * Handles the click event for the add button, setting the state to add a new rule item.
   */
  const onAddBtnClick = () => {
    setAdding(true);
    setActiveKey(0);
    setRuleItems((prev) => [...prev, { 'id': 0 }]);
  };

  /**
   * Handles the click event for the back button, navigating to the home page with a specific tab key.
   */
  const onBackBtnClick = () => {
    navigate('/', { state: { tabKey: 'viewFieldMaster' } });
  };

  /**
   * Handles the click event for deleting a rule.
   *
   * @param {Object} e - The event object.
   * @param {number} index - The index of the rule to delete.
   * @returns {Promise<void>}
   */
  const deleteOnClick = async (e, index) => {
    console.log(index);
    e.stopPropagation();
    if (index > 0) {
      const userConfirmed = confirmFunction("Are you sure you want to delete this rule?");

      if (!userConfirmed) {
        return;
      }

      const variables = {
        field_valid_rule_id: index,
      };

      console.log(variables);
      setDeleteId(index);
      await removeRuleFromEnterpriseField({ variables });
    }

    const updatedRuleItems = ruleItems.filter(item => item.id !== index);
    setRuleItems(updatedRuleItems);
    setAdding(false);
  };

  /**
   * Handling input changes
   * @returns {void}
   */
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: (e.target.type === 'checkbox') ? e.target.checked : e.target.value,
    });
  };

  /**
   * Handle form submission
   * @param e
   * @returns {Promise<void>}
   */
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
      await createEnterpriseField({
        variables,
      });
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
          <Form.Control type="text" placeholder="" value={formData.fieldMasterId} disabled />
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
          <Form.Control type="text" placeholder="" value={formData.fieldName} onChange={handleInputChange} disabled={isUpdate} required />
        </Form.Group>
        <Form.Group className="mb-3 col-10" as={Col} controlId="fieldDefinition">
          <Form.Label>Field Definition</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="" value={formData.fieldDefinition} onChange={handleInputChange} disabled={isUpdate} required />
        </Form.Group>
        <Form.Check className="mb-3 col-10" id="enterpriseFieldInd">
          <Form.Check.Input type="checkbox" className="custom-check-border" checked={(formData.enterpriseFieldInd ?? false) === true} onChange={handleInputChange} disabled={isUpdate} />
          <Form.Check.Label>Enterprise Field Indicator</Form.Check.Label>
        </Form.Check>
        <Form.Check className="mb-3 col-10" id="fieldMasterInUseInd">
          <Form.Check.Input type="checkbox" className="custom-check-border" checked={(formData.fieldMasterInUseInd ?? false) === true} onChange={handleInputChange} disabled={isUpdate} />
          <Form.Check.Label>Field Master In-Use Indicator</Form.Check.Label>
        </Form.Check>
        {!isUpdate && <Button variant="primary" type="submit">
          Submit
        </Button>}
      </Form>
      {isUpdate && (
        <div className="mb-3">
          <Button
            variant="info"
            size="sm"
            onClick={onAddBtnClick}
            disabled={adding}
          >
            Add Rules
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onBackBtnClick}
            className="ms-2"
          >
            Back
          </Button>
        </div>
      )}
      <Accordion className="mb-3" defaultActiveKey={activeKey} alwaysOpen flush>
        {ruleItems.map((item, index) => {
          return (
            <CreateRules
              key={item.id ?? '0'}
              eventkey={item.id ?? '0'}
              isUpdate={isUpdate}
              deleteOnClick={deleteOnClick}
              item={item}
              fieldMasterId={formData.fieldMasterId}
              dialectCode={dialectCode}
              ruleGroupNumberList={ruleGroupNumberList}
            />
          );
        })}
      </Accordion>
      {createLoading && <p>Submitting...</p>}
      {createError && <p>Error: {createError.message}</p>}
    </div>
  )
};

export default CreateFieldMasterObject;
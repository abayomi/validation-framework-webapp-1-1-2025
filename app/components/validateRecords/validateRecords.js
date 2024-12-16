"use client";
import withAuth from "../withAuth";
import React, { useState, useEffect } from "react";
import { Modal, Alert, Button, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuidv4 } from 'uuid';
import { useLazyQuery, useQuery } from "@apollo/client";
import graphqlForObjectMaster from "../../graphql/objectMasterQueries";
import { defaultDialectCode } from "../../components/config/dialectCodeMap";
import { LOAD_VALIDATE_RECORDS } from "../../graphql/validationQueries";
import RecordCard from "./recordCard";
import DropdownMenu from "../common/DropdownMenu";
import { propertyGet } from "../../lib/arrayHelper";
import AlertWindow from "./alertWindow";

/**
 * Component for validating records.
 *
 * @returns {JSX.Element}
 */
const ValidateRecords = () => {
  const initRecordId = 10;
  const [objectName, setObjectName] = useState('');
  const [recordCurrentId, setRecordCurrentId] = useState(initRecordId);
  const [recordItems, setRecordItems] = useState([{ 'recordId': initRecordId, 'fields': [{}] }]);
  const [objectList, setObjectList] = useState([]);
  const [fieldNameList, setFieldNameList] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState('');
  const [loadValidateRecords, { called, loading, data, error }] = useLazyQuery(LOAD_VALIDATE_RECORDS);
  const rawObjectMasterList = useQuery(graphqlForObjectMaster.FetchObjectMasterList, {
    variables: { dialectCode: defaultDialectCode }
  });
  const [lazyLoadQuery, { data: fetchObjectData, loading: fetchObjectLoading, error: fetchObjectError }] = useLazyQuery(graphqlForObjectMaster.FetchObjectMetaDataByLabel);

  useEffect(() => {
    if (rawObjectMasterList.error) {
      console.error(rawObjectMasterList.error);
    }
    if (rawObjectMasterList.data) {
      const rawObjectList = rawObjectMasterList.data.FetchObjectMasterList;
      setObjectList(rawObjectList);
    }
  }, [rawObjectMasterList]);

  useEffect(() => {
    if (fetchObjectError) {
      console.error(fetchObjectError);
      setFieldNameList([]);
    }
    if (fetchObjectData) {
      const rawFieldList = propertyGet(fetchObjectData, 'FetchObjectMetaDataByLabel.0.fields', []);
      const newfieldNameList = rawFieldList.map(obj => obj.fieldName);
      setFieldNameList(newfieldNameList);
    }
  }, [fetchObjectData, fetchObjectError, fetchObjectLoading]);

  useEffect(() => {
    // check if name is in objectList
    if (objectList.some(object => object.objectName === objectName)) {
      const fetchData = async (objectName) => {
        await lazyLoadQuery({
          variables: {
            objectLabelName: objectName,
            dialectCode: defaultDialectCode
          }
        });
      };
      fetchData(objectName);
    } else {
      setFieldNameList([]);
    }
  }, [objectName]);

  useEffect(() => {
    if (data) {
      const info = JSON.stringify(data, null, 2)
        .split('\n')
        .filter(line => !line.includes('"__typename":'))
        .join('\n');
      setModalData(info);
    }
    if (error) {
      const info = JSON.stringify(error, null, 2)
        .split('\n')
        .filter(line => !line.includes('"__typename":'))
        .join('\n');
      setModalData(info);
    }
  }, [called, loading, data, error]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Handles changes to the records by updating the record items state.
   *
   * @param {number} index - The index of the record item to update.
   * @param {Object} currentRecordItem - The updated record item.
   */
  const handleRecordsChange = (index, currentRecordItem) => {
    const updateRecordItems = [...recordItems];
    updateRecordItems[index] = currentRecordItem;

    setRecordItems(updateRecordItems);
  }

  /**
   * Handles the form submission by creating a batch object and loading validation records.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const batch = {
      batchId: uuidv4(),
      objectName: objectName,
    }
    if (recordItems.length > 0) {
      const formatRecordItems = recordItems.map((item) => ({
        recordId: item.recordId,
        fields: item.fields,
      }));
      batch.objectRecords = formatRecordItems;
    }
    console.log(batch);
    loadValidateRecords({ variables: { batch } });
    handleShow();
  }

  /**
   * Handles the click event for the add button, adding a new record item to the state.
   *
   * @param {Object} event - The event object.
   */
  const onAddBtnClick = (event) => {
    const updateRecordItems = [...recordItems, { 'recordId': recordCurrentId + 1, 'fields': [{}] }];
    setRecordCurrentId(recordCurrentId + 1);
    setRecordItems(updateRecordItems);
  };

  /**
   * Maps the object list to an array of objects containing key-value pairs for dropdown menu data.
   *
   * @param {Array} objectList - The list of objects to map.
   * @returns {Array}
   */
  const getDropdownMenuDataMapping = (objectList) => {
    return objectList.map(obj => {
      return {
        key: obj.objectMasterId,
        value: obj.objectName
      };
    });
  };

  /**
   * Deletes a record item from the state based on the provided index.
   *
   * @param {number} index - The index of the record item to delete.
   */
  const onDeleteRecord = (index) => {
    const updateRecordItems = [...recordItems];
    updateRecordItems.splice(index - 1, 1);
    setRecordItems(updateRecordItems);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} className="mb-3 col-10">
          <Form.Label>Object Name</Form.Label>
          <Row>
            <Col xs="2" className="pe-0">
              <Form.Control
                type="text"
                defaultValue="us_en"
              />
            </Col>
            <Col className="pe-0 object-name">
              <Form.Control
                className="input-object-name"
                type="text"
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                required
              />
            </Col>
            <Col className="ps-0">
              <DropdownMenu
                optionList={getDropdownMenuDataMapping(objectList)}
                onDropDownItemClick={item => setObjectName(item.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Row className="mb-3">
          <Col xs="2">
            <Form.Group controlId="batchId">
              <Form.Label>Object Records</Form.Label>
            </Form.Group>
          </Col>
          <Col xs="10" className="d-flex align-items-end">
            <Button variant="info" size="sm" onClick={onAddBtnClick}>Add Record</Button>
          </Col>
        </Row>
        {recordItems && Array.isArray(recordItems) && recordItems.map((item, key) => (
          <RecordCard key={key} id={key} item={item} fieldNameList={fieldNameList} onChange={handleRecordsChange} onDelete={onDeleteRecord} />
        ))}
        <Button className="mb-3" variant="info" size="sm" type="submit">Validate</Button>
      </Form>

      <AlertWindow show={show} handleClose={handleClose} error={error} modalData={modalData} />
    </div>
  );
};

export default withAuth(ValidateRecords);
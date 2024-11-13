"use client";
import withAuth from "../withAuth";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuidv4 } from 'uuid';
import { useLazyQuery, useQuery } from "@apollo/client";
import graphqlForObjectMaster from "@/app/graphql/objectMasterQueries";
import { defaultDialectCode } from "@/app/components/config/dialectCodeMap";
import { LOAD_VALIDATE_RECORDS } from "@/app/graphql/validationQueries";
import RecordCard from "./recordCard";
import DropdownMenu from "../common/DropdownMenu";

const ValidateRecords = () => {

  const [objectName, setObjectName] = useState("");
  const [recordItems, setRecordItems] = useState([]);
  const [dialectCode, setDialectCode] = useState(defaultDialectCode);
  const [objectList, setObjectList] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState('');
  const [loadValidateRecords, { called, loading, data, error }] = useLazyQuery(LOAD_VALIDATE_RECORDS);
  const rawObjectMasterList = useQuery(graphqlForObjectMaster.FetchObjectMasterList, {
    variables: { dialectCode: dialectCode }
  });

  useEffect(() => {
    if (rawObjectMasterList.error) {
      console.error(rawObjectMasterList.error);
    }
    if (rawObjectMasterList.data) {
      const formattedRowList = rawObjectMasterList.data.FetchObjectMasterList;
      setObjectList(formattedRowList);
    }
  }, [rawObjectMasterList]);

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

  const handleRecordsChange = (index, currentRecordItem) => {
    const updateRecordItems = [...recordItems];
    updateRecordItems[index] = currentRecordItem;

    setRecordItems(updateRecordItems);
  }

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
    console.log("============================handleSubmit======", batch);
    loadValidateRecords({ variables: { batch } });
    handleShow();
  }

  const onAddBtnClick = () => {
    const updateRecordItems = [...recordItems, {'fields': [{}]}];
    setRecordItems(updateRecordItems);
  };

  const getDropdownMenuDataMapping = (objectList) => {
    return objectList.map(obj => {
      return {
        key: obj.objectMasterId,
        value: obj.objectName
      };
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} className="mb-3 col-10" controlId="objectName">
          <Form.Label>Object Name</Form.Label>
          <Row>
            <Col xs="2" className="pe-0">
              <Form.Control
                type="text"
                defaultValue="us_en"
              />
            </Col>
            <Col className="pe-0">
              <Form.Control
                type="text"
                value={objectName}
                onChange={ (e) => setObjectName(e.target.value) }
                required
              />
            </Col>
            <Col className="ps-0">
              <DropdownMenu 
                  list={ getDropdownMenuDataMapping(objectList) } 
                  onDropDownItemClick={ (val) => setObjectName(val) }
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
        {recordItems && recordItems.map((item, key) => (
           <RecordCard key={key} id={key} item={item} onChange={handleRecordsChange} />
        ))}
        <Button className="mb-3" variant="info" size="sm" type="submit">Validate</Button>
      </Form>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p>Error: {error.message}</p>}
          {modalData && <pre>{modalData}</pre>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withAuth(ValidateRecords);
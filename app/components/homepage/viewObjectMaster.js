"use client";
import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import graphqlForObjectMaster from "../../graphql/objectMasterQueries";
import withAuth from "../withAuth";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import FieldsObject from "./fieldsObject";

const removeSelectedMark = function (rowList) {
  return rowList.map(function (item) {
    return { ...item, isSelected: false };
  });
};

const markSelectedRow = function (rowList, selectedRow) {
  const foundIndex = rowList.findIndex(x => x.objectMasterId == selectedRow.objectMasterId);
  rowList[foundIndex] = { ...selectedRow, isSelected: true };
  return rowList;
};

const formatObjectMasterList = function(apiResponseData) {
  return apiResponseData.map(function(item) {
    return {
      objectMasterId: item.objectMasterId,
      objectName: item.objectName,
      objectLabelName: item.objectLabelName,
      isSelected: false
    };
  });
};

const formatObjectFieldList = function(apiResponseData) {
  const fieldList = apiResponseData[0].fields;
  return fieldList.map(function(item) {
    return {
      enterpriseFieldInd: true,
      fieldMasterId: item.fieldMasterId,
      fieldMasterName: item.fieldMasterName,
      fieldName: item.fieldName,
      fieldXrefId: item.fieldXrefId,
      fieldMasterDefinition: item.fieldMasterDefinition,
      rules: []
    };
  });
}; 

const ViewObjectMaster = () => {
  const validDialectCode = "us_en"; // Currently, only us_en is enabled in our system.
  const [objectMasterList, setObjectMasterList] = useState([]);
  const [objectFieldsOfSelectedRow, setObjectFieldsOfSelectedRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const dataTableColumns = [
    {
      name: 'Object Name',
      sortable: true,
      reorder: true,
      selector: row => row.objectName,
    },
    {
      name: 'Object Label Name',
      sortable: true,
      reorder: true,
      selector: row => row.objectLabelName,
    },
    {
      name: 'Action',
      sortable: false,
      reorder: false,
      cell: () => (
        <Button variant="info" size="sm" onClick={() => navigate('/updatemasterobject/object')}>
          Edit
        </Button>
      ),
    }
  ];
  const highLightSelectedRow = (row) => {
    const listWithSelectedMark = markSelectedRow(removeSelectedMark(objectMasterList), row);
    setObjectMasterList(listWithSelectedMark);
  };

  // You have to use useLazyQuery(), because userQuery() can only be used at the top of a component and you can't put it in a click event. 
  // However, the objectLabelName cannot be obtained before the click event is triggered.
  const [lazyLoadQuery, rawObjectFieldsData] = useLazyQuery(graphqlForObjectMaster.FetchObjectMetaDataByLabel);
  const loadObjectFieldsData = (objectLabelName) => {
    lazyLoadQuery({
      variables: { 
        objectLabelName: objectLabelName,
        dialectCode: validDialectCode
      }
    });
  };

  const rawObjectMasterList = useQuery(graphqlForObjectMaster.FetchObjectMasterList, {
    variables: { dialectCode: validDialectCode }
  });

  useEffect(() => {
    // Render the list of Object Master
    if (rawObjectMasterList.error) {
      return (<div>Error! {rawObjectMasterList.error.message}</div>);
    }
    if (rawObjectMasterList.data) {
      const formattedRowList = formatObjectMasterList(rawObjectMasterList.data.FetchObjectMasterList);
      setObjectMasterList(formattedRowList);
    }

    // Show Object Fields section
    if (rawObjectFieldsData.error) {
      return (<div>Error! {rawObjectFieldsData.error.message}</div>);
    }
    if (rawObjectFieldsData.data) {
      const objectFieldList = formatObjectFieldList(rawObjectFieldsData.data.FetchObjectMetaDataByLabel);
      setObjectFieldsOfSelectedRow(objectFieldList);

      highLightSelectedRow(selectedRow); // setObjectFieldsOfSelectedRow() causes the component be rendered first, then the row can be marked as selected.
    }
  }, [rawObjectMasterList, rawObjectFieldsData]);

  // DataTable's doc: https://react-data-table-component.netlify.app/?path=/docs/api-props--docs
  return (
    <div>
      <DataTable
        pagination
        highlightOnHover
        pointerOnHover
        selectableRowsSingle
        selectableRowsHighlight
        selectableRowSelected={(row) => row.isSelected}
        selectableRows={true}
        checkbox={false}
        columns={dataTableColumns}
        data={objectMasterList}
        onRowClicked={(row) => {
          loadObjectFieldsData(row.objectLabelName);

          setSelectedRow(row); // Store the selected row so that it can be re-rendered in useEffect to mark it as selected.
        }}
      />

      {objectFieldsOfSelectedRow && <FieldsObject dataComeFrom={'objectMaster'} objectFieldsData={objectFieldsOfSelectedRow} />}
    </div>
  );
}

export default withAuth(ViewObjectMaster);
"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import { useLazyQuery } from "@apollo/client";
import { arrayGet, propertyGet } from "../../lib/arrayHelper";
import { defaultDialectCode } from "../config/dialectCodeMap";
import graphqlForObjectMaster from "../../graphql/objectMasterQueries";
import { eventKeyObjectMaster } from "../createobject/tabMenu";
import withAuth from "../withAuth";
import FieldsObject from "./fieldsObject";
import FilterList, { doFilterList } from "./filterList";
import fetchObjectMasterList from "./fetchObjectMasterList";

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

const formatObjectFieldList = function(apiResponseData) {
  const fieldList = propertyGet(arrayGet(apiResponseData, 0), 'fields', []);
  return fieldList.map(function(item) {
    return {
      enterpriseFieldInd: true,
      fieldMasterId: item.fieldMasterId,
      fieldMasterName: item.fieldMasterName,
      fieldName: item.fieldName,
      fieldXrefId: item.fieldXrefId,
      fieldMasterDefinition: item.fieldMasterDefinition,
      rules: item.rules
    };
  });
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

// This is a custom hook, without this, useLazyQuery() must be called whitin ViewObjectMaster.
function useLoadObjectFieldsData(setObjectFieldsOfSelectedRow) {
  // You have to use useLazyQuery(), because userQuery() can only be used at the top of a component and you can't put it in a click event. 
  // However, the objectLabelName cannot be obtained before the click event is triggered.
  const [lazyLoadQuery, rawObjectFieldsData] = useLazyQuery(graphqlForObjectMaster.FetchObjectMetaDataByLabel);
  const loadObjectFieldsData = (objectLabelName, dialectCode) => {
    lazyLoadQuery({
      variables: { 
        objectLabelName: objectLabelName,
        dialectCode: dialectCode
      }
    });
  };

  useEffect(() => {
    // Show Object Fields section
    if (rawObjectFieldsData.error) {
      console.log('Error from GraphQL API: ', rawObjectFieldsData.error.message);
    }
    if (rawObjectFieldsData.data) {
      const objectFieldList = formatObjectFieldList(rawObjectFieldsData.data.FetchObjectMetaDataByLabel);
      setObjectFieldsOfSelectedRow(objectFieldList);
    }
  }, [rawObjectFieldsData]);

  return loadObjectFieldsData;
}

const ViewObjectMaster = () => {
  const [dialectCode, setDialectCode] = useState(defaultDialectCode);
  const [objectMasterList, setObjectMasterList] = useState([]);
  const [objectFieldsOfSelectedRow, setObjectFieldsOfSelectedRow] = useState(null);
  const [filterText, setFilterText] = useState('');
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
      cell: (row) => (
        <Button variant="info" size="sm" onClick={() => navigate(`/updatemasterobject/object/${row.objectMasterId}`)}>
          Edit
        </Button>
      ),
    }
  ];

  const [objectMasterListData, doObjectMasterListRefresh] = fetchObjectMasterList(dialectCode);
  useEffect(() => {
    if (objectMasterListData) {
      setObjectMasterList(formatObjectMasterList(objectMasterListData));
    }
  }, [objectMasterListData]);

  const highLightSelectedRow = (row) => {
    const listWithSelectedMark = markSelectedRow(removeSelectedMark(objectMasterList), row);
    setObjectMasterList(listWithSelectedMark);
  };
  const loadObjectFieldsData = useLoadObjectFieldsData(setObjectFieldsOfSelectedRow);
  const rowClickHandler = (row) => {
    loadObjectFieldsData(row.objectLabelName, dialectCode);
    highLightSelectedRow(row);
  };

  // DataTable's doc: https://react-data-table-component.netlify.app/?path=/docs/api-props--docs
  return (
    <>
      <FilterList
        dialectCode={dialectCode}
        filterText={filterText}
        inputPlaceHolder="Filter By Object Name"
        onRefreshClicked={ doObjectMasterListRefresh }
        onFilterTextChanged={(e) => setFilterText(e.target.value)}
        onDialectCodeChanged={(e) => {
          setFilterText('');
          setDialectCode(e.target.value);
        }}
      />

      <DataTable
        pagination
        highlightOnHover
        pointerOnHover
        selectableRowsSingle
        selectableRowsHighlight
        selectableRows={false}
        checkbox={false}
        columns={dataTableColumns}
        data={ doFilterList(objectMasterList, 'objectName', filterText) }
        selectableRowSelected={(row) => row.isSelected}
        onRowClicked={ rowClickHandler }
      />

      {objectFieldsOfSelectedRow && <FieldsObject dataComeFrom={eventKeyObjectMaster} objectFieldsData={objectFieldsOfSelectedRow} />}
    </>
  );
}

export default withAuth(ViewObjectMaster);
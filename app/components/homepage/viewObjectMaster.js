"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import { useLazyQuery, useMutation } from "@apollo/client";
import { arrayGet, propertyGet } from "../../lib/arrayHelper";
import variableHelper from "../../lib/variableHelper";
import { defaultDialectCode } from "../config/dialectCodeMap";
import graphqlForObjectMaster from "../../graphql/objectMasterQueries";
import { eventKeyObjectMaster } from "../createobject/tabMenu";
import withAuth from "../withAuth";
import FieldsObject from "./fieldsObject";
import FilterList, { doFilterList } from "./filterList";
import FetchObjectMasterList from "./fetchObjectMasterList";

/**
 * Removes the selected mark from each item in the list.
 * @param {Array<Object>} rowList - An array of objects, each containing an `isSelected` property.
 * @returns {Array<Object>} Returns a new array with all `isSelected` properties set to false.
 */
const removeSelectedMark = function (rowList) {
  return rowList.map(function (item) {
    return { ...item, isSelected: false };
  });
};

/**
 * Marks the selected row in the list.
 * @param {Array<Object>} rowList - An array of objects, each containing `objectMasterId` and `isSelected` properties.
 * @param {Array<Object>} selectedRow - The row object to be marked as selected.
 * @returns {Array<Object>} Returns the updated array with the selected row marked.
 */
const markSelectedRow = function (rowList, selectedRow) {
  const foundIndex = rowList.findIndex(x => x.objectMasterId == selectedRow.objectMasterId);
  rowList[foundIndex] = { ...selectedRow, isSelected: true };
  return rowList;
};

/**
 * Formats the object field list from API response data.
 * @param {Array} apiResponseData - The API response data containing the field list.
 * @returns {Array<Object>} Returns a formatted array of field objects.
 */
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

/**
 * Formats the object master list from API response data.
 * @param {Array<Object>} apiResponseData - The API response data containing the object master list.
 * @returns {Array<Object>} Returns a formatted array of object master items with an added `isSelected` field.
 */
const formatObjectMasterList = function(apiResponseData) {
  return apiResponseData.map(function(item) {
    return {
      objectMasterId: item.objectMasterId,
      objectName: item.objectName,
      objectLabelName: item.objectLabelName,
      objMasterInUseInd: item.objMasterInUseInd,
      isSelected: false /* Add this field */
    };
  });
};

/**
 * Custom hook to load object fields data based on the provided object label name and dialect code.
 *
 * @param {Function} setObjectFieldsOfSelectedRow
 * @returns {Function} - Function to trigger the loading of object fields data.
 */
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

/**
 * Component: Show the list of object master
 * @returns {Element}
 */
const ViewObjectMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { refreshPage } = state || {};
  const [dialectCode, setDialectCode] = useState(defaultDialectCode);
  const [objectMasterList, setObjectMasterList] = useState([]);
  const [objectFieldsOfSelectedRow, setObjectFieldsOfSelectedRow] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [objectMasterListData, doObjectMasterListRefresh] = FetchObjectMasterList(dialectCode);
  const [deleteValidationObject, deleteValidationObjectReponse] = useMutation(graphqlForObjectMaster.DeleteValidationObject);

  const editButtonHandler = (objectLabelName) => {
    return () => navigate(`/updatemasterobject/object/${objectLabelName}`);
  }
  
  const deleteButtonHandler = (objLableName) => {
    const changeObjMasterInUseInd = (response) => {
      const deleteValidationObject = arrayGet(propertyGet(response, 'data.DeleteValidationObject'), 0);
      const deletedObjectMasterId = variableHelper.isObject(deleteValidationObject) ? deleteValidationObject.objectMasterId : 0;
      if (deletedObjectMasterId > 0) {
        const updatedList = objectMasterList.map(item => {
          if (item.objectMasterId === deletedObjectMasterId) {
            item.objMasterInUseInd = false;
          }

          return item;
        });
        setObjectMasterList(updatedList);
      }
    };
  
    return async () => {
      const msg = `Are you sure you want to delete ${objLableName}?`;
      if (confirm(msg)) {
        const response = await deleteValidationObject({
          variables: {
            field: { objectLabelName: objLableName }
          }
        });
  
        changeObjMasterInUseInd(response);
      }
    }
  }

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
      cell: (row) => (
        <span title={ `Id: ${row.objectMasterId}` }>
          { row.objectLabelName }
        </span>
      )
    },
    {
      name: 'In Use',
      sortable: true,
      reorder: true,
      cell: (row) => (
        <span>
          { row.objMasterInUseInd ? 'Yes' : 'No' }
        </span>
      )
    },
    {
      name: 'Action',
      sortable: false,
      reorder: false,
      cell: (row) => (
        <>
          <Button variant="info" size="sm" className="me-4"
            onClick={ editButtonHandler(row.objectLabelName) }>
            Edit
          </Button>

          <Button variant="danger" size="sm" 
            onClick={ deleteButtonHandler(row.objectLabelName) }
            disabled={ false === row.objMasterInUseInd }
          >
            Delete
          </Button>
        </>
      ),
    }
  ];

  useEffect(() => {
    if (refreshPage) {
      doObjectMasterListRefresh();
    }
  }, [refreshPage]);

  useEffect(() => {
    if (objectMasterListData) {
      setObjectMasterList(formatObjectMasterList(objectMasterListData));
    }
  }, [objectMasterListData]);

  useEffect(() => {
    if (deleteValidationObjectReponse.error) {
      console.log('Error from GraphQL API: ', deleteValidationObjectReponse.error.message);
    }
    if (deleteValidationObjectReponse.data) {
      console.log('Deletion successful', JSON.stringify(deleteValidationObjectReponse.data));
    }
  }, [deleteValidationObjectReponse]);

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
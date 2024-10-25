"use client";
import { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { loadFetchFieldMetaData } from '../../graphql/queries'
import withAuth from "../withAuth";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import mockData from "./data";
import FieldsObject from "./fieldsObject";


const addPropertiesToRowList = (rowList) => {
  return rowList.map((item) => {
    (item.fieldsCount == undefined) && (item.fieldsCount = item.fields.length);
    (item.isSelected == undefined) && (item.isSelected = false);
    return item;
  });
};

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

const fetchDataFromAPI = (isMockData) => {
  if (isMockData) {
    return data; // dummy data from a file.
  } else {
    const { error, loading, realData } = useQuery(loadFetchFieldMetaData);
    return realData;
  }
};

const ViewObjectMaster = () => {
  //const apiData = fetchDataFromAPI(true); 
  const [rawRowList, setRawRowList] = useState([...mockData.data.FetchObjectMetaData]);
  const [currSelectedRow, setCurrSelectedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  const tableColumns = [
    {
      name: 'Object Name',
      selector: row => row.objectName,
      sortable: true,
      reorder: true,
    },
    {
      name: 'No. of Fields',
      selector: row => row.fieldsCount,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Action',
      cell: () => (
        <Button variant="info" size="sm" onClick={() => navigate('/updatemasterobject/object')}>
          Edit
        </Button>
      ),
      sortable: false,
      reorder: false
    }
  ];

  const highLightSelectedRow = (row) => {
    const rowListWithSelectedMark = markSelectedRow(removeSelectedMark(rawRowList), row);
    setRawRowList(rowListWithSelectedMark);
  };

  const clickRow = (row) => {
    setCurrSelectedRow(row); // Show Object Fields section
    highLightSelectedRow(row);
  };

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
        columns={tableColumns}
        data={addPropertiesToRowList(rawRowList)}
        onRowClicked={clickRow}
      />

      {currSelectedRow && <FieldsObject dataComeFrom={'objectMaster'} selectedRow={currSelectedRow} />}
    </div>
  );
}

export default withAuth(ViewObjectMaster);
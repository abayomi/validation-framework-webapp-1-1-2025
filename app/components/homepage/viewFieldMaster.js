"use client";
import { useState } from "react";
import withAuth from "../withAuth";
import { useSelector, useDispatch } from 'react-redux'
import { nameChange, emailChange, fieldsDataChange, rulesDataChange } from "./formHomeSlice";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import RulesObject from "./RulesObject";
import data from "./data";

const ViewFieldMaster = () => {  
  const objectMetaData = data.data.FetchObjectMetaData;
  const dispatch = useDispatch()
  const [isRulesShown, setRulesTable] = useState(false);
  const [rulesData, setRulesData] = useState([]);  
  
  const createTableDataWithObjProp = (data) => {
    let tableObjTemp = [];
    data.map((item) => {
      tableObjTemp = [...tableObjTemp, ...item.fields];
    });
    return tableObjTemp
  };

  const transformData = (data) => {
    const tableObj = createTableDataWithObjProp(
      data
    );
    return (
      <div>
        <DataTable columns={columns} data={tableObj} onRowClicked={onRowClicked} 
          selectableRows={true}
          selectableRowsSingle
          selectableRowSelected={(row) => row.isSelected}
          selectableRowsHighlight
          pagination
          highlightOnHover
          selectableRowsHighlight
          pointerOnHover
        />
      </div>     
    ); 
  }

  const columns = [
      {
        name: 'Object Name',
        selector: row => row.fieldName,
        sortable: true,
        reorder: true,
      },
      {
        name: 'Field Master Name',
        selector: row => row.fieldMasterName,
        sortable: true,
        reorder: true,
      },
      {
        name: 'Field Master Definition',
        selector: row => row.fieldMasterDefinition,
        sortable: true,
        reorder: true,
      },
      {
        name: 'Action',
        cell: () => <Button variant="info" size="sm" >Edit</Button>,
        sortable: false,
        reorder: false
      }
  ];

  const onRowClicked = (row, event) => { 
      dispatch(rulesDataChange(row))
      setRulesTable(true);
      setRulesData(row);
  };

  return (
      <div>
          {transformData(objectMetaData)}
          {isRulesShown && <RulesObject data={rulesData}/>}
      </div>
  )
}

export default withAuth(ViewFieldMaster);

"use client";
import { useState } from "react";
import withAuth from "../withAuth";
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form';
import { nameChange, emailChange, fieldsDataChange } from "./formHomeSlice";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import data from "./data";
import FieldsObject from "./fieldsObject";

const Home = () => {
  const name = useSelector(state => state.user.name)
  const email = useSelector(state => state.user.email)
  const [isFieldsShown, setFieldsTable] = useState(false);
  const [fieldsData, setFieldsData] = useState([]);  
  const dispatch = useDispatch()

  const createTableDataWithObjProp = (data, tableObj) => {
    return data.map(item => {
      item.fieldsCount = item.fields.length
      console.log(item);
      tableObj.push(item)
    });
  };

  const transformData = (data) => {
    let tableObj = [];
    createTableDataWithObjProp(
      data,
      tableObj
    );
    return (
      <div>
        <h1 className="title is-1">Objects Meta Data</h1>
        <DataTable columns={columns} data={tableObj} onRowClicked={onRowClicked} 
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>     
    ); 
  }

  const columns = [
    {
      name: 'Object Master Id',
      selector: row => row.objectMasterId,
      sortable: true,
      reorder: true,
    },
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
      // cell: (row) => (
      //       <div> 
      //         {row.fieldsCount}
      //       </div>
      //       )
    }
  ];
  const onRowClicked = (row, event) => { 
    dispatch(fieldsDataChange(row))
    setFieldsTable(true);
    setFieldsData(row);
  };

  const objectMetaData = data.data.FetchObjectMetaData;
  const ExpandedComponent = ({ data1 }) => <pre>{JSON.stringify(data1, null, 2)}</pre>;
  return (
    <div>
      {transformData(objectMetaData)}
      {isFieldsShown && <FieldsObject data={fieldsData}/>}
    </div>
  )
}

export default withAuth(Home);
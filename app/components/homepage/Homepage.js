"use client";
import { useState } from "react";
import withAuth from "../withAuth";
import { useSelector, useDispatch } from 'react-redux'
import { fieldsDataChange } from "./formHomeSlice";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import data from "./data";
import FieldsObject from "./fieldsObject";
import { useNavigate } from "react-router-dom";

/**
 * @deprecated An UI at the beginning of the project is no longer used.
 */
const Home = () => {
  const name = useSelector(state => state.user.name)
  const email = useSelector(state => state.user.email)
  const [isFieldsShown, setFieldsTable] = useState(false);
  const [fieldsData, setFieldsData] = useState([]);  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  /**
   * Creates table data by adding a fieldsCount property to each item and pushing it to the table object.
   *
   * @param {Array} data - The array of data items.
   * @param {Array} tableObj - The table object to push the modified items into.
   * @returns {Array<Object>}
   */
  const createTableDataWithObjProp = (data, tableObj) => {
    return data.map(item => {
      item.fieldsCount = item.fields.length
      console.log(item);
      tableObj.push(item)
    });
  };

  /**
   * Transforms the provided data and returns a JSX element displaying a data table.
   *
   * @param {Array} data - The array of data items to transform.
   * @returns {JSX.Element}
   */
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

  const rowUpdate = () => {
    navigate('/updatemasterobject');
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
    },
    {
      name: 'edit',
      cell: () => <Button variant="info" size="sm" onClick={rowUpdate} >Edit</Button>,
      sortable: false,
      reorder: false
    }
  ];

  /**
   * Handles the click event for a row in the data table.
   *
   * @param {Object} row - The data for the clicked row.
   */
  const onRowClicked = (row) => {
    dispatch(fieldsDataChange(row))
    setFieldsTable(true);
    setFieldsData(row);
  };

  const objectMetaData = data.data.FetchObjectMetaData;

  return (
    <div>
      {transformData(objectMetaData)}
      {isFieldsShown && <FieldsObject data={fieldsData}/>}
    </div>
  )
}

export default withAuth(Home);
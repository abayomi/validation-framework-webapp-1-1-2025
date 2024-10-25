"use client";
import { useState, useEffect } from "react";
import withAuth from "../withAuth";
import { useSelector, useDispatch } from 'react-redux'
import { fieldsDataChange, objectMetaDataChange } from "./formHomeSlice";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import data from "./data";
import FieldsObject from "./fieldsObject";
import { useNavigate } from "react-router-dom";

const ViewObjectMaster = () => {    
  const [trending, setTrending] = useState([]);  
  const name = useSelector(state => state.user.name)
  const email = useSelector(state => state.user.email)
  const [isFieldsShown, setFieldsTable] = useState(false);
  const [fieldsData, setFieldsData] = useState([]);  
  let [objectMetaData, setObjectMetaData] = useState([...data.data.FetchObjectMetaData]);  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    // fetchData.onAuthenticate2().then((res)=>{
    //   console.log("====================================================================555=============================================");
    //   setTrending(res);
    // })
  }, []);
    

  const createTableDataWithObjProp = (data, tableObj) => {
    return data.map(item => {
      if(item.fieldsCount == undefined) { item.fieldsCount = item.fields.length;}
      if(item.isSelected == undefined) { item.isSelected = false;}
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
        <DataTable columns={columns} data={tableObj} onRowClicked={onRowClicked} 
          selectableRows={true}
          selectableRowsSingle
          selectableRowSelected={(row) => row.isSelected}
          selectableRowsHighlight
          pagination
          highlightOnHover
          pointerOnHover
          checkbox={false}
        />
      </div>     
    ); 
  }

  const rowUpdate = () => {
    navigate('/updatemasterobject/object');
  }

  const columns = [
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
      cell: () => <Button variant="info" size="sm" onClick={rowUpdate} >Edit</Button>,
      sortable: false,
      reorder: false
    }
  ];
  const onRowClicked = (row, event) => {
    dispatch(fieldsDataChange(row))
    
    const a = {...row}
    const b = JSON.parse(JSON.stringify(objectMetaData));   
    b.map(item => item.isSelected = false);
    a.isSelected = true;
    const foundIndex =  objectMetaData.findIndex(x => x.objectMasterId == row.objectMasterId);
    b[foundIndex] = a;
    setObjectMetaData(b);
    dispatch(objectMetaDataChange({objectMetaData: objectMetaData, row: row}))

    setFieldsTable(true);
    setFieldsData(row);
  };

  const ExpandedComponent = ({ data1 }) => <pre>{JSON.stringify(data1, null, 2)}</pre>;

  return (
    <div>
      <table>
      {trending && trending.map((post, index) => (
          <tbody key={index}>
            <tr>
              <td>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      {transformData(objectMetaData)}
      {isFieldsShown && <FieldsObject data={fieldsData} source={'objectMaster'}/>}
    </div>
  )
}

export default withAuth(ViewObjectMaster);
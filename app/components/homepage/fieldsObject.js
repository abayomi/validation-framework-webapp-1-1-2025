"use client";
import { useState } from "react";
import withAuth from "../withAuth";
import { useSelector, useDispatch } from 'react-redux'
import { rulesDataChange } from "./formHomeSlice";
import DataTable from 'react-data-table-component';
import RulesObject from "./RulesObject";
import Button from 'react-bootstrap/Button';

const FieldsObject = ( props ) => {
    const { source } = props
    const dispatch = useDispatch()
    const [isRulesShown, setRulesTable] = useState(false);
    const [rulesData, setRulesData] = useState([]);  
    const fieldsData = useSelector(state => state.user.fieldsData)
    
    const transformData = (data) => {
        return (
            <div>
            <h2 className="title is-1">Object Fields</h2>
            <DataTable columns={columns} data={data} onRowClicked={onRowClicked} 
              highlightOnHover
              pointerOnHover
              pagination />
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
        if(source !== 'objectMaster'){
          setRulesTable(true);
          setRulesData(row);
        }
    };

    return (
        <div>
            {transformData(fieldsData)}
            {isRulesShown && <RulesObject data={rulesData}/>}
        </div>
    )
}

export default FieldsObject;
"use client";
import { useState } from "react";
import withAuth from "../withAuth";
import { useSelector, useDispatch } from 'react-redux'
import { rulesDataChange } from "./formHomeSlice";
import DataTable from 'react-data-table-component';
import RulesObject from "./RulesObject";

const FieldsObject = () => {
    const dispatch = useDispatch()
    const [isRulesShown, setRulesTable] = useState(false);
    const [rulesData, setRulesData] = useState([]);  
    const fieldsData = useSelector(state => state.user.fieldsData)
    
    const transformData = (data) => {
        return (
            <div>
            <h1 className="title is-1">Fields</h1>
            <DataTable columns={columns} data={data} onRowClicked={onRowClicked} 
              highlightOnHover
              pointerOnHover
              pagination />
            </div>     
        ); 
    }

    const columns = [
        {
          name: 'Field Master Id',
          selector: row => row.fieldMasterId,
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
          name: 'Field Name',
          selector: row => row.fieldName,
          sortable: true,
          reorder: true,
        },
        {
          name: 'Field Master Definition',
          selector: row => row.fieldMasterDefinition,
          sortable: true,
          reorder: true,
        }
    ];

    const onRowClicked = (row, event) => { 
        dispatch(rulesDataChange(row))
        setRulesTable(true);
        setRulesData(row);
    };

    return (
        <div>
            {transformData(fieldsData)}
            {isRulesShown && <RulesObject data={rulesData}/>}
        </div>
    )
}

export default withAuth(FieldsObject);
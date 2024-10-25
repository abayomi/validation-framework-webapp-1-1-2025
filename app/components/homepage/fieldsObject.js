"use client";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { rulesDataChange } from "./formHomeSlice";
import DataTable from 'react-data-table-component';
import RulesObject from "./RulesObject";
import Button from 'react-bootstrap/Button';

const FieldsObject = ( props ) => {
    const { dataComeFrom, selectedRow } = props;
    const dispatch = useDispatch();
    const [isRulesShown, setIsRulesShown] = useState(false);
    const [rulesData, setRulesData] = useState([]);

    const tableColumns = [
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
        cell: () => <Button variant="info" size="sm">Edit</Button>,
        sortable: false,
        reorder: false
      }
    ];

    const clickRow = (row) => { 
      dispatch(rulesDataChange(row));
      
      if(dataComeFrom !== 'objectMaster') {
        setIsRulesShown(true);
        setRulesData(row);
      }
    };

    return (
      <div>
          <h2 className="title is-1">Object Fields</h2>
          <div id="object-fields-table">
            <DataTable 
              highlightOnHover
              pointerOnHover
              pagination 
              columns={tableColumns} 
              data={selectedRow.fields}
              onRowClicked={clickRow}
            />
          </div>
          { isRulesShown && <RulesObject data={rulesData} /> }
      </div>
    );
}

export default FieldsObject;
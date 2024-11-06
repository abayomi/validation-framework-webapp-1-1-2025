"use client";

import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { rulesDataChange } from "./formHomeSlice";
import { propertyGet } from "../../lib/arrayHelper";
import RulesObject from "./RulesObject";

const FieldsObject = ( props ) => {
    const { dataComeFrom, objectFieldsData } = props;
    const dispatch = useDispatch();

    const dataTableColumns = [
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

    // About custom styles, refer to
    //    1. https://react-data-table-component.netlify.app/?path=/docs/api-custom-styles--docs
    //    2. https://github.com/jbetancur/react-data-table-component/blob/master/src/DataTable/styles.ts
    const customStyles = {
      expanderRow: {
        style: {
          width: '90%',
          margin: '1.5rem auto'
        },
      }
    };

    // About expandableRows, refer to https://react-data-table-component.netlify.app/?path=/docs/api-props--docs#row-expander
    const rowExpander = (fieldData) => (
      <RulesObject
        ruleList={ propertyGet(fieldData, 'data.rules', []) } 
        isRowExpanded={false}
      />
    );

    return (
      <div>
          <h2 className="title is-1">Object Fields</h2>
          <div id="object-fields-table">
            <DataTable 
              highlightOnHover
              pointerOnHover
              pagination
              columns={dataTableColumns}
              data={objectFieldsData}
              expandableRows={true}
              customStyles={customStyles}
              expandableRowsComponent={rowExpander}
              onRowClicked={clickRow}
            />
          </div>
      </div>
    );
}

export default FieldsObject;
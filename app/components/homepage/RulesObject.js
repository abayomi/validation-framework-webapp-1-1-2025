"use client";

import DataTable from "react-data-table-component";
import { propertyGet } from "../../lib/arrayHelper";
import withAuth from "../withAuth";
import Conditions from "./Conditions";

/**
 * Component: Show the list of validation rules of an object field
 * @returns {JSX.Element}
 */
const RulesObject = ({ruleList, isRowExpanded = true}) => {
    // About DataTable's column, refer to https://react-data-table-component.netlify.app/?path=/docs/api-columns--docs
    const columns = [
        {
          name: 'Id',
          selector: row => row.id,
          reorder: true,
          width: '10%'
        },
        {
          name: 'Short Description',
          selector: row => row.shortDescription,
          reorder: true,
          width: '20%'
        },
        {
          name: 'Long Description',
          selector: row => row.longDescription,
          reorder: true,
          width: '30%',
          wrap: true
        },
        {
          // There is no need to set the width of this column to make it more adaptive. 
          // Allow the content to wrap, because some messages can be long.
          name: 'Error Message',
          selector: row => row.errorMessage,
          reorder: true,
          wrap: true
        }
    ];

    if (!ruleList) {
      return <></>;
    }

    return (
      <div>
        <h2 className="title is-1" name="show_rules">Rules</h2>
        <DataTable
          highlightOnHover
          pointerOnHover
          pagination={ruleList.length > 10 /* The pagination part will not be displayed when the number of records is less than 10. */}
          expandableRows
          columns={columns}
          data={ruleList}
          expandableRowExpanded={() => isRowExpanded}
          expandableRowsComponent={({data}) => <Conditions conditionData={ propertyGet(data, 'conditions', []) } />}
        />
      </div>
    );
}

export default withAuth(RulesObject);
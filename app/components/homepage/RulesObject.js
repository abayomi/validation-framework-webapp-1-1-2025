"use client";

import DataTable from "react-data-table-component";
import { propertyGet } from "../../lib/arrayHelper";
import withAuth from "../withAuth";
import Conditions from "./Conditions";

const RulesObject = ({ruleList, isRowExpanded = true}) => {
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
          width: '30%'
        },
        {
          name: 'Error Message',
          selector: row => row.errorMessage,
          reorder: true,
          // width: '40%', // There is no need to set the width of this column to make it more adaptive.
          wrap: true
        }
    ];

    if (!ruleList) {
      return <></>;
    }

    return (
      <div>
        <h2 className="title is-1">Rules</h2>
        <DataTable
          highlightOnHover
          pointerOnHover
          pagination
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
"use client";

import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { propertyGet } from "../../lib/arrayHelper";
import withAuth from "../withAuth";
import Conditions from "./Conditions";

const RulesObject = ({ruleList, isRowExpanded = true}) => {
    const columns = [
        {
          name: 'Id',
          selector: row => row.id,
          reorder: true,
        },
        {
          name: 'Short Description',
          selector: row => row.shortDescription,
          reorder: true,
        },
        {
          name: 'Long Description',
          selector: row => row.longDescription,
          reorder: true,
        },
        {
          name: 'Error Message',
          selector: row => row.errorMessage,
          reorder: true,
        },
        // {
        //   name: 'Action',
        //   cell: () => <Button variant="info" size="sm" >Edit</Button>,
        //   sortable: false,
        //   reorder: false
        // }
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
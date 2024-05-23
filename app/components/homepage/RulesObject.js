"use client";
import withAuth from "../withAuth";
import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component';
import Conditions from "./Conditions";

const RulesObject = () => {
    const dispatch = useDispatch()
    const rulesData = useSelector(state => state.user.rulesData)
    console.log(rulesData);

    const transformData = (data) => {
        return (
            <div>
            <h1 className="title is-1">Rules</h1>
            <DataTable columns={columns} data={data} expandableRows
              expandableRowsComponent={Conditions} expandableRowExpanded={row => true} 
              highlightOnHover
              pointerOnHover
              pagination 
            />
            </div>     
        ); 
    }

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
        }
    ];

    return (
        <div>
            {transformData(rulesData)}
        </div>
    )
}

export default withAuth(RulesObject);
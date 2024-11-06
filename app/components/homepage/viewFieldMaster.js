"use client";
import { useState } from "react";
import withAuth from "../withAuth";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { loadFetchFieldMetaData } from '../../graphql/fieldMasterQueries'
import RulesObject from './RulesObject';
import { dialectCodeOptions } from "../config/dialectCodeMap";
import { uniqueRecords } from "../../lib/arrayHelper";

const ViewFieldMaster = () => {
  const [rulesData, setRulesData] = useState([]);
  const [dialectCode, setDialectCode] = useState("us_en");
  const navigate = useNavigate();
  const {error, loading, data, refetch} = useQuery(loadFetchFieldMetaData, {
    variables: { dialectCode: dialectCode },
  });
  const [filterText, setFilterText] = useState('');

  const filteredItems = data ? data.FetchFieldMetaData.filter(item => 
    item.fieldName && item.fieldName.toLowerCase().includes(filterText.toLowerCase())
  ):[];

  const columns = [
    {
      name: 'Field Master Id',
      selector: row => row.fieldMasterId,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Field Master Name',
      selector: row => row.fieldName,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Field Master Definition',
      selector: row => row.fieldDefinition,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Action',
      cell: (row) =>  (
      <Button variant="info" size="sm" onClick={() => rowUpdate(row)}>
        Edit
      </Button>),
      sortable: false,
      reorder: false,
    }
  ];

  const rowUpdate = (fieldData) => {
    navigate(`/updatemasterobject/field`, { state: { fieldData } });
  };

  const onRowClicked = (row) => {
    const uniqueRules = uniqueRecords(row.rules);
    setRulesData(uniqueRules);
  };

  const handleDialectCodeChange = (e) => {
    const { name, value } = e.target;
    setFilterText('');
    setDialectCode(value);
  };

  return (
    <div>
      <select className="mx-3 px-2 py-1" aria-label="Dialect code" value={dialectCode} onChange={handleDialectCodeChange}>
        {Object.entries(dialectCodeOptions).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
        ))}
      </select>
      <input 
        type="text" 
        placeholder="Filter By Name" 
        value={filterText} 
        onChange={e => setFilterText(e.target.value)} 
      />
      <Button size="sm" className="ms-3" onClick={() => refetch()}>Refresh</Button>
      {loading 
        ? <p>Loading data...</p> 
        : data && <DataTable 
          columns={columns} 
          data={filteredItems} 
          onRowClicked={onRowClicked}
          selectableRows={true}
          selectableRowsSingle
          selectableRowSelected={row => row.isSelected}
          selectableRowsHighlight
          pagination
          highlightOnHover
          pointerOnHover
        />
      }
      {error && <p>Error data:{error}</p>}
      {rulesData.length > 0
        ? <RulesObject ruleList={rulesData}  />
        : <h4 className="title is-1">No Rules</h4>
      }
    </div>
  );
};

export default withAuth(ViewFieldMaster);

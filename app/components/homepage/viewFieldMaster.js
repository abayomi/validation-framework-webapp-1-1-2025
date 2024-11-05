"use client";
import { useState, useEffect } from "react";
import withAuth from "../withAuth";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { loadFetchFieldMetaData } from '../../graphql/queries'
import RulesObject from './RulesObject';

const ViewFieldMaster = () => {
  const [rulesData, setRulesData] = useState([]);
  const navigate = useNavigate();
  const { error, loading, data, refetch } = useQuery(loadFetchFieldMetaData);
  const [filterText, setFilterText] = useState('');

  const filteredItems = data ? data.FetchFieldMetaData.filter(item => 
    item.fieldMasterId && item.fieldMasterId.toLowerCase().includes(filterText.toLowerCase())
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
    useNavigate
  };

  const onRowClicked = (row) => {
    const uniqueRules = row.rules.reduce((acc, current) => {
        if (!current.id) {
          return acc;
        }
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
    setRulesData(uniqueRules);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Filter By Id" 
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
      {error && (
        <p>Error data:{error}</p>
      )}
      {rulesData.length > 0 ? <RulesObject data={rulesData} /> : ""}
    </div>
  );
};

export default withAuth(ViewFieldMaster);

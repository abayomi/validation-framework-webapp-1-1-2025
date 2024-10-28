"use client";
import { useState, useEffect } from "react";
import withAuth from "../withAuth";
import { nameChange, emailChange, fieldsDataChange, rulesDataChange } from "./formHomeSlice";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { loadFetchFieldMetaData } from '../../graphql/queries'
import RulesObject from './RulesObject';

const ViewFieldMaster = () => {
  const dispatch = useDispatch();
  const [isRulesShown, setRulesTable] = useState(false);
  const [rulesData, setRulesData] = useState([]);
  const navigate = useNavigate();

  const { error, loading, data, refetch } = useQuery(loadFetchFieldMetaData);
  const [filterText, setFilterText] = useState('');
  const [objectMetaData, setObjectMetaData] = useState([]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching data:', error);
    }
    if (loading) {
      console.log('Loading data...');
    }
    if (data) {
      console.log(data);
      setObjectMetaData(data.FetchFieldMetaData);
    }
  }, [error, loading, data]);

  const filteredItems = objectMetaData.filter(item => 
    item.fieldMasterId && item.fieldMasterId.toLowerCase().includes(filterText.toLowerCase())
  );

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

  const onRowClicked = (row, event) => {
    dispatch(rulesDataChange(row));
    setRulesTable(true);
    setRulesData(row.rules);
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
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <DataTable 
          columns={columns} 
          data={filteredItems} 
          onRowClicked={onRowClicked} 
          selectableRows={true}
          selectableRowsSingle
          selectableRowSelected={(row) => row.isSelected}
          selectableRowsHighlight
          pagination
          highlightOnHover
          pointerOnHover
          rowProps={(row) => ({ 'data-testid': `row-${row.id}` })}
        />
      )}
      {error && (
        <p>Error data:{error}</p>
      )}
      {isRulesShown && <RulesObject data={rulesData} />}
    </div>
  );
};

export default withAuth(ViewFieldMaster);

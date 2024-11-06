"use client";
import { useState } from "react";
import withAuth from "../withAuth";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { loadFetchFieldMetaData } from '../../graphql/fieldMasterQueries'
import RulesObject from './RulesObject';
import { defaultDialectCode } from "../config/dialectCodeMap";
import { uniqueRecords } from "../../lib/arrayHelper";
import FilterList, { doFilterList } from "./filterList";

const ViewFieldMaster = () => {
  const [rulesData, setRulesData] = useState([]);
  const [dialectCode, setDialectCode] = useState(defaultDialectCode);
  const navigate = useNavigate();
  const {error, loading, data, refetch} = useQuery(loadFetchFieldMetaData, {
    variables: { dialectCode: dialectCode },
  });
  const [filterText, setFilterText] = useState('');

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

  const fieldMasterList = data ? doFilterList(data.FetchFieldMetaData, 'fieldName', filterText) : [];

  return (
    <>
      <FilterList
        dialectCode={dialectCode}
        filterText={filterText}
        inputPlaceHolder="Filter By Field Master Name"
        onRefreshClicked={() => refetch()}
        onFilterTextChanged={(e) => setFilterText(e.target.value)}
        onDialectCodeChanged={(e) => {
          setFilterText('');
          setDialectCode(e.target.value);
        }}
      />

      {loading 
        ? <p>Loading data...</p> 
        : data && <DataTable 
          columns={columns} 
          data={fieldMasterList} 
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
    </>
  );
};

export default withAuth(ViewFieldMaster);

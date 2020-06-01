import React, { useState, useEffect } from 'react';
import { getTableData } from '../Services';

const Table = ({ textDisbaled }) => {
  const [delimiter, setDelimitr] = useState('');
  const [lines, setLines] = useState(null);
  const [allTableData, setAllTableData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    populateTableData();
  }, [allTableData]);

  const onDelimiterChanged = (event) => {
    if (event) {
      setDelimitr(event.target.value);
    } else {
      setDelimitr('');
    }
  };

  const onLineCountChanged = (event) => {
    setLines(event.target.value);
  };

  const onGetTableData = async () => {
    const allTableData = await getTableData();
    setAllTableData(allTableData);
  };

  // To populate the table on the basis of given delimiter and rows
  const populateTableData = () => {
    const tableDataObj = [];
    allTableData.map((row) => {
      const rowSplitArray = row.split(delimiter);
      const rowObj = {
        name: rowSplitArray[0],
        address: rowSplitArray[1],
        city: rowSplitArray[2],
        country: rowSplitArray[3],
        zipCode: rowSplitArray[4],
      };
      tableDataObj.push(rowObj);
    });

    setTableData(tableDataObj.slice(0, lines));
  };

  return (
    <div className='ui center aligned container'>
      <div className='ui container'>
        <span
          className='ui label'
          style={{ marginRight: '100px', fontSize: '20px' }}
        >
          Delimiter
          <input
            placeholder='Use the delimiter used in the input file'
            style={{ marginLeft: '100px', textAlign: 'center' }}
            className='ui focus input'
            type='text'
            id='delimeter'
            value={delimiter}
            onChange={onDelimiterChanged}
            disabled={textDisbaled || delimiter}
          ></input>
        </span>{' '}
        <span
          className='ui label'
          style={{ marginLeft: '100px', fontSize: '20px' }}
        >
          Lines
          <input
            placeholder='Number of rows to see from Total Rows from input file'
            disabled={textDisbaled}
            style={{ marginLeft: '100px', textAlign: 'center' }}
            className='ui focus input'
            type='text'
            id='delimeter'
            value={lines}
            onChange={onLineCountChanged}
          ></input>
        </span>
      </div>
      <hr />
      <button
        disabled={!delimiter || !lines}
        onClick={onGetTableData}
        className='ui button primary'
      >
        Populate Table
      </button>
      <button
        disabled={!delimiter}
        onClick={() => onDelimiterChanged('')}
        className='ui button primary'
      >
        Reset Delimiter
      </button>
      <table className='ui celled table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>ZipCode</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr>
              <td>{row.name}</td>
              <td>{row.address}</td>
              <td>{row.city}</td>
              <td>{row.country}</td>
              <td>{row.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

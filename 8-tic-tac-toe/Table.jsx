import React, { memo } from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
    return (
        <table>
            <tbody>
            {Array(tableData.length).fill().map((tr, i) => {
            return <Tr key={i} rowData={tableData[i]} rowIdx={i} dispatch={dispatch} />
            })}
            </tbody>
        </table>
    );
}

export default Table;
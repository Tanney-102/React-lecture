import React, { memo } from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIdx, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => {
            return <Td key={i} rowIdx={rowIdx} cellIdx={i} cellData={rowData[i]} dispatch={dispatch} />
            })}
        </tr>
    );
};

export default memo(Tr);
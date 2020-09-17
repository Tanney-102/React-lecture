import React, { useContext, memo } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = ({ rowIdx }) => {
    const { tableData } = useContext(TableContext);

    return(
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td, i) => <Td key={i} rowIdx={rowIdx} cellIdx={i} />)}
        </tr>
    );
}

export default memo(Tr);
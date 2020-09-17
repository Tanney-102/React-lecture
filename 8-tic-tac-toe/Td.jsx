import React, { useCallback, memo, useEffect, useRef } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = ({ rowIdx, cellIdx, cellData, dispatch }) => {
    // rerendering 원인 파악하기
    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIdx === ref.current[0], cellIdx === ref.current[1], cellData === ref.current[2], dispatch === ref.current[3]);
        ref.current = [rowIdx, cellIdx, cellData, dispatch];
    }, [rowIdx, cellIdx, cellData, dispatch]);

    const onClickTd = useCallback(() => {
        console.log(rowIdx, cellIdx);
        console.log(cellData);
        if(cellData) return;

        dispatch({ type: CLICK_CELL, row: rowIdx, cell: cellIdx });
    }, [cellData]);

    

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
};

export default memo(Td);
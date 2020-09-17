import React, { useContext, useCallback, memo, useMemo } from 'react';
import { CODE, TableContext, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.CLICKED_MINE:
            return {
                background: 'red',
            };
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'skyblue',
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow',   
            };
        default:
            return {
                background: 'white',
            };
    }
};

const getTdText = (code) => { 
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return '';
        case CODE.CLICKED_MINE:
            return '펑!!';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code || '';
    }
};

const Td = ({ rowIdx, cellIdx }) => {
    const { tableData, halted, dispatch } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted) {
            return;
        }
        switch(tableData[rowIdx][cellIdx]) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIdx, cell: cellIdx });
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIdx, cell: cellIdx });
                return;
            default:
                return;
        }
    }, [tableData[rowIdx][cellIdx], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if(halted) {
            return;
        }

        switch(tableData[rowIdx][cellIdx]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIdx, cell: cellIdx });
                return
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({ type: QUESTION_CELL, row: rowIdx, cell: cellIdx });
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({ type: NORMALIZE_CELL, row: rowIdx, cell: cellIdx });
                return;
            default:
                return;
        }
    }, [tableData[rowIdx][cellIdx], halted]);

    return useMemo(() => (
        <td 
        style={getTdStyle(tableData[rowIdx][cellIdx])}
        onClick={onClickTd}
        onContextMenu={onRightClickTd}>
            {getTdText(tableData[rowIdx][cellIdx])}
        </td>
    ), [tableData[rowIdx][cellIdx]]);
}

export default memo(Td);
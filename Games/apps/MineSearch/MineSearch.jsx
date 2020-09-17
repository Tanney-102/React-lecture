import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';
import Timer from './Timer';

// cell code
export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4, // 물음표를 했는데 그 아래 지뢰가 있는경우
    FLAG_MINE: -5, // 깃발 아래 지뢰
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 opened + 주변 지뢰 수
};

// TableContext 초기화
export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
});

// functions
const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => i);
    const shuffle = [];

    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1);
        shuffle.push(chosen);
    }

    const data = [];
    for(let i=0; i< row; i++) {
        const rowData = [];
        for(let j=0; j<cell; j++) {
            rowData.push(CODE.NORMAL);
        }
        data.push(rowData);
    }

    for(let i=0; i<shuffle.length; i++) {
        const ver = Math.floor(shuffle[i] / cell);
        const hor = shuffle[i] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
};

// Reducer
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE'; 
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME: {
            return {
                ...state,
                data: {
                    row: action.row, 
                    cell: action.cell, 
                    mine: action.mine
                },
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                timer: 0,
                flagNum: action.mine,
                result: '',
                opened: 0,
            };
        }
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData.forEach((row, i) =>{
                tableData[i] = [...state.tableData[i]];
            });

            // direction => 12시부터 시계방향
            const dir_x = [0, 1, 1, 1, 0, -1, -1, -1];
            const dir_y = [1, 1, 0, -1, -1, -1, 0, 1];
            // open한 칸 수 세기
            let openedNum = 0;

            const checkAround = (row, cell) => {
                openedNum++;

                let count = 0;

                for(let i=0; i<8; i++) {
                    const _row = row + dir_y[i];
                    const _cell = cell + dir_x[i];
    
                    if(_row < 0 || _row >= tableData.length || _cell < 0 || _cell >= tableData[0].length)
                        continue;
                    
                    const code = tableData[_row][_cell];
    
                    if(code === CODE.MINE || code === CODE.FLAG_MINE || code === CODE.QUESTION_MINE) {
                        count++;
                    }
                }

                tableData[row][cell] = count;

                if(!count) {
                    for(let i=0; i<8; i++) {
                        const _row = row + dir_y[i];
                        const _cell = cell + dir_x[i];
        
                        if(_row < 0 || _row >= tableData.length || _cell < 0 || _cell >= tableData[0].length)
                            continue;
                        
                        if(tableData[_row][_cell] < 0)
                            checkAround(_row, _cell);
                    }
                }
            };

            checkAround(action.row, action.cell);

            const { data, opened } = state;
            if(data.row * data.cell - data.mine === opened + openedNum) {
                for(let i=0; i<data.row; i++) {
                    for(let j=0; j<data.cell; j++) {
                        if(tableData[i][j] === CODE.QUESTION_MINE || tableData[i][j] === CODE.MINE) {
                            tableData[i][j] = CODE.FLAG_MINE;
                        }
                    }
                }

                return {
                    ...state,
                    tableData,
                    halted: true,
                    result: `승리!! - ${state.timer}초`
                }
            }

            return {
                ...state,
                tableData,
                opened: opened + openedNum,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
                result:'실패..',
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return{
                ...state,
                tableData,
                flagNum: state.flagNum - 1,
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return{
                ...state,
                tableData,
                flagNum: state.flagNum + 1,
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return{
                ...state,
                tableData,
            }
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
};

const initState = {
    data: {},
    tableData: [],
    timer: 0,
    flagNum: 0,
    result: '',
    halted: true,
    opened: 0,
};

//
// Component
const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    
    const { tableData, timer, result, halted, flagNum } = state;
    const value = useMemo(() => ({ tableData: tableData, halted: halted ,dispatch}), [tableData, halted]);
    // useMemo를 쓰지 않으면 render 될때마다 context provider의 value가 변함 => 성능 문제

    return (
        <TableContext.Provider value={value}>
            <Form />
            <Timer timer={timer} />
            <div>flag: {flagNum}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
    // Context Api를 통해 데이터를 자손에게 보냄  
    // 자손에서는 useContext로 받음
}

export default MineSearch;
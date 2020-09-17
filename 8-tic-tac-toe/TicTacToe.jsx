import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
    winner : '',
    turn : 'O',
    tableData: [ 
        ['', '', ''], 
        ['', '', ''], 
        ['', '', ''] 
    ],
    recentCell: [-1, -1],
    redo: false,
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const SET_REDO = 'SET_REDO';

const reducer = (state, actions) => {
    switch(actions.type) {
        case SET_WINNER:
            // state.winner = action.winner 이렇게 하면 안됨.
            return {
                ...state,
                winner: actions.winner,
            }
        case CLICK_CELL:
            const tableData = [...state.tableData];
            tableData[actions.row] = [...tableData[actions.row]];
            tableData[actions.row][actions.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [actions.row, actions.cell],
            };
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        case RESET_GAME:
            return {
                winner : '',
                turn : 'O',
                tableData: [ 
                    ['', '', ''], 
                    ['', '', ''], 
                    ['', '', ''] 
                ],
                recentCell: [-1, -1],
                redo: false,
            };
        case SET_REDO:
            return {
                ...state,
                redo: actions.redo,
            };
        default:
            return state;
    }
}
// reducer안에 state를 어떻게 바꿀지 적어줌 

const TicTacToe = () => {
    //useReducer를 통해 state를 하나의 변수로 관리
    const [state, dispatch] = useReducer(reducer, initialState);
    // dispatch안에 action객체가 들어감
    // dispatch({ type: SET_WINNER, winner: '0' });
    // => reducer에 위 action객체를 넣어 실행
    // useReducer의 dispatch는 비동기

    const { winner, turn, tableData, recentCell, redo } = state;

    useEffect(() => {
        let win = false;
        const [row, cell] = recentCell;

        if(row < 0) return; // componentDidMount 거르기

        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }

        if(win) {
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: SET_REDO, redo: true });
        } else { 
            // 무승부 검사
            let all = true;
            tableData.forEach(row => {
                row.forEach(cell => {
                    if(cell === '')
                        all = false;
                });
            });

            if(all) {
                alert('무승부입니다!');
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);

    const resetGame = () => {
        dispatch({ type: RESET_GAME });
    }

    return (
        <>
            <Table tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리</div>}
            {redo && <button onClick={resetGame}>reset</button>}
        </>
    );
};

export default TicTacToe;
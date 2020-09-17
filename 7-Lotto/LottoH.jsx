import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i+1);
    const shuffle = [];

    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

// useMemo => 함수의 리턴값을 기억
// useCallback => 함수 자체를 기억
const Lotto = () => {
    const lottoNums = useMemo(() => getWinNumbers(), []);
    // []에 들어간 요소가 바뀌지 않으면 다시 실행되지 않음
    // 콜백의 리턴값을 기억
    const [winNumbers, setWinNumbers] = useState(lottoNums);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        console.log('useEffect');
        runTimeouts();
        return () => {
            timeouts.current.forEach(t => {
                clearTimeout(t);
            });
        };
    }, [timeouts.current]);

    const runTimeouts = () => {
        for(let i=0; i<6; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => {
                    return [...prevWinBalls, winNumbers[i]];
                });
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    }

    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);

        timeouts.current = [];
    }, []);
    // useCallback을 사용하면 함수 컴포넌트가 재실행되어도 해당 콜백이 새로 생성되는 것을 방지
    // 두번째 인자에 어떤 state도 들어가지 않으면 state의 초기값만 기억
    // []에 넣어놓은 state에 한해 변경이 있을 때만 useCallback실행 해당하는 state를 기억
    // 자식 컴포넌트에게 props로 함수를 전달할때는 useCallback으로 전달해야함
    // 그렇지 않으면 매순간 자식 컴포넌트가 리렌더링 됨.

    return (
        <>
            <div>당첨숫자</div>
            <div id="result">
                {winBalls.map(v => <Ball key={v} number={v} />)}
            </div>
            <div>Bonus!!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!!</button>}
        </>
    );  
};

export default Lotto;
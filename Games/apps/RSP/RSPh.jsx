import React, { useState, useRef, useEffect, } from 'react';

const imgCoord = [52, 93, 10];

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgIdx, setImgIdx] = useState(0);
    const [score, setScore] = useState(0);
    const interval = useRef(null);

    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        console.log('begin');
        changeHand();
        return () => { // componetWillUnmount 역할
            console.log('end')
            clearInterval(interval.current);
        };
    }, []); // [] 안의 state가 바뀔때마다 콜백을 실행, 비어있으면 componentDidMount와 같은 역할
    // useEffect를 여러번 쓰는 경우도 있음 => state마다 effect를 주고 싶을 때

    const changeHand = () => {
        interval.current = setInterval(() => {
            setImgIdx((prevImgIdx) => {
                return (prevImgIdx + 1) % 3;
            });
        }, 100);
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);

        const judge = (choice - imgIdx + 3) % 3;

        if(judge === 2) {
            setScore((prevScore) => {
                return prevScore + 1;
            });
            setResult('Win!!');
        } else if(judge === 1) {
            setScore((prevScore) => {
                return prevScore - 1;
            });
            setResult('Lose..');
        } else if(judge === 0) {
            setResult('Draw');
        }

        setTimeout(() => {
            setResult('');
            changeHand();
        }, 1500);
    }

    return (
        <>
            <div id="computer" style={{backgroundPosition:`${imgCoord[imgIdx]}% 30%`}}></div>
            <div>{result}</div>
            <button id="rock" className="btn" onClick={onClickBtn(0)}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn(1)}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn(2)}>보</button>
            <div>현재 {score}점</div>
        </>
    );
};



export default RSP;

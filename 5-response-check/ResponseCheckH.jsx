import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    // Hooks에서 class의 this 변수와 같은 애들이 필요할때도 Ref를 쓴다.
    // current에 값을 넣어준다.
    // state가 바뀌면 화면이 새로 렌더링 되지만 ref는 변경되어도 새로 렌더링 되지 않는다.
    // 값이 바뀌기는 하지만 화면에는 영향을 주고 싶지 않을 때 ref를 사용한다.
    const timeout = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);

    // methods
    const onClickScreen = () => {
        if(state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭'); 

                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if(state === 'ready') {
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if(state === 'now') {
            endTime.current = new Date();
            
            setState('waiting');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
            setMessage('클릭해서 시작하세요');
        }
    };

    const renderCurTime = () => {
        if(result.length) {
            return (
                <div>반응시간 : {result[result.length - 1]}ms</div>
            );
        }
    };

    const renderAvgTime = () => {
        if(result.length) {
            return (
                <div>평균시간 : {Math.floor(result.reduce((r, cur) => r + cur) /result.length)}ms</div>
            );
        }
    };

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderCurTime()}
            {renderAvgTime()}
        </>
    );
}

export default ResponseCheck
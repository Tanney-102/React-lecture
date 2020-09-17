import React, { useState, memo }  from 'react';
import Try from './Try';

// hooks는 PureComponent나 shouldComponentUpdate가 없음
// => React.memo를 사용(메모이제이션)
// 컴포넌트를 memo()로 감싸줌

// 랜덤한 숫자 4개를 겹치지 않게 뽑음
function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const array = [];
    for(let i=0; i<4;i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }

    return array;
}

const NumberBaseball =  memo( () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [tries, setTries] = useState([]);
    const [answer, setAnswer] = useState(getNumbers());
    // tries는 push 쓰면 안됨
    // push는 기존 배열에 추가를 하는 것이기 때문에 react가 변경사항을 감지할 수 없음
    // ex
    // const arr = [1];
    // const arr2= [...arr, 2]
    // >> arr2 : [1, 2]
    // >> arr1 === arr2 => false
    
    const onChangeInput = (e) => {
        setValue(e.target.value);
    }
    // class의 경우
    // => 함수를 쓰지 않고 onCh...() {} 이런식으로 선언하면 this를 쓸 수 없음(this가 달라짐)
    // constructor안에서 this를 bind해주면 사용가능
    // this.noCha... = this.onCha....bind(this)

    const getResult = () => {
        if(value === answer.join('')) {
            setResult('HomeRun!!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: 'HomeRun!!'}];
            });
            
            alert('게임을 다시 시작합니다.');

            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else {
            const answerArr = value.split('').map(v => parseInt(v));
            let strike = 0;
            let ball = 0;

            if(tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join('')}입니다.`);

                alert('게임을 다시 시작합니다.');

                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for(let i=0; i<4; i++) {
                    if(answerArr[i] === answer[i]) {
                        strike += 1;
                    } else if(answer.includes(answerArr[i])) {
                        ball += 1;
                    }
                }
                setTries(prevTries => [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`} ]);
            }
        }
    }

    return (
        <>
            <h1>{result}</h1>
            <input type="number" maxLength={4} value={value} onChange={onChangeInput} />
            <button onClick={getResult}>click</button>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return <Try key={`${i+1}차 시도`} tryInfo={v} index={i} />
                })} {/*Try안에 value, index 등 => props / 부모(NumberBaseball)에서 자식(Try)로 데이터를 전달*/}
            </ul>
        </>
    );
});

export default NumberBaseball;

// default로 export => 무조건 한 번 
// import name from ...

// export => 여러변 쓸 수 있음
// import { name, } from ...

// 두 가지를 한 파일에 쓸 수 있음

// export default, module.exports => 다르지만 호환됨
// import 문법은 es2015
// require, module.exports => 노드 문법
// 바벨이 있기때문에 import도 사용 가능
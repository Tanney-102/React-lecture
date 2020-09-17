import React, { memo } from 'react';

const Try = memo( ({ tryInfo, index }) => {
    // props를 바꿔야할 경우? => 어지간하면 바꾸지 말자
    // props를 state에 넣을 수 있다.
    // const [result ,setResult] = useState(tryInfo.result);
    
    return (
        <li>
            {`${index+1}차 시도 - ${tryInfo.try} : ${tryInfo.result}`} 
        </li>
    );
});

export default Try;
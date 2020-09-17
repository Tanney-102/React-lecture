const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('나무');
    const [value, setValue] = useState('');
    const [result, setResult] =useState('');

    const inputRef = useRef(null);

    // functions
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const checkAnswer = () => {
        if(value === '') return;

        if(word[word.length - 1] === value[0]) {
            setWord(value);
            setValue('');
            setResult('Good!');
            
            inputRef.current.focus();
        } else {
            setWord(value);
            setValue('');
            setResult('Bad..');

            inputRef.current.focus();
        }
    };

    const onKeyUp = (e) => {
        if(e.key === 'Enter')
        checkAnswer();
    }

    return (
        <>
            <div>{word}</div>
            <input type="text" ref={inputRef} value={value} onChange={onChangeInput} onKeyUp={onKeyUp} /> 
            <button onClick={checkAnswer}>click</button>
            <div>{result}</div>
        </>
    );
}

module.exports = WordRelay;
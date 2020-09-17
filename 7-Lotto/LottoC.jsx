import React, { Component } from 'react';
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

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
    };

    timeouts = [];

    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
    } // 어떤 상황에서 어떤 작업을 할지~
    // 조건을 설정하지 않으면 setState가 실행될때, 즉 render가 새로 될 때마다 로직이 실행됨

    componentWillUnmount() {
        this.timeouts.forEach(t => {
            clearTimeout(t);
        });
    }

    runTimeouts = () => {
        const { winNumbers } = this.state;

        for(let i=0; i<6; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) =>{
                    return {
                       winBalls: [...prevState.winBalls, winNumbers[i]],
                    }
                });
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo:true,
            });
        }, 7000);
    };

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeouts = [];
    };

    test = true;

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨숫자</div>
                <div id="result">
                    {winBalls.map(v => <Ball key={v} number={v} />)}
                </div>
                <div>Bonus!!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!!</button>}
            </>
        );
    }
}

export default Lotto;
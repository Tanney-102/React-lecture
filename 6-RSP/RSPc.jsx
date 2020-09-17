import React, { Component } from 'react';

class RSP extends Component {
    state = {
        result: '',
        imgIdx: 0, // 0: 바위, 1: 가위, 2: 보
        score: 0,
    }

    interval;
    imgCoord = [52, 93, 10];

    // life cycle
    componentDidMount() { // render가 처음 일어날때만 실행 -> 여기에 비동기 요청을 많이함
        this.changeHand();
    } 

    componentWillUnmount() { // component가 제거되기 직전 -> 비동기 요청 정리
        clearInterval(this.interval);
    } 

    changeHand = () => {
        this.interval = setInterval(() => {
            this.setState((prevState) => {
                return {
                    imgIdx: (prevState.imgIdx + 1)%3,
                }
            });
        }, 100);
    };

    onClickBtn = (choice) => {
        const { imgIdx } = this.state;

        clearInterval(this.interval);
        
        const judge = (choice - imgIdx + 3) % 3;

        if(judge === 2) {
            this.setState((prevState) => {
                return {
                    result: 'Win!!',
                    score: prevState.score + 1
                }
            });
        } else if(judge === 1) {
            this.setState((prevState) => {
                return {
                    result: 'Lose...',
                    score: prevState.score - 1,
                }
            });
        } else if(judge === 0) {
            this.setState({
                result: 'Draw',
            });
        }

        setTimeout(() => {
            this.setState({
                result: '',
            });
            this.changeHand();
        }, 1500);
    }
    
    render() {
        const { result, imgIdx, score} = this.state;
        return (
            <>
                <div id="computer" style={{backgroundPosition: `${this.imgCoord[imgIdx]}% 30%`}}></div>
                <div>{result}</div>
                <button id="rock" className="btn" onClick={() => this.onClickBtn(0)}>바위</button>
                <button id="scissor" className="btn" onClick={() => this.onClickBtn(1)}>가위</button>
                <button id="paper" className="btn" onClick={() => this.onClickBtn(2)}>보</button>
                {/* 고차함수 설명 아래 */}
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;

// 고차함수
// onClick={this.onClickBtn(0)}
//
// const onClickBtn = (choice) => () => {
// ...
// }
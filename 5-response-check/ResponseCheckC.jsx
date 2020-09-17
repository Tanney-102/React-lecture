import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [],
    };

    // this.~~ 인 변수들은 렌더링이 되더라도 변하지 않음
    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        
        if(state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요',
            });

            this.timeout = setTimeout( () => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 후
        } else if(state === 'ready') { // 성급하게 클릭
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
            });
        } else if(state === 'now') { 
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    result: [...prevState.result, this.endTime - this.startTime],
                    message: '클릭해서 시작하세요',
                };
            });
        }
    }

    renderCurTime = () => {
        const { result } = this.state;

        if(result.length) {
            return (
                <div>반응시간 : {result[result.length-1]}ms</div>
            );
        }
    }

    renderAvgTime = () => {
        const { result } = this.state;

        if(result.length !== 0) {
            return (
                <div>평균시간 : {Math.floor(result.reduce((r, cur) => r + cur) / result.length)}ms</div>
            );
        }
    }

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderCurTime()}
                {this.renderAvgTime()}
                {/*삼함연산자 or && 연사자를 쓸 수도 있음 예시는 아래*/}
            </>
        );
    }
}

export default ResponseCheck;

// 삼항연산자 예시
// {result.length === 0 ? null : <div>...</div>}

// && 연산자 예시
//{result.length !== 0 &&
//<div>평균 시간 : {result.reduce((r, cur) => r+cur) / result.length}ms</div>}
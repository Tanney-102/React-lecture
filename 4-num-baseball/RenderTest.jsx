import React, { Component } from 'react';

class Test extends Component {
    state = {
        counter : 0.
    };

    // state가 변하지 않아도 setState만 호출하면 render가 됨
    // 어떤 경우에 render를 해야할지 react에게 알려줄 필요가있음
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.counter !== nextState.counter) {
            return true;
        }
        return false;
    }

    // context??
    // props는 일반적으로 직계 자식에게로만 전달이 가능 
    // => 자식의 자식에게는 바로 전달할 수없음
    // ex) A -> B -> C -> D
    // A에서 D로 전달시 B,C를 거쳐야함
    // => 필요없는 렌더링의 가능성
    // 어느 자손에게든 전달할 수 있는 값 : Context

    onClick = () => {
        this.setState({})
    };
    render() {
        console.log('render', this.state);
        return (
            <div>
                <button onClick={this.onClick}>click</button>
            </div>
        );
    }
}


export default Test;
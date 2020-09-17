import React, { PureComponent } from 'react';

class Test extends PureComponent {
    // PureComponent => shouldComponentUpdate를 알아서 구현해놓은 클래스
    // 각 state의 변화 여부를 판단
    // array, objact등은 잘 감지하지 못함 (push등) 즉, 불변성을 고려해 항상 새로운 객체를 전달해줄 필요가 있음
    state = {
        counter : 0,
        string: 'hello',
        number:1,
        boolean: true,
    };

    onClick = () => {
        this.setState({});
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
import React, { Component } from 'react';
import RSP from './apps/RSP/RSPh';
import WordRelay from './apps/WordRelay/WordRelay';
import MineSearch from './apps/MineSearch/MineSearch';

class GameMatcher extends Component {
    render() {
        const { match } = this.props;
        if(match.params.name === 'rsp') {
            return <RSP />;
        } else if(match.params.name === 'word-relay') {
            return <WordRelay />;
        } else if(match.params.name === 'mine-search') {
            return <MineSearch />;
        }

        return(
            <div>일치하는 게임이 없습니다.</div>
        );
    }
}

export default GameMatcher;


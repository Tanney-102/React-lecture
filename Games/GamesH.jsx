import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import RSP from './apps/RSP/RSPh';
import WordRelay from './apps/WordRelay/WordRelay';
import MineSearch from './apps/MineSearch/MineSearch';

const Games = () => {
    return ( 
        <HashRouter>
            <div>
                <Link to="/rsp">가위바위보</Link>
                &nbsp;
                <Link to="/word-relay">끝말잇기</Link>
                &nbsp;
                <Link to="/mine-search">지뢰찾기</Link>
            </div>
            <div>
                <Route path="/rsp" component={RSP} />
                <Route path="/word-relay" component={WordRelay} />
                <Route path="/mine-search" component={MineSearch} />
            </div>
        </HashRouter>
    );
}

export default Games;
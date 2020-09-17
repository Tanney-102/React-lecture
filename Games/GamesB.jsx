import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import RSP from './apps/RSP/RSPh';
import WordRelay from './apps/WordRelay/WordRelay';
import MineSearch from './apps/MineSearch/MineSearch';
import GameMatcher from './GameMatcher';

const Games = () => {
    return (
        <BrowserRouter>
            <div>
                {/* <Link to="rsp">가위바위보</Link>
                &nbsp;
                <Link to="word-relay">끝말잇기</Link>
                &nbsp;
                <Link to="mine-search">지뢰찾기</Link> */}
                <Link to="/game/rsp">가위바위보</Link>
                &nbsp;
                <Link to="/game/word-relay">끝말잇기</Link>
                &nbsp;
                <Link to="/game/mine-search">지뢰찾기</Link>
            </div>
            <Link to="/"><button>home</button></Link>
            <div>
                {/* <Route path="/rsp" component={RSP} />
                <Route path="/word-relay" component={WordRelay} />
                <Route path="/mine-search" component={MineSearch} /> */}
                <Route path="/game/:name" component={GameMatcher} />
            </div>
        </BrowserRouter>
    )
    // /:name => params
    // 자동으로 props전달 (history, location, match)
    // history => 페이지를 넘나든 기록, 관련 메서드(이동 등)
    // match.params 에 name에 대한 내용이 들어있음
    // location => pathname, hash,  / url 정보

    // query를 보내는 것도 가능
    // ?key1=value1&key2=vluae2...
    // query 정보는 location.search에 문자열로 저장
    // route component 안에서 URLSearchParams 객체로 파싱 가능
    // ex) 
    // params = new URLSearchParams(this.props.location.search.slice(1));
    // params.get('key1');

    // GameMatcher에 props 전달하기(2가지)
    // <Route path="/game/:name" component={() => <GameMatcher props={asd} />} />
    // <Route path="/game/:name" render={(props) => <GameMatcher props={props.asd} />} />
    // <Switch>, exact => 알아서 공부

};

export default Games;
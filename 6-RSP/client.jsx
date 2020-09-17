import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

// import RSP from './RSPc';
import RSP from './RSPh';

const Hot = hot(RSP);

ReactDom.render(<Hot />, document.querySelector('#root'));

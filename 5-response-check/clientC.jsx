import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

// import ResponseCheck from './ResponseCheckC';
import ResponseCheck from './ResponseCheckH';

const Hot = hot(ResponseCheck);


ReactDom.render(<Hot />, document.querySelector('#root'));
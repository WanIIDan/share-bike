import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Router from './router'
import './style/common.scss'

ReactDOM.render(
    <Router>
        <App/>
    </Router>, document.getElementById('root'));
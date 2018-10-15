import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Router from './router'
import './style/common.scss'
import { Provider } from 'react-redux'
import store from './redux/store'
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>

        </Router>
    </Provider>, document.getElementById('root'));
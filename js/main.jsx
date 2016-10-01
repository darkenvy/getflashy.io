import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import mainReducer from './reducers';
import AppContent from './components/AppContent';
import { Router, Route, browserHistory } from 'react-router';

import 'font-awesome/css/font-awesome.css';
import 'app.less';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/(:deck)" component={AppContent} />
    </Router>,
    document.getElementById('app-content')
);

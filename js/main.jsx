import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import VisibleApp from './containers/VisibleApp';
import { Router, Route, browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'; // Allow action creators to return functions for async operations
import createLogger from 'redux-logger'; // Log actions

import 'font-awesome/css/font-awesome.css';
import 'app.less';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer,
    applyMiddleware(
        thunkMiddleware, // Let us dispatch functions
        loggerMiddleware // Logs actions
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/(:deck)" component={VisibleApp} />
        </Router>
    </Provider>,
    document.getElementById('app-content')
);

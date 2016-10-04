import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import App from './components/App';
import App404 from './components/App404';
import VisibleDeck from './containers/VisibleDeck';
import VisibleDeckConfig from './containers/VisibleDeckConfig';
import VisibleDeckList from './containers/VisibleDeckList';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
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
            <Route path="/" component={App}>
                <IndexRoute component={VisibleDeckList} />
                <Route path="/config/:deckId" component={VisibleDeckConfig} />
                <Route path="/decks/:deckId"  component={VisibleDeck} />
                <Route path='*' component={App404} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-content')
);

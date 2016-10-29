import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import api from '../middleware/api';
import DevTools from '../containers/dev-tools';
import rootReducer from '../reducers';

const history = useRouterHistory(createHistory)({
    basename: '/'
});

// const reduxRouterMiddleware = routerMiddleware(browserHistory);
const reduxRouterMiddleware = routerMiddleware(history);

const finalCreateStore = compose(
    applyMiddleware(thunk, api),
    applyMiddleware(reduxRouterMiddleware),
    applyMiddleware(createLogger()),
    DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    // Required for replaying actions from devtools to work
    // reduxRouterMiddleware.listenForReplays(store);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

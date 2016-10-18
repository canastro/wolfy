import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import thunk from 'redux-thunk';

import api from '../middleware/api';
import rootReducer from '../reducers';

const history = useRouterHistory(createHistory)({
    basename: '/'
});

const reduxRouterMiddleware = routerMiddleware(history);

const finalCreateStore = compose(
    applyMiddleware(thunk, api),
    applyMiddleware(reduxRouterMiddleware)
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}

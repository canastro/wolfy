import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import sentiment from './sentiment';
import symbol from './symbol';

const rootReducer = combineReducers({
    routing: routeReducer,
    sentiment,
    symbol
});

export default rootReducer;

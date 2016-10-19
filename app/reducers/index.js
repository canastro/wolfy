import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import order from './order';
import sentiment from './sentiment';
import symbol from './symbol';

const rootReducer = combineReducers({
    routing: routeReducer,
    sentiment,
    symbol,
    order
});

export default rootReducer;

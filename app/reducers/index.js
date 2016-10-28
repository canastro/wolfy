import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import order from './order';
import sentiment from './sentiment';
import symbol from './symbol';
import stock from './stock';

const rootReducer = combineReducers({
    routing: routeReducer,
    sentiment,
    symbol,
    order,
    stock
});

export default rootReducer;

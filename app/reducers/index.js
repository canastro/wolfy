import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import order from './order';
import sentiment from './sentiment';
import stock from './stock';
import price from './price';
import statistics from './statistics';
import tweet from './tweet';
import networkOutput from './network-output';
import rating from './rating';
import sidebar from './sidebar';

const rootReducer = combineReducers({
    routing: routeReducer,
    sentiment,
    order,
    stock,
    price,
    statistics,
    tweet,
    networkOutput,
    rating,
    sidebar
});

export default rootReducer;

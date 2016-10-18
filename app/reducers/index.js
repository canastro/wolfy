import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import prices from './prices';

const rootReducer = combineReducers({
    routing: routeReducer,
    prices
});

export default rootReducer;

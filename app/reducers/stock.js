import {
    GET_STOCKS_REQUEST,
    GET_STOCKS_SUCCESS,
    GET_STOCKS_FAILURE
} from '../actions/stock-actions';

const defaultState = {
    isFetching: false,
    stocks: [],
    selected: 'DUMMY'
};

export default function stock(state = defaultState, action) {
    switch (action.type) {
    case GET_STOCKS_REQUEST:
        return { ...state, isFetching: true };

    case GET_STOCKS_SUCCESS: {
        return {
            ...state,
            isFetching: false,
            stocks: action.response.data.stocks
        };
    }

    case GET_STOCKS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

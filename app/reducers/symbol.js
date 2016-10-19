import {
    SET_SYMBOL
} from '../actions/symbol-actions';

const defaultState = {
    symbol: ''
};

export default function sentiment(state = defaultState, action) {
    switch (action.type) {
    case SET_SYMBOL:
        return { ...state, symbol: action.symbol };

    default:
        return state;
    }
}

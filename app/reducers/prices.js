import {
    GET_CHART_REQUEST,
    GET_CHART_FAILURE,
    GET_CHART_SUCCESS
} from '../actions/chart-actions';

const defaultState = {
    isFetching: false,
    prices: []
};

export default function prices(state = defaultState, action) {
    switch (action.type) {
    case GET_CHART_REQUEST:
        return { ...state, isFetching: true };

    case GET_CHART_SUCCESS:
        return { ...state, isFetching: false, prices: action.prices };

    case GET_CHART_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

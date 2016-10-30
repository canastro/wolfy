import moment from 'moment';
import {
    GET_PRICES_REQUEST,
    GET_PRICES_SUCCESS,
    GET_PRICES_FAILURE
} from '../actions/price-actions';

const defaultState = {
    isFetching: false,
    list: []
};

export default function price(state = defaultState, action) {
    switch (action.type) {
    case GET_PRICES_REQUEST:
        return { ...state, isFetching: true };

    case GET_PRICES_SUCCESS: {
        const list = action.response.data.prices
            .map(item => ({
                ...item,
                date: moment(item.date).startOf('second').toDate()
            }));

        return {
            ...state,
            isFetching: false,
            list
        };
    }

    case GET_PRICES_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

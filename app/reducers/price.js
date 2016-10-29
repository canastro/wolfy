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
        const list = action.response.data.prices.edges
            .map(item => ({
                ...item,
                node: {
                    ...item.node,
                    date: moment(item.node.date).startOf('second').toDate()
                }
            }))
            .sort((prev, curr) => prev.node.date - curr.node.date);

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

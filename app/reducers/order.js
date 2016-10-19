import moment from 'moment';
import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE
} from '../actions/order-actions';

const defaultState = {
    isFetching: false,
    list: []
};

export default function order(state = defaultState, action) {
    switch (action.type) {
    case GET_ORDERS_REQUEST:
        return { ...state, isFetching: true };

    case GET_ORDERS_SUCCESS: {
        const list = action.response.data.orders
            .map(item => ({
                ...item,
                date: moment(item.date).startOf('second').toDate()
            }))
            .sort((prev, curr) => prev.date - curr.date);

        return {
            ...state,
            isFetching: false,
            list
        };
    }

    case GET_ORDERS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

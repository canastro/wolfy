import moment from 'moment';
import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE
} from '../actions/order-actions';

const defaultState = {
    isFetching: false,
    orders: { list: [], pageInfo: {} }
};

export default function order(state = defaultState, action) {
    switch (action.type) {
    case GET_ORDERS_REQUEST:
        return { ...state, isFetching: true };

    case GET_ORDERS_SUCCESS: {
        const list = action.response.data.orders.edges
            .map(item => ({
                ...item,
                date: moment(item.date).startOf('second').toDate()
            }))
            .sort((prev, curr) => prev.date - curr.date);

        return {
            ...state,
            isFetching: false,
            orders: {
                list,
                pageInfo: action.response.data.orders.pageInfo
            }
        };
    }

    case GET_ORDERS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

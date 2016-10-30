import moment from 'moment';
import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,

    GET_OPEN_POSITIONS_REQUEST,
    GET_OPEN_POSITIONS_SUCCESS,
    GET_OPEN_POSITIONS_FAILURE
} from '../actions/order-actions';

const defaultState = {
    isFetching: false,
    orders: { list: [], pageInfo: {} },
    positions: []
};

export default function order(state = defaultState, action) {
    switch (action.type) {
    case GET_ORDERS_REQUEST:
    case GET_OPEN_POSITIONS_REQUEST:
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

    case GET_OPEN_POSITIONS_SUCCESS:
        return {
            ...state,
            positions: action.response.data.positions
        };

    case GET_ORDERS_FAILURE:
    case GET_OPEN_POSITIONS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

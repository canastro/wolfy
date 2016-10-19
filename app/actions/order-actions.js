import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';

export function getOrders(symbol) {
    const query = `query ($symbol: String!) {
        orders(symbol: $symbol) {
            date,
            type,
            symbol,
            amount,
            value
        }
    }`;

    return dispatch => dispatch({
        [CALL_API]: {
            types: [
                GET_ORDERS_REQUEST,
                GET_ORDERS_SUCCESS,
                GET_ORDERS_FAILURE
            ],
            path: 'graphql',
            query,
            variables: {
                symbol
            }
        }
    });
}

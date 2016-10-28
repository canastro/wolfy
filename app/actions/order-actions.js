import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';

export function getOrders(symbol, type = 'next', cursor) {
    const cursorType = type === 'previous' ? 'before' : 'after';
    const from = type === 'previous' ? 'last' : 'first';

    const query = `query ($symbol: String!, $cursor: Cursor) {
        orders(${from}:10, ${cursorType}: $cursor, symbol: $symbol) {
            edges {
                node {
                    _id,
                    date,
                    type,
                    symbol,
                    amount,
                    value
                },
                cursor
            }
            pageInfo {
                hasPreviousPage,
                hasNextPage
            }
        }
    }`;

    return dispatch => dispatch({
        [CALL_API]: {
            types: [
                GET_ORDERS_REQUEST,
                GET_ORDERS_SUCCESS,
                GET_ORDERS_FAILURE
            ],
            query,
            variables: {
                symbol,
                cursor
            }
        }
    });
}

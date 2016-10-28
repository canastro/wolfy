import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_STOCKS_REQUEST = 'GET_STOCKS_REQUEST';
export const GET_STOCKS_SUCCESS = 'GET_STOCKS_SUCCESS';
export const GET_STOCKS_FAILURE = 'GET_STOCKS_FAILURE';

export function getStocks() {
    const query = 'query { stocks { _id, symbol, name } }';

    return dispatch => dispatch({
        [CALL_API]: {
            types: [
                GET_STOCKS_REQUEST,
                GET_STOCKS_SUCCESS,
                GET_STOCKS_FAILURE
            ],
            query
        }
    });
}

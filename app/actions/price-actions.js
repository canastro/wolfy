import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_PRICES_REQUEST = 'GET_PRICES_REQUEST';
export const GET_PRICES_SUCCESS = 'GET_PRICES_SUCCESS';
export const GET_PRICES_FAILURE = 'GET_PRICES_FAILURE';

export function getPrices(symbol) {
    const query = `query ($symbol: String!) {
        prices(first:250, symbol: $symbol) {
            edges {
                node {
                    symbol,
                    date,
                    high,
                    low,
                    open,
                    last,
                    volume
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
                GET_PRICES_REQUEST,
                GET_PRICES_SUCCESS,
                GET_PRICES_FAILURE
            ],
            query,
            variables: {
                symbol
            }
        }
    });
}

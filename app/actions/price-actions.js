import moment from 'moment';
import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_PRICES_REQUEST = 'GET_PRICES_REQUEST';
export const GET_PRICES_SUCCESS = 'GET_PRICES_SUCCESS';
export const GET_PRICES_FAILURE = 'GET_PRICES_FAILURE';

export function getPrices(symbol) {
    const query = `query ($symbol: String!, $since: String!) {
        prices(since:$since, symbol: $symbol) {
            symbol,
            date,
            high,
            low,
            open,
            last,
            volume
        }
    }`;

    const since = moment().subtract(7, 'days').startOf('day').toDate()
        .getTime();

    return dispatch => dispatch({
        [CALL_API]: {
            types: [
                GET_PRICES_REQUEST,
                GET_PRICES_SUCCESS,
                GET_PRICES_FAILURE
            ],
            query,
            variables: {
                symbol,
                since
            }
        }
    });
}

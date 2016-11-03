import moment from 'moment';
import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_NETWORK_OUTPUTS_REQUEST = 'GET_NETWORK_OUTPUTS_REQUEST';
export const GET_NETWORK_OUTPUTS_SUCCESS = 'GET_NETWORK_OUTPUTS_SUCCESS';
export const GET_NETWORK_OUTPUTS_FAILURE = 'GET_NETWORK_OUTPUTS_FAILURE';

export function getNetworkOutputs(symbol) {
    const query = `query ($symbol: String!, $since: String!) {
        networkOutputs(since:$since, symbol: $symbol) {
            symbol,
            result,
            createdAt
        }
    }`;

    const since = moment().subtract(7, 'days').startOf('day').toDate()
        .getTime();

    return dispatch => dispatch({
        [CALL_API]: {
            types: [
                GET_NETWORK_OUTPUTS_REQUEST,
                GET_NETWORK_OUTPUTS_SUCCESS,
                GET_NETWORK_OUTPUTS_FAILURE
            ],
            query,
            variables: {
                symbol,
                since
            }
        }
    });
}

import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_RATINGS_REQUEST = 'GET_RATINGS_REQUEST';
export const GET_RATINGS_SUCCESS = 'GET_RATINGS_SUCCESS';
export const GET_RATINGS_FAILURE = 'GET_RATINGS_FAILURE';

export function getRatings(symbol) {
    const query = `query ($symbol: String!) {
        ratings(symbol:$symbol) {
            date,
            firmFullText,
            value
        }
    }`;

    return dispatch => dispatch({
        [CALL_API]: {
            types: [
                GET_RATINGS_REQUEST,
                GET_RATINGS_SUCCESS,
                GET_RATINGS_FAILURE
            ],
            query,
            variables: { symbol }
        }
    });
}

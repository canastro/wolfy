import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_TWEETS_REQUEST = 'GET_TWEETS_REQUEST';
export const GET_TWEETS_SUCCESS = 'GET_TWEETS_SUCCESS';
export const GET_TWEETS_FAILURE = 'GET_TWEETS_FAILURE';

export function getTweets(symbol, type = 'next', cursor) {
    const cursorType = type === 'previous' ? 'before' : 'after';
    const from = type === 'previous' ? 'last' : 'first';

    const query = `query ($symbol: String!, $cursor: Cursor) {
        tweets(${from}:30, ${cursorType}: $cursor, symbol: $symbol) {
            edges {
                node {
                    _id,
                    key,
                    date,
                    symbol,
                    text,
                    screen_name,
                    followers_count,
                    absolute_sentiment,
                    relative_sentiment
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
                GET_TWEETS_REQUEST,
                GET_TWEETS_SUCCESS,
                GET_TWEETS_FAILURE
            ],
            query,
            variables: {
                symbol,
                cursor
            }
        }
    });
}

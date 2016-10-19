import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_CHART_REQUEST = 'GET_CHART_REQUEST';
export const GET_CHART_SUCCESS = 'GET_CHART_SUCCESS';
export const GET_CHART_FAILURE = 'GET_CHART_FAILURE';

export function getChart(symbol, indicator) {
    const query = 'query ($symbol: String!, $indicator: ChartIndicator!) { chart(symbol: $symbol, indicator: $indicator) { begIndex, nbElement, prices { open, last, high, low, volume }, result { outRealUpperBand, outRealMiddleBand, outRealLowerBand } }}';

    // const query = `query ($symbol: String!, $indicator: ChartIndicator!) {
    //     chart(symbol: $symbol, indicator: $indicator) {
    //         begIndex,
    //         nbElement,
    //         prices { open, last, high, low, volume },
    //         result { outRealUpperBand, outRealMiddleBand, outRealLowerBand }
    //     }
    // }`;

    return dispatch => dispatch({
        [CALL_API]: {
            types: [
                GET_CHART_REQUEST,
                GET_CHART_SUCCESS,
                GET_CHART_FAILURE
            ],
            path: 'graphqlv2',
            query,
            variables: {
                symbol,
                indicator
            }
        }
    });
}

export function getSentimentReport(symbol) {
    const query = `query ($symbol: String!) {
        sentimentreports(symbol: $symbol) {
            symbol,
            type,
            date,
            articles_sentiment,
            articles_volume,
            tweet_relative_sentiment,
            tweet_absolute_sentiment,
            tweet_volume
        }
    }`;

    return dispatch => dispatch({
        [CALL_API]: {
            types: [
                GET_CHART_REQUEST,
                GET_CHART_SUCCESS,
                GET_CHART_FAILURE
            ],
            path: 'graphql',
            query,
            variables: {
                symbol
            }
        }
    });
}

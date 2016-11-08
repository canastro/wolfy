import { CALL_API } from '../middleware/api';

/*
 * action types
 */
export const GET_STATISTICS_REQUEST = 'GET_STATISTICS_REQUEST';
export const GET_STATISTICS_SUCCESS = 'GET_STATISTICS_SUCCESS';
export const GET_STATISTICS_FAILURE = 'GET_STATISTICS_FAILURE';

const getStatisticsQuery = (symbol) => {
    if (symbol) {
        return `query ($symbol: String!) {
            statistics(symbol: $symbol) {
                pricesCount,
                stockCount,
                tweetCount,
                articleCount,
                ratingCount,
                jobCount,
                orderCount,
                sentimentReportCount
            }
            balance(symbol: $symbol)
        }`;
    }

    return `query {
        statistics {
            pricesCount,
            stockCount,
            tweetCount,
            articleCount,
            ratingCount,
            jobCount,
            orderCount,
            sentimentReportCount
        }
        balance
    }`;
};

export function getStatistics(symbol) {
    const query = getStatisticsQuery(symbol);

    return dispatch => dispatch({
        [CALL_API]: {
            types: [
                GET_STATISTICS_REQUEST,
                GET_STATISTICS_SUCCESS,
                GET_STATISTICS_FAILURE
            ],
            query,
            variables: {
                symbol
            }
        }
    });
}

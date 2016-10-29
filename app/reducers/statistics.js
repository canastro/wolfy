import {
    GET_STATISTICS_REQUEST,
    GET_STATISTICS_FAILURE,
    GET_STATISTICS_SUCCESS
} from '../actions/statistics-actions';

const defaultState = {
    isFetching: false,
    pricesCount: 0,
    stockCount: 0,
    tweetCount: 0,
    articleCount: 0,
    ratingCount: 0,
    jobCount: 0,
    orderCount: 0,
    sentimentReportCount: 0,
    balance: 0
};

export default function statistics(state = defaultState, action) {
    switch (action.type) {
    case GET_STATISTICS_REQUEST:
        return { ...state, isFetching: true };

    case GET_STATISTICS_SUCCESS: {
        return {
            ...state,
            ...action.response.data.statistics,
            balance: action.response.data.balance,
            isFetching: false
        };
    }

    case GET_STATISTICS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

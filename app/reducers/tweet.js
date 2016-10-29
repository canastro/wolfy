import moment from 'moment';
import {
    GET_TWEETS_REQUEST,
    GET_TWEETS_SUCCESS,
    GET_TWEETS_FAILURE
} from '../actions/tweet-actions';

const defaultState = {
    isFetching: false,
    tweets: { list: [], pageInfo: {} }
};

export default function tweet(state = defaultState, action) {
    switch (action.type) {
    case GET_TWEETS_REQUEST:
        return { ...state, isFetching: true };

    case GET_TWEETS_SUCCESS: {
        const list = action.response.data.tweets.edges
            .map(item => ({
                ...item,
                date: moment(item.date).startOf('second').toDate()
            }))
            .sort((prev, curr) => prev.date - curr.date);

        return {
            ...state,
            isFetching: false,
            tweets: {
                list,
                pageInfo: action.response.data.tweets.pageInfo
            }
        };
    }

    case GET_TWEETS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

import moment from 'moment';
import {
    GET_TWEETS_REQUEST,
    GET_TWEETS_SUCCESS,
    GET_MORE_TWEETS_SUCCESS,
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

    case GET_MORE_TWEETS_SUCCESS:
    case GET_TWEETS_SUCCESS: {
        const list = action.response.data.tweets.edges
            .map(item => ({
                ...item,
                date: moment(item.date).startOf('second').toDate()
            }));

        const tweets = {
            list,
            pageInfo: action.response.data.tweets.pageInfo
        };

        if (action.type === GET_MORE_TWEETS_SUCCESS) {
            tweets.list = [...state.tweets.list, ...list];
        }

        return {
            ...state,
            isFetching: false,
            tweets
        };
    }

    case GET_TWEETS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

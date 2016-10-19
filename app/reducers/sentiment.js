import moment from 'moment';
import {
    GET_CHART_REQUEST,
    GET_CHART_FAILURE,
    GET_CHART_SUCCESS
} from '../actions/sentiment-actions';

const defaultState = {
    isFetching: false,
    sentimentreports: []
};

export default function sentiment(state = defaultState, action) {
    switch (action.type) {
    case GET_CHART_REQUEST:
        return { ...state, isFetching: true };

    case GET_CHART_SUCCESS: {
        const sentimentreports = action.response.data.sentimentreports
            .map(item => ({
                ...item,
                date: moment(item.date).startOf('second').toDate()
            }))
            .sort((prev, curr) => prev.date - curr.date);

        return {
            ...state,
            isFetching: false,
            sentimentreports
        };
    }

    case GET_CHART_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

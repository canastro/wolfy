import moment from 'moment';
import {
    GET_CHART_REQUEST,
    GET_CHART_FAILURE,
    GET_CHART_SUCCESS
} from '../actions/sentiment-actions';

const defaultState = {
    isFetching: false,
    list: []
};

export default function sentiment(state = defaultState, action) {
    switch (action.type) {
    case GET_CHART_REQUEST:
        return { ...state, isFetching: true };

    case GET_CHART_SUCCESS: {
        const list = action.response.data.sentimentreports
            .map(item => ({
                ...item,
                date: moment(item.date).startOf('second').toDate()
            }));

        return {
            ...state,
            isFetching: false,
            list
        };
    }

    case GET_CHART_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

import moment from 'moment';
import {
    GET_RATINGS_REQUEST,
    GET_RATINGS_SUCCESS,
    GET_RATINGS_FAILURE
} from '../actions/rating-actions';

const defaultState = {
    isFetching: false,
    list: []
};

export default function rating(state = defaultState, action) {
    switch (action.type) {
    case GET_RATINGS_REQUEST:
        return { ...state, isFetching: true };

    case GET_RATINGS_SUCCESS: {
        const list = action.response.data.ratings
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

    case GET_RATINGS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

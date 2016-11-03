import moment from 'moment';
import {
    GET_NETWORK_OUTPUTS_REQUEST,
    GET_NETWORK_OUTPUTS_SUCCESS,
    GET_NETWORK_OUTPUTS_FAILURE
} from '../actions/network-output-actions';

const defaultState = {
    isFetching: false,
    list: []
};

export default function networkOutput(state = defaultState, action) {
    switch (action.type) {
    case GET_NETWORK_OUTPUTS_REQUEST:
        return { ...state, isFetching: true };

    case GET_NETWORK_OUTPUTS_SUCCESS: {
        const list = action.response.data.networkOutputs
            .map(item => ({
                ...item,
                date: moment(item.createdAt).startOf('second').toDate()
            }));

        return {
            ...state,
            isFetching: false,
            list
        };
    }

    case GET_NETWORK_OUTPUTS_FAILURE:
        return { ...state, isFetching: false };

    default:
        return state;
    }
}

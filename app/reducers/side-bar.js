import {
    TOGGLE_SIDE_BAR
} from '../actions/navigation-actions';

const defaultState = {
    isExpanded: true
};

export default function rating(state = defaultState, action) {
    switch (action.type) {
    case TOGGLE_SIDE_BAR:
        return { ...state, isExpanded: !state.isExpanded };

    default:
        return state;
    }
}

import { browserHistory } from 'react-router';

export const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR';

/**
 * @name goTo
 * @param {string} url
 * Uses react-router-redux to redirect a user to a given url
 */
export function goTo(url) {
    return () => browserHistory.push(url);
}

export function toggleSideBar() {
    return dispatch => dispatch({ type: TOGGLE_SIDE_BAR });
}

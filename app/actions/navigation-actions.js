import { browserHistory } from 'react-router';

/**
 * @name goTo
 * @param {string} url
 * Uses react-router-redux to redirect a user to a given url
 */
export function goTo(url) {
    return () => browserHistory.push(url);
}

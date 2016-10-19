/*
 * action types
 */
export const SET_SYMBOL = 'SET_SYMBOL';

export function setSymbol(symbol) {
    return dispatch => dispatch({
        type: SET_SYMBOL,
        symbol
    });
}

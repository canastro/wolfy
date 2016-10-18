import fetch from 'isomorphic-fetch';

/**
 * @name callApi
 * @param {object} query
 * @param {object} queryParams
 * @returns {promise}
 * Gets the httpInstance, makes the request to the http with the
 * given params and handle the response
 */
function callApi(path = 'graphql', query, variables) {
    return fetch(`http://localhost:8080/${path}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => (action) => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    const { types, path, query, variables } = callAPI;

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    return callApi(path, query, variables)
        .then((response) => {
            next(actionWith({
                response,
                type: successType
            }));

            return response;
        })
        .catch(data => (
            data.response.json().then((response) => {
                next(actionWith({
                    ...response,
                    type: failureType
                }));

                return Promise.reject({
                    ...response,
                    status: data.status,
                    type: failureType
                });
            })
        ));
};

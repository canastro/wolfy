import fetch from 'isomorphic-fetch';

const getBaseURL = () => {
    if (process.env.TARGET_ENV === 'production') {
        return 'http://ec2-52-31-60-109.eu-west-1.compute.amazonaws.com:8080';
    }

    return 'http://ec2-52-31-60-109.eu-west-1.compute.amazonaws.com:8080';
    // return 'http://localhost:8080';
};

/**
 * @name callApi
 * @param {object} query
 * @param {object} queryParams
 * @returns {promise}
 * Gets the httpInstance, makes the request to the http with the
 * given params and handle the response
 */
function callApi(path = 'api/graphql', query, variables) {
    return fetch(`${getBaseURL()}/${path}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default () => next => (action) => {
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
        .then(data => data.json())
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

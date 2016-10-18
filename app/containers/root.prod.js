import React, { PureComponent, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';

export default class Root extends PureComponent {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={browserHistory}>
                    { routes }
                </Router>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};

import React, { PureComponent, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import DevTools from './dev-tools';

export default class Root extends PureComponent {
    render() {
        return (
            <Provider store={this.props.store}>
                <div>
                    <Router history={browserHistory}>{routes}</Router>
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};

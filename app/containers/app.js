import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends PureComponent {
    render() {
        return (
            <div className="app-container">
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node
};

export default connect(() => ({}), {})(App);

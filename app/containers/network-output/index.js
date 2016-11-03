import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import NetworkOutput from '../../components/chart/network-output';

class NetworkOutputContainer extends PureComponent {
    render() {
        return (
            <NetworkOutput
                isFetching={this.props.isFetching}
                outputs={this.props.outputs}
            />
        );
    }
}

NetworkOutputContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    outputs: PropTypes.array.isRequired
};

export default connect(state => ({
    isFetching: state.networkOutput.isFetching,
    outputs: state.networkOutput.list
}), { })(NetworkOutputContainer);

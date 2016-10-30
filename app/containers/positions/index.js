import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Positions from '../../components/orders/positions';

class PositionsContainer extends PureComponent {
    render() {
        return (
            <Positions
                isFetching={this.props.isFetching}
                positions={this.props.positions}
            />
        );
    }
}

PositionsContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    positions: PropTypes.array.isRequired
};

export default connect(state => ({
    isFetching: state.order.isFetching,
    positions: state.order.positions
}), {})(PositionsContainer);

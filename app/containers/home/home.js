import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getStatistics } from '../../actions/statistics-actions';
import { getOpenPositions } from '../../actions/order-actions';

import StatisticsContainer from '../statistics';
import PositionsContainer from '../positions';

class StockContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.props.getOpenPositions();
        this.props.getStatistics();
    }

    render() {
        return (
            <div className="stock-container">
                <StatisticsContainer />
                <PositionsContainer />
            </div>
        );
    }
}

StockContainer.propTypes = {
    getOpenPositions: PropTypes.func.isRequired,
    getStatistics: PropTypes.func.isRequired
};

export default connect(() => ({}), {
    getOpenPositions,
    getStatistics
})(StockContainer);

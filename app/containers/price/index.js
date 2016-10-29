import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Price from '../../components/chart/price';

class PriceContainer extends PureComponent {
    render() {
        return (
            <Price
                isFetching={this.props.isFetching}
                data={this.props.prices}
            />
        );
    }
}

PriceContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    prices: PropTypes.array.isRequired
};

export default connect(state => ({
    isFetching: state.price.isFetching,
    prices: state.price.list
}), { })(PriceContainer);

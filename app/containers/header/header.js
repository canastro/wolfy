import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header/header';

class HeaderContainer extends PureComponent {
    render() {
        return (
            <Header
                symbol={this.props.symbol}
            />
        );
    }
}

HeaderContainer.propTypes = {
    symbol: PropTypes.string
};

export default connect(state => ({
    symbol: state.stock.selected
}), {})(HeaderContainer);

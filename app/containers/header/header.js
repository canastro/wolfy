import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setSymbol } from '../../actions/symbol-actions';

import Header from '../../components/header/header';

class HeaderContainer extends PureComponent {
    render() {
        return (
            <Header
                symbol={this.props.symbol}
                setSymbol={this.props.setSymbol}
            />
        );
    }
}

HeaderContainer.propTypes = {
    setSymbol: PropTypes.func.isRequired,
    symbol: PropTypes.string
};

export default connect(state => ({
    symbol: state.symbol.symbol
}), { setSymbol })(HeaderContainer);

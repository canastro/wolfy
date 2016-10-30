import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getStocks } from '../../actions/stock-actions';
import { goTo } from '../../actions/navigation-actions';

import Sidebar from '../../components/sidebar/index';

class SidebarContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.handleMenuClicked = this.handleMenuClicked.bind(this);

        this.props.getStocks();
    }

    handleMenuClicked(symbol, submenu) {
        return () => {
            let url = `/stock/${symbol}`;
            if (submenu) {
                url += `/${submenu}`;
            }

            return this.props.goTo(url);
        };
    }

    render() {
        return (
            <Sidebar
                pathname={this.props.pathname}
                selectedSymbol={this.props.selectedSymbol}
                stocks={this.props.stocks}
                handleMenuClicked={this.handleMenuClicked}
            />
        );
    }
}

SidebarContainer.propTypes = {
    goTo: PropTypes.func.isRequired,
    getStocks: PropTypes.func.isRequired,
    stocks: PropTypes.array.isRequired,
    selectedSymbol: PropTypes.string,
    pathname: PropTypes.string.isRequired
};

export default connect(state => ({
    stocks: state.stock.stocks
}), { goTo, getStocks })(SidebarContainer);

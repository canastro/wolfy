import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getStocks } from '../../actions/stock-actions';
import { goTo } from '../../actions/navigation-actions';

import Sidebar from '../../components/sidebar/index';

class SidebarContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.handleStockClicked = this.handleStockClicked.bind(this);

        this.props.getStocks();
    }

    handleStockClicked(symbol) {
        return () => this.props.goTo(`/stock/${symbol}`);
    }

    render() {
        return (
            <Sidebar
                stocks={this.props.stocks}
                handleStockClicked={this.handleStockClicked}
            />
        );
    }
}

SidebarContainer.propTypes = {
    goTo: PropTypes.func.isRequired,
    getStocks: PropTypes.func.isRequired,
    stocks: PropTypes.array.isRequired
};

export default connect(state => ({
    stocks: state.stock.stocks
}), { goTo, getStocks })(SidebarContainer);

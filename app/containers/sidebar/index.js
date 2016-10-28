import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getStocks } from '../../actions/stock-actions';

import Sidebar from '../../components/sidebar/index';

class SidebarContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.props.getStocks();
    }

    render() {
        return (
            <Sidebar stocks={this.props.stocks} />
        );
    }
}

SidebarContainer.propTypes = {
    getStocks: PropTypes.func.isRequired,
    stocks: PropTypes.array.isRequired
};

export default connect(state => ({
    stocks: state.stock.stocks
}), { getStocks })(SidebarContainer);

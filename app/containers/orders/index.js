import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getOrders } from '../../actions/order-actions';
import Orders from '../../components/orders/index';

class OrdersContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.handleRequestPage = this.handleRequestPage.bind(this);
    }

    handleRequestPage(type) {
        return () => {
            const orders = this.props.orders.list;
            const cursor = type === 'next' ? orders[orders.length - 1].cursor : orders[0].cursor;

            this.props.getOrders(this.props.symbol, type, cursor);
        };
    }

    render() {
        return (
            <Orders
                isFetching={this.props.isFetching}
                data={this.props.orders}
                handleRequestPage={this.handleRequestPage}
            />
        );
    }
}

OrdersContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    getOrders: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    symbol: PropTypes.string.isRequired
};

export default connect(state => ({
    isFetching: state.order.isFetching,
    orders: state.order.orders
}), { getOrders })(OrdersContainer);

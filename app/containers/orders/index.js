import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getOrders } from '../../actions/order-actions';
import Orders from '../../components/orders/index';

class OrdersContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.props.getOrders('TSLA');

        this.handleRequestPage = this.handleRequestPage.bind(this);
    }

    handleRequestPage(type) {
        return () => {
            const orders = this.props.orders.list;
            const cursor = type === 'next' ? orders[orders.length - 1].cursor : orders[0].cursor;

            this.props.getOrders('TSLA', type, cursor);
        };
    }

    render() {
        return (
            <Orders data={this.props.orders} handleRequestPage={this.handleRequestPage} />
        );
    }
}

OrdersContainer.propTypes = {
    getOrders: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired
};

export default connect(state => ({
    sentimentReports: state.sentiment.list,
    orders: state.order.orders
}), { getOrders })(OrdersContainer);

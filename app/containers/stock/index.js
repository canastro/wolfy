import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getOrders } from '../../actions/order-actions';
import { getSentimentReport } from '../../actions/sentiment-actions';

import SentimentContainer from '../sentiment';
import OrdersContainer from '../orders';

class StockContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.props.getOrders(props.params.symbol);
        this.props.getSentimentReport(props.params.symbol);
    }

    componentWillReceiveProps(newProps) {
        this.props.getOrders(newProps.params.symbol);
        this.props.getSentimentReport(newProps.params.symbol);
    }

    render() {
        const symbol = this.props.params.symbol;

        return (
            <section className="app-content-wrapper stock-container">
                <SentimentContainer symbol={symbol} />
                <OrdersContainer symbol={symbol} />
            </section>
        );
    }
}

StockContainer.propTypes = {
    getOrders: PropTypes.func.isRequired,
    getSentimentReport: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(() => ({}), { getOrders, getSentimentReport })(StockContainer);

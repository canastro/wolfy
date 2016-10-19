import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getSentimentReport } from '../../actions/sentiment-actions';
import { getOrders } from '../../actions/order-actions';

import Home from '../../components/home/home';
import Sentiment from '../../components/chart/sentiment';
import Orders from '../../components/orders/index';

class HomeContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.props.getSentimentReport('TSLA');
        this.props.getOrders('TSLA');
    }

    render() {
        return (
            <Home>
                <Sentiment
                    title="Sentiment"
                    data={this.props.sentimentReports}
                />

                <Orders data={this.props.orders} />
            </Home>
        );
    }
}

HomeContainer.propTypes = {
    getSentimentReport: PropTypes.func.isRequired,
    getOrders: PropTypes.func.isRequired,
    sentimentReports: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired
};

export default connect(state => ({
    sentimentReports: state.sentiment.list,
    orders: state.order.list
}), { getSentimentReport, getOrders })(HomeContainer);

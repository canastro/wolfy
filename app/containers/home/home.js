import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getSentimentReport } from '../../actions/sentiment-actions';

import Home from '../../components/home/home';
import Sentiment from '../../components/chart/sentiment';
import OrdersContainer from '../orders/index';
import SidebarContainer from '../sidebar/index';

class HomeContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.props.getSentimentReport('TSLA');
    }

    render() {
        return (
            <Home>
                <SidebarContainer />

                <section className="page-wrapper">
                    <Sentiment
                        title="Sentiment"
                        data={this.props.sentimentReports}
                    />

                    <OrdersContainer />
                </section>
            </Home>
        );
    }
}

HomeContainer.propTypes = {
    getSentimentReport: PropTypes.func.isRequired,
    sentimentReports: PropTypes.array.isRequired
};

export default connect(state => ({
    sentimentReports: state.sentiment.list
}), { getSentimentReport })(HomeContainer);

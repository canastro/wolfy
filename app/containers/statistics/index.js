import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Statistics from '../../components/statistics/index';

class StatisticsContainer extends PureComponent {
    render() {
        return (
            <Statistics {...this.props} />
        );
    }
}

StatisticsContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    pricesCount: PropTypes.number.isRequired,
    stockCount: PropTypes.number.isRequired,
    tweetCount: PropTypes.number.isRequired,
    articleCount: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    jobCount: PropTypes.number.isRequired,
    orderCount: PropTypes.number.isRequired,
    sentimentReportCount: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired
};

export default connect(state => ({
    isFetching: state.statistics.isFetching,
    pricesCount: state.statistics.pricesCount,
    stockCount: state.statistics.stockCount,
    tweetCount: state.statistics.tweetCount,
    articleCount: state.statistics.articleCount,
    ratingCount: state.statistics.ratingCount,
    jobCount: state.statistics.jobCount,
    orderCount: state.statistics.orderCount,
    sentimentReportCount: state.statistics.sentimentReportCount,
    balance: state.statistics.balance
}), { })(StatisticsContainer);

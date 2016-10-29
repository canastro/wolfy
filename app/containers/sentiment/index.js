import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Sentiment from '../../components/chart/sentiment';

class SentimentContainer extends PureComponent {
    render() {
        return (
            <Sentiment
                isFetching={this.props.isFetching}
                title="Sentiment"
                data={this.props.sentimentReports}
            />
        );
    }
}

SentimentContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    sentimentReports: PropTypes.array.isRequired,
    symbol: PropTypes.string.isRequired
};

export default connect(state => ({
    isFetching: state.sentiment.isFetching,
    sentimentReports: state.sentiment.list
}), { })(SentimentContainer);

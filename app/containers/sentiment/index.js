import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Sentiment from '../../components/chart/sentiment';

class SentimentContainer extends PureComponent {
    render() {
        return (
            <Sentiment
                title="Sentiment"
                data={this.props.sentimentReports}
            />
        );
    }
}

SentimentContainer.propTypes = {
    sentimentReports: PropTypes.array.isRequired,
    symbol: PropTypes.string.isRequired
};

export default connect(state => ({
    sentimentReports: state.sentiment.list
}), { })(SentimentContainer);

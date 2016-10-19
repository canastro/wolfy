import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getSentimentReport } from '../../actions/sentiment-actions';
import Home from '../../components/home/home';

class HomeContainer extends PureComponent {
    render() {
        return (
            <Home
                getSentimentReport={this.props.getSentimentReport}
                sentimentReports={this.props.sentimentReports}
            />
        );
    }
}

HomeContainer.propTypes = {
    getSentimentReport: PropTypes.func.isRequired,
    sentimentReports: PropTypes.array.isRequired
};

export default connect(state => ({
    sentimentReports: state.sentiment.sentimentreports
}), { getSentimentReport })(HomeContainer);

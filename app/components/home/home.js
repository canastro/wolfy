import React, { PureComponent, PropTypes } from 'react';

import '!style!css!sass!./home.scss';

import Sentiment from '../chart/sentiment';

export default class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.props.getSentimentReport('TSLA');
    }

    render() {
        return (
            <div className="home-container page-wrapper">
                <Sentiment title="Sentiment" data={this.props.sentimentReports} />
            </div>
        );
    }
}

Home.propTypes = {
    getSentimentReport: PropTypes.func.isRequired,
    sentimentReports: PropTypes.array
};

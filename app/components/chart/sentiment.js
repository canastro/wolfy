import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./sentiment.scss';

import TweetSentiment from './tweet-sentiment';
import ArticleSentiment from './article-sentiment';
import Loader from '../loader';

export default class Sentiment extends PureComponent {
    _buildCharts() {
        if (!this.props.data || !this.props.data.length) {
            return null;
        }

        const articles = this.props.data.filter(item => item.articles_volume);

        return (
            <div className="sentiment-charts-wrapper">
                <div className="sentiment-chart">
                    <h3>Twitter</h3>
                    <TweetSentiment data={this.props.data} />
                </div>

                <div className="sentiment-chart">
                    <h3>Articles</h3>
                    <ArticleSentiment data={articles} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="sentiment-container">
                <Loader isLoading={this.props.isFetching} />

                <div className="section-content-wrapper">
                    <h2>{this.props.title}</h2>
                    {this._buildCharts()}
                </div>
            </div>
        );
    }
}

Sentiment.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.array
};

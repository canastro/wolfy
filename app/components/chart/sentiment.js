import React, { PureComponent, PropTypes } from 'react';
import { LineTooltip, SimpleTooltip } from 'react-d3-tooltip';
import '!style!css!sass!./sentiment.scss';

import Loader from '../loader';

const tweetsSeries = [{
    field: 'tweet_relative_sentiment',
    name: 'Tweets Relative Sentiment',
    style: {
        strokeWidth: 2
    }
}, {
    field: 'tweet_absolute_sentiment',
    name: 'Tweets Relative Sentiment',
    style: {
        strokeWidth: 2
    }
}, {
    field: 'tweet_volume',
    name: 'Tweets Volume',
    style: {
        strokeWidth: 2
    }
}];

const articlesSeries = [{
    field: 'articles_sentiment',
    name: 'Articles Sentiment',
    color: '#2eb398',
    style: {
        strokeWidth: 2
    }
}, {
    field: 'articles_volume',
    name: 'Articles Volume',
    color: '#2ca02c',
    area: true
}];

const getX = item => item.date;

export default class Sentiment extends PureComponent {
    _buildCharts() {
        const articles = this.props.data.filter(item => item.articles_volume);
        const margins = { left: 30, right: 30, top: 30, bottom: 30 };

        return (
            <div className="sentiment-charts-wrapper">
                <LineTooltip
                    className="sentiment-tweets-chart"
                    showXGrid
                    showYGrid
                    margins={margins}
                    title={this.props.title}
                    data={this.props.data}
                    width={this.props.width}
                    height={this.props.height}
                    chartSeries={tweetsSeries}
                    x={getX}
                    xScale="time"
                >
                    <SimpleTooltip />
                </LineTooltip>

                <LineTooltip
                    className="sentiment-articles-chart"
                    showXGrid
                    showYGrid
                    margins={margins}
                    title={this.props.title}
                    data={articles}
                    width={this.props.width}
                    height={this.props.height}
                    chartSeries={articlesSeries}
                    x={getX}
                    xScale="time"
                >
                    <SimpleTooltip />
                </LineTooltip>
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
    data: PropTypes.array,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

Sentiment.defaultProps = {
    width: 600,
    height: 300
};

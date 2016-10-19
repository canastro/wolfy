import React, { PureComponent, PropTypes } from 'react';
import { LineTooltip, SimpleTooltip } from 'react-d3-tooltip';
import '!style!css!sass!./sentiment.scss';

const series = [{
    field: 'tweet_relative_sentiment',
    name: 'Tweet Relative Sentiment',
    color: '#2eb398',
    style: {
        strokeWidth: 2
    }
}, {
    field: 'tweet_absolute_sentiment',
    name: 'Tweet Relative Sentiment',
    color: '#ff0000',
    style: {
        strokeWidth: 2
    }
}, {
    field: 'tweet_volume',
    name: 'Tweet Volume',
    color: '#2ca02c',
    area: true
}];

const getX = item => item.date;

export default class Sentiment extends PureComponent {
    render() {
        if (!this.props.data) { return null; }

        const margins = { left: 30, right: 30, top: 30, bottom: 30 };

        return (
            <div className="sentiment-container">
                <h2>{this.props.title}</h2>

                <LineTooltip
                    showXGrid
                    showYGrid
                    margins={margins}
                    title={this.props.title}
                    data={this.props.data}
                    width={this.props.width}
                    height={this.props.height}
                    chartSeries={series}
                    x={getX}
                    xScale="time"
                >
                    <SimpleTooltip />
                </LineTooltip>
            </div>
        );
    }
}

Sentiment.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

Sentiment.defaultProps = {
    width: 600,
    height: 300
};

import React, { PureComponent, PropTypes } from 'react';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import { ChartCanvas, Chart, axes, series, scale, coordinates } from 'react-stockcharts';
import '!style!css!sass!./sentiment.scss';

import Legend from './legend';
import fitWidth from '../utils/fit-width';

const { LineSeries, BarSeries } = series;
const { XAxis, YAxis } = axes;
const { MouseCoordinateX, MouseCoordinateY } = coordinates;

const legends = [{
    label: 'Volume',
    color: '#ccc'
}, {
    label: 'Absolute Sentiment',
    color: '#2eb398'
}, {
    label: 'Relative Sentiment',
    color: '#ffd700'
}];


class TweetSentiment extends PureComponent {
    render() {
        return (
            <div className="sentiment-chart-container">
                <ChartCanvas
                    ratio={this.props.ratio}
                    width={this.props.width}
                    height={400}
                    margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                    type="svg"
                    seriesName="MSFT"
                    data={this.props.data}
                    xAccessor={d => d.date}
                    xScaleProvider={scale.discontinuousTimeScaleProvider}
                >

                    <Chart id={1} yExtents={d => d.tweet_volume}>
                        <MouseCoordinateX
                            id={0}
                            at="bottom"
                            orient="bottom"
                            displayFormat={timeFormat('%d/%m %H:%M')}
                        />

                        <MouseCoordinateY
                            id={0}
                            at="left"
                            orient="left"
                            displayFormat={format('.4s')}
                        />

                        <XAxis axisAt="bottom" orient="bottom" ticks={7} />
                        <YAxis axisAt="left" orient="left" ticks={5} />
                        <BarSeries fill="#cccccc" yAccessor={d => d.tweet_volume} />
                    </Chart>

                    <Chart
                        id={2}
                        yExtents={d => d.tweet_absolute_sentiment}
                    >
                        <YAxis axisAt="right" orient="right" ticks={5} />
                        <MouseCoordinateY
                            at="right"
                            orient="right"
                            displayFormat={format('.2f')}
                        />

                        <LineSeries
                            stroke="#2eb398"
                            strokeWidth={2}
                            yAccessor={d => d.tweet_absolute_sentiment}
                        />
                    </Chart>

                    <Chart
                        id={3}
                        yExtents={d => d.tweet_relative_sentiment}
                    >
                        <YAxis axisAt="right" orient="right" ticks={5} />

                        <LineSeries
                            stroke="#ffd700"
                            strokeWidth={2}
                            yAccessor={d => d.tweet_relative_sentiment}
                        />
                    </Chart>
                </ChartCanvas>
                <Legend legends={legends} />
            </div>
        );
    }
}

TweetSentiment.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.array,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired
};

TweetSentiment.defaultProps = {
    width: 600
};

export default fitWidth(TweetSentiment);

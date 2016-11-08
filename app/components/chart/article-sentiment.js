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
    key: 'volume',
    label: 'Volume',
    color: '#ccc'
}, {
    key: 'sentiment',
    label: 'Sentiment',
    color: '#2eb398'
}];

class ArticleSentiment extends PureComponent {
    buildChart() {
        if (!this.props.data || this.props.data.length === 0) {
            return null;
        }

        return (
            <div className="sentiment-chart-wrapper">
                <ChartCanvas
                    ratio={this.props.ratio}
                    width={this.props.width}
                    height={400}
                    margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                    type="svg"
                    seriesName="ARTICLE-SENTIMENT"
                    data={this.props.data}
                    xAccessor={d => d.date}
                    xScaleProvider={scale.discontinuousTimeScaleProvider}
                    disableMouseMoveEvent
                    disablePanEvent
                    disableZoomEvent
                >

                    <Chart id={1} yExtents={d => d.articles_volume}>
                        <MouseCoordinateX
                            id={0}
                            at="bottom"
                            orient="bottom"
                            displayFormat={timeFormat('%Y-%m-%d')}
                        />

                        <MouseCoordinateY
                            id={0}
                            at="left"
                            orient="left"
                            displayFormat={format('.4s')}
                        />

                        <YAxis axisAt="left" orient="left" ticks={5} />
                        <BarSeries fill="#cccccc" yAccessor={d => d.articles_volume} />
                    </Chart>

                    <Chart
                        id={2}
                        yExtents={d => d.articles_sentiment}
                    >
                        <XAxis axisAt="bottom" orient="bottom" />
                        <YAxis axisAt="right" orient="right" ticks={5} />
                        <MouseCoordinateX
                            at="bottom"
                            orient="bottom"
                            displayFormat={timeFormat('%Y-%m-%d')}
                        />
                        <MouseCoordinateY
                            at="right"
                            orient="right"
                            displayFormat={format('.2f')}
                        />

                        <LineSeries
                            stroke="#2eb398"
                            strokeWidth={2}
                            yAccessor={d => d.articles_sentiment}
                        />
                    </Chart>
                </ChartCanvas>
                <Legend legends={legends} />
            </div>
        );
    }
    render() {
        return (
            <div className="sentiment-chart-container">
                {this.buildChart()}
            </div>
        );
    }
}

ArticleSentiment.propTypes = {
    data: PropTypes.array,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired
};

ArticleSentiment.defaultProps = {
    width: 600
};

export default fitWidth(ArticleSentiment);

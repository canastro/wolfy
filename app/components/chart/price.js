// https://reactjsnews.com/playing-with-react-and-d3

import React, { PureComponent, PropTypes } from 'react';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import { ChartCanvas, Chart, axes, series, scale, coordinates, tooltip } from 'react-stockcharts';
import '!style!css!sass!./price.scss';

import fitWidth from '../utils/fit-width';
import Loader from '../loader';

class Price extends PureComponent {
    buildChart() {
        if (!this.props.prices || !this.props.prices.length) {
            return null;
        }

        const data = this.props.prices.map(price => ({
            date: price.date,
            open: price.open,
            high: price.high,
            low: price.low,
            close: price.last,
            volume: price.volume
        }));
        const { BarSeries, CandlestickSeries } = series;
        const { XAxis, YAxis } = axes;
        const { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = coordinates;
        const { OHLCTooltip } = tooltip;

        return (
            <ChartCanvas
                ratio={this.props.ratio}
                width={this.props.width}
                height={400}
                margin={{ left: 75, right: 75, top: 10, bottom: 30 }}
                type="svg"
                seriesName="MSFT"
                data={data}
                xAccessor={d => d.date}
                xScaleProvider={scale.discontinuousTimeScaleProvider}
            >
                <Chart id={1} yExtents={d => [d.high, d.low]}>
                    <MouseCoordinateY
                        id={0}
                        at="right"
                        orient="right"
                        displayFormat={format('.2f')}
                    />

                    <XAxis axisAt="bottom" orient="bottom" ticks={6} />
                    <YAxis axisAt="right" orient="right" ticks={5} />
                    <CandlestickSeries />
                </Chart>

                <Chart id={2} yExtents={d => d.volume}>
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
                    <BarSeries
                        yAccessor={d => d.volume}
                        fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
                    />
                </Chart>
                <CrossHairCursor />
                <OHLCTooltip forChart={1} origin={[-40, 0]} />
            </ChartCanvas>
        );
    }

    render() {
        return (
            <div className="price-container">
                <Loader isLoading={this.props.isFetching} />

                <div className="section-content-wrapper">
                    <h2>Prices</h2>
                    {this.buildChart()}
                </div>
            </div>
        );
    }
}

Price.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    prices: PropTypes.array,
    ratio: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};

export default fitWidth(Price);

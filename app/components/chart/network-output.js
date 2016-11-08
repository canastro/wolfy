import React, { PureComponent, PropTypes } from 'react';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { ChartCanvas, Chart, axes, series, scale, coordinates } from 'react-stockcharts';
import '!style!css!sass!./network-output.scss';

import fitWidth from '../utils/fit-width';
import Loader from '../loader';

const { LineSeries } = series;
const { XAxis, YAxis } = axes;
const { MouseCoordinateX, MouseCoordinateY } = coordinates;

class NetworkOutput extends PureComponent {
    buildChart() {
        if (!this.props.outputs || !this.props.outputs.length) {
            return null;
        }

        const rectWidth = this.props.width - 150;

        return (
            <ChartCanvas
                seriesName="NETWORK_OUTPUT"
                ratio={this.props.ratio}
                width={this.props.width}
                height={400}
                margin={{ left: 75, right: 75, top: 10, bottom: 30 }}
                data={this.props.outputs}
                xAccessor={d => d.date}
                type="hybrid"
                xScaleProvider={scale.discontinuousTimeScaleProvider}
                disableMouseMoveEvent
                disablePanEvent
                disableZoomEvent
            >
                <Chart id={1} yExtents={() => [0, 1]}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={7} />
                    <YAxis axisAt="left" orient="left" ticks={5} />

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
                        displayFormat={format('.2')}
                    />

                    <LineSeries
                        stroke="#2eb398"
                        strokeWidth={2}
                        yAccessor={d => d.result}
                    />
                </Chart>

                <rect
                    className="testtest"
                    height="110"
                    width={rectWidth}
                    fill="#2eb398"
                    style={{ opacity: 0.5 }}
                />

                <rect
                    className="testtest"
                    height="110"
                    y="250"
                    width={rectWidth}
                    fill="#ff0000"
                    style={{ opacity: 0.5 }}
                />
            </ChartCanvas>
        );
    }

    render() {
        return (
            <div className="network-output-container">
                <Loader isLoading={this.props.isFetching} />

                <div className="section-content-wrapper">
                    <h2>Network Outputs</h2>
                    {this.buildChart()}
                </div>
            </div>
        );
    }
}

NetworkOutput.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    outputs: PropTypes.array,
    ratio: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};

export default fitWidth(NetworkOutput);

import React, { PureComponent, PropTypes } from 'react';
import { Chart, Line } from 'react-d3-shape';
import { Xaxis, Yaxis, Legend } from 'react-d3-core';
import '!style!css!sass!./price.scss';

import Loader from '../loader';

const series = [{
    field: 'open',
    name: 'Open',
    style: {
        strokeWidth: 2
    }
}, {
    field: 'last',
    name: 'Close',
    style: {
        strokeWidth: 2
    }
}];

const volumeSeries = [{
    field: 'volume',
    name: 'Volume',
    style: {
        strokeWidth: 2
    }
}];

const getX = item => item.date;

export default class Price extends PureComponent {

    render() {
        const margins = { left: 30, right: 30, top: 30, bottom: 30 };
        const yDomain = [150, 250];

        return (
            <div className="price-container">
                <Loader isLoading={this.props.isFetching} />


                <div className="section-content-wrapper">
                    <h2>Prices</h2>

                    {this.props.prices.length > 0 ? (
                        <Chart
                            width={this.props.width}
                            height={this.props.height}
                            data={this.props.prices}
                            chartSeries={series}
                            margins={margins}
                            x={getX}
                            yDomain={yDomain}
                            xScale="time"
                            yScale="linear"
                        >
                            <Line chartSeries={series} />
                            <Line chartSeries={volumeSeries} />

                            <Xaxis />
                            <Yaxis />
                            <Yaxis />
                            <Legend chartSeries={series} />
                        </Chart>
                    ) : null}
                </div>
            </div>
        );
    }
}

Price.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    prices: PropTypes.array,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

Price.defaultProps = {
    width: 600,
    height: 300
};

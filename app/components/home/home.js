import React, { Component, PropTypes } from 'react';

import '!style!css!sass!./home.scss';

import Chart from '../chart/chart';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.props.getChart('TSLA', {
            name: 'ACCBANDS',
            params: {
                optInTimePeriod: 20
            }
        });

        // http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
    }

    render() {
        return (
            <div className="pn-editor-container">
                <Chart prices={this.props.prices} />
            </div>
        );
    }
}

Home.propTypes = {
    getChart: PropTypes.func.isRequired,
    prices: PropTypes.array
};

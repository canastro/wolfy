import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import '!style!css!sass!./chart.scss';

import D3Chart from '../../utils/d3-chart';
import dataGenerator from './data-generator';

export default class Chart extends Component {
    constructor(props) {
        super(props);

        const data = dataGenerator.generate(50);

        this.state = {
            data,
            domain: { x: [0, 30], y: [0, 100] },
            tooltip: null,
            prevDomain: null,
            showingAllTooltips: false
        };
    }

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        this.d3Chart = new D3Chart(el, {
            width: this.props.width,
            height: this.props.height
        }, this.getChartState());

        const dispatcher = this.d3Chart.dispatcher;
        dispatcher.on('point:mouseover', this.showTooltip);
        dispatcher.on('point:mouseout', this.hideTooltip);

        this.dispatcher = dispatcher;
    }

    componentDidUpdate() {
        const el = ReactDOM.findDOMNode(this);
        this.d3Chart.update(el, this.getChartState());
    }

    getChartState() {
        let tooltips = [];
        if (this.state.showingAllTooltips) {
            tooltips = this.state.data;
        } else if (this.state.tooltip) {
            tooltips = [this.state.tooltip];
        }

        return Object.assign({}, this.state, { tooltips });
    }

    showTooltip(d) {
        if (this.state.showingAllTooltips) {
            return;
        }

        this.setState({
            tooltip: d,
            // Disable animation
            prevDomain: null
        });
    }

    hideTooltip() {
        if (this.state.showingAllTooltips) {
            return;
        }

        this.setState({
            tooltip: null,
            prevDomain: null
        });
    }

    render() {
        return <div className="chart" />;
    }
}

Chart.propTypes = {
    prices: PropTypes.array,
    width: PropTypes.string,
    height: PropTypes.string
};

Chart.defaultProps = {
    width: '100%',
    height: '300px'
};

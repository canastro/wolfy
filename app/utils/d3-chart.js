import 'd3';
import { EventEmitter } from 'events';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
// import { transition } from 'd3-transition';

const ANIMATION_DURATION = 400;
const TOOLTIP_WIDTH = 30;
const TOOLTIP_HEIGHT = 30;

const getScales = (el, domain) => {
    if (!domain) {
        return null;
    }

    const width = el.offsetWidth;
    const height = el.offsetHeight;

    const x = scaleLinear()
        .range([0, width])
        .domain(domain.x);

    const y = scaleLinear()
        .range([height, 0])
        .domain(domain.y);

    const z = scaleLinear()
        .range([5, 20])
        .domain([1, 10]);

    return { x, y, z };
};

const drawTooltips = (el, scales, tooltips, prevScales) => {
    const g = select(el).selectAll('.d3-tooltips');

    const tooltipRect = g.selectAll('.d3-tooltip-rect')
        .data(tooltips, d => d.id);

    tooltipRect.enter().append('rect')
        .attr('class', 'd3-tooltip-rect')
        .attr('width', TOOLTIP_WIDTH)
        .attr('height', TOOLTIP_HEIGHT)
        .attr('x', (d) => {
            if (prevScales) {
                return prevScales.x(d.x) - (TOOLTIP_WIDTH / 2);
            }
            return scales.x(d.x) - (TOOLTIP_WIDTH / 2);
        })
        // .transition()
        // .duration(ANIMATION_DURATION)
        .attr('x', d => scales.x(d.x) - (TOOLTIP_WIDTH / 2));

    tooltipRect.attr('y', d => (scales.y(d.y) - (scales.z(d.z) / 2) - TOOLTIP_HEIGHT))
        // .transition()
        // .duration(ANIMATION_DURATION)
        .attr('x', d => scales.x(d.x) - (TOOLTIP_WIDTH / 2));

    if (prevScales) {
        tooltipRect.exit()
            // .transition()
            // .duration(ANIMATION_DURATION)
            .attr('x', d => scales.x(d.x) - (TOOLTIP_WIDTH / 2))
            .remove();
    } else {
        tooltipRect.exit()
        .remove();
    }

    const tooltipText = g.selectAll('.d3-tooltip-text')
        .data(tooltips, d => d.id);

    tooltipText.enter().append('text')
        .attr('class', 'd3-tooltip-text')
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .text(d => d.z)
        .attr('x', (d) => {
            if (prevScales) {
                return prevScales.x(d.x);
            }
            return scales.x(d.x);
        })
        // .transition()
        // .duration(ANIMATION_DURATION)
        .attr('x', d => scales.x(d.x));

    tooltipText.attr('y', d => scales.y(d.y) - (scales.z(d.z) / 2) - (TOOLTIP_HEIGHT / 2))
        // .transition()
        // .duration(ANIMATION_DURATION)
        .attr('x', d => scales.x(d.x));

    if (prevScales) {
        tooltipText.exit()
            .transition()
            .duration(ANIMATION_DURATION)
            .attr('x', d => scales.x(d.x))
            .remove();
    } else {
        tooltipText.exit().remove();
    }
};

export default class D3Chart {
    constructor(el, props, state) {
        const svg = select(el).append('svg')
            .attr('class', 'd3')
            .attr('width', props.width)
            .attr('height', props.height);

        svg.append('g')
            .attr('class', 'd3-points');

        svg.append('g')
            .attr('class', 'd3-tooltips');

        this.dispatcher = new EventEmitter();
        this.update(el, state);
    }

    update(el, state) {
        const currScales = getScales(el, state.domain);
        const prevScales = getScales(el, state.prevDomain);
        this._drawPoints(el, currScales, state.data, prevScales, this.dispatcher);
        drawTooltips(el, currScales, state.tooltips, prevScales);
    }

    _drawPoints(el, scales, data, prevScales) {
        const g = select(el).selectAll('.d3-points');

        const point = g.selectAll('.d3-point')
            .data(data, d => d.id);

        point.enter().append('circle')
            .attr('class', 'd3-point')
            .attr('cx', (d) => {
                if (prevScales) {
                    return prevScales.x(d.x);
                }
                return scales.x(d.x);
            });
            // .transition()
            // .duration(ANIMATION_DURATION)
            // .attr('cx', (d) => scales.x(d.x));

        point.attr('cy', d => scales.y(d.y))
            .attr('r', d => scales.z(d.z))
            .on('mouseover', d => this.dispatcher.emit('point:mouseover', d))
            .on('mouseout', d => this.dispatcher.emit('point:mouseout', d));
            // .transition()
            // .duration(ANIMATION_DURATION)
            // .attr('cx', (d) => scales.x(d.x));

        if (prevScales) {
            point.exit()
                // .transition()
                // .duration(ANIMATION_DURATION)
                .attr('cx', d => scales.x(d.x))
                .remove();
        } else {
            point.exit().remove();
        }
    }

    // destroy (el) {
    // }
}

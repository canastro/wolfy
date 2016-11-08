import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./legend.scss';

export default class Legend extends PureComponent {
    render() {
        return (
            <div className="legend-container">
                {
                    this.props.legends.map(item => (
                        <div className="legend-item" key={item.key}>
                            <div className="legend-color" style={{ backgroundColor: item.color }} />
                            <div className="legend-label">{item.label}</div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

Legend.propTypes = {
    legends: PropTypes.array.isRequired
};

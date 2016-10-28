import React, { PureComponent, PropTypes } from 'react';

import '!style!css!sass!./index.scss';

export default class Sidebar extends PureComponent {
    _buildStocks() {
        return this.props.stocks.map(stock => (
            <li>
                <span className="symbol">{stock.symbol}</span>
                <strong className="name">{stock.name}</strong>
            </li>
        ));
    }

    render() {
        return (
            <div className="sidebar-container">
                <h4>Stocks</h4>

                <ul>
                    {this._buildStocks()}
                </ul>
            </div>
        );
    }
}

Sidebar.propTypes = {
    stocks: PropTypes.array.isRequired
};

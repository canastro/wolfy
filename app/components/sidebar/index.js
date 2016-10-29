import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./index.scss';

export default class Sidebar extends PureComponent {
    _buildStocks() {
        return this.props.stocks.map((stock) => {
            const className = stock.symbol === this.props.selectedSymbol ? 'selected' : '';

            return (
                <li className={className}>
                    <a
                        tabIndex="0"
                        onClick={this.props.handleStockClicked(stock.symbol)}
                    >
                        <span className="symbol">{stock.symbol}</span>
                        <strong className="name">{stock.name}</strong>
                    </a>
                </li>
            );
        });
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
    selectedSymbol: PropTypes.string,
    stocks: PropTypes.array.isRequired,
    handleStockClicked: PropTypes.func.isRequired
};

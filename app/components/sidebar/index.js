import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./index.scss';

import SidebarItem from './item';

export default class Sidebar extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null
        };
    }

    _buildStocks() {
        return this.props.stocks.map(stock =>
            <SidebarItem
                pathname={this.props.pathname}
                isSelected={stock.symbol === this.props.selectedSymbol}
                symbol={stock.symbol}
                name={stock.name}
                handleMenuClicked={this.props.handleMenuClicked}
            />
        );
    }

    render() {
        const classNames = ['sidebar-container'];

        if (this.props.isExpanded) {
            classNames.push('is-expanded');
        }

        return (
            <div className={classNames.join(' ')}>
                <h4>Stocks</h4>

                <ul>
                    {this._buildStocks()}
                </ul>
            </div>
        );
    }
}

Sidebar.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    selectedSymbol: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    stocks: PropTypes.array.isRequired,
    handleMenuClicked: PropTypes.func.isRequired
};

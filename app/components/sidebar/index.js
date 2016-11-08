import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./index.scss';

import SidebarStock from './stock';
import SidebarItem from './item';

const PAGES = [{
    key: 'dashboard',
    path: '/',
    name: 'Dashboard'
}, {
    key: 'about',
    path: '/about',
    name: 'About'
}];

export default class Sidebar extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null
        };
    }

    _buildStocks() {
        return this.props.stocks.map((stock, index) => (
            <SidebarStock
                key={`sidebar-item-${index}`}
                pathname={this.props.pathname}
                isSelected={stock.symbol === this.props.selectedSymbol}
                symbol={stock.symbol}
                handleMenuClicked={this.props.handleMenuClicked}
            >
                <small className="symbol">{stock.symbol}</small>
                <strong className="name">{stock.name}</strong>
            </SidebarStock>
        ));
    }

    _buildPages() {
        return PAGES.map(item => (
            <SidebarItem
                key={item.key}
                pathname={item.path}
                handleMenuClicked={this.props.handleMenuClicked}
            >
                <span className="name">{item.name}</span>
            </SidebarItem>
        ));
    }

    render() {
        const classNames = ['sidebar-container'];

        if (this.props.isExpanded) {
            classNames.push('is-expanded');
        }

        return (
            <div className={classNames.join(' ')}>
                <h4>Pages</h4>
                <ul>
                    {this._buildPages()}
                </ul>

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

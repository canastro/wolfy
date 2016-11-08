import React, { PureComponent, PropTypes } from 'react';
import camelCase from 'lodash/camelCase';
import '!style!css!sass!./stock.scss';

export default class SidebarStock extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: !!this.props.isSelected
        };

        this.handleExpandClicked = this.handleExpandClicked.bind(this);
    }

    handleExpandClicked() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    buildItem(key) {
        const reg = /stock\/\w*\/?(\w*)?/gi.exec(this.props.pathname);
        const res = reg ? reg[1] : null;

        const liClassName = [
            'sidebar-option-item',
            this.props.isSelected && res === key ? 'selected' : ''
        ];

        return (
            <li className={liClassName.join(' ')}>
                <a
                    tabIndex="0"
                    onClick={this.props.handleMenuClicked({
                        symbol: this.props.symbol,
                        submenu: key
                    })}
                >
                    {camelCase(key || 'dashboard')}
                </a>
            </li>
        );
    }

    buildOptions() {
        if (!this.props.symbol) {
            return null;
        }

        const ulClassName = [
            'sidebar-item-options',
            this.state.isExpanded ? 'expanded' : ''
        ];

        return (
            <ul className={ulClassName.join(' ')}>
                {this.buildItem()}
                {this.buildItem('tweets')}
                {this.buildItem('articles')}
            </ul>
        );
    }

    render() {
        const headerClassName = [
            'sidebar-item-header',
            this.props.isSelected ? 'selected' : ''
        ];

        return (
            <li className="siderbar-item">
                <div className={headerClassName.join(' ')} onClick={this.handleExpandClicked}>
                    {this.props.children}
                </div>

                {this.buildOptions()}
            </li>
        );
    }
}

SidebarStock.propTypes = {
    pathname: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    symbol: PropTypes.string.isRequired,
    handleMenuClicked: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

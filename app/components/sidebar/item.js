import React, { PureComponent, PropTypes } from 'react';
import camelCase from 'lodash/camelCase';
import '!style!css!sass!./item.scss';

export default class SidebarItem extends PureComponent {
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
        console.log(res);
        const liClassName = [
            'sidebar-option-item',
            this.props.isSelected && res === key ? 'selected' : ''
        ];

        return (
            <li className={liClassName.join(' ')}>
                <a
                    tabIndex="0"
                    onClick={this.props.handleMenuClicked(this.props.symbol, key)}
                >
                    {camelCase(key || 'dashboard')}
                </a>
            </li>
        );
    }

    render() {
        const headerClassName = [
            'sidebar-item-header',
            this.props.isSelected ? 'selected' : ''
        ];

        const ulClassName = [
            'sidebar-item-options',
            this.state.isExpanded ? 'expanded' : ''
        ];

        return (
            <li className="siderbar-item">
                <div className={headerClassName.join(' ')} onClick={this.handleExpandClicked}>
                    <span className="symbol">{this.props.symbol}</span>
                    <strong className="name">{this.props.name}</strong>
                </div>
                <ul className={ulClassName.join(' ')}>
                    {this.buildItem()}
                    {this.buildItem('tweets')}
                    {this.buildItem('articles')}
                </ul>
            </li>
        );
    }
}

SidebarItem.propTypes = {
    pathname: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleMenuClicked: PropTypes.func.isRequired
};

import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./header.scss';

export default class Header extends PureComponent {
    render() {
        return (
            <header className="header-container">
                <h2>{this.props.symbol}</h2>
            </header>
        );
    }
}

Header.propTypes = {
    symbol: PropTypes.string.isRequired
};

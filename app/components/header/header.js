import React, { PureComponent, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import '!style!css!sass!./header.scss';

export default class Header extends PureComponent {
    render() {
        return (
            <header className="header-container">
                <FlatButton
                    icon={<NavigationMenu />}
                    onClick={this.props.handleMenuClicked}
                />

                <h2>wolfy inspector</h2>
            </header>
        );
    }
}

Header.propTypes = {
    handleMenuClicked: PropTypes.func.isRequired
};

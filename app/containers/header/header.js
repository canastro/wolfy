import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { toggleSideBar } from '../../actions/navigation-actions';

import Header from '../../components/header/header';

class HeaderContainer extends PureComponent {
    render() {
        return (
            <Header
                handleMenuClicked={this.props.toggleSideBar}
            />
        );
    }
}

HeaderContainer.propTypes = {
    toggleSideBar: PropTypes.func.isRequired
};

export default connect(() => ({}), { toggleSideBar })(HeaderContainer);

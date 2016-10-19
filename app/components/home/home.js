import React, { PureComponent, PropTypes } from 'react';

import '!style!css!sass!./home.scss';

export default class Home extends PureComponent {
    render() {
        console.log(this.props.children);
        return (
            <div className="home-container page-wrapper">
                {this.props.children}
            </div>
        );
    }
}

Home.propTypes = {
    children: PropTypes.node
};

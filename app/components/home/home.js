import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./home.scss';

export default class Home extends PureComponent {
    render() {
        return (
            <div className="home-container">
                {this.props.children}
            </div>
        );
    }
}

Home.propTypes = {
    children: PropTypes.node
};

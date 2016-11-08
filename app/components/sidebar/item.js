import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./item.scss';

export default class SidebarItem extends PureComponent {
    render() {
        return (
            <li className="siderbar-item">
                <div className="sidebar-item-header">
                    <a
                        tabIndex="0"
                        onClick={this.props.handleMenuClicked({
                            path: this.props.pathname
                        })}
                    >
                        {this.props.children}
                    </a>
                </div>
            </li>
        );
    }
}

SidebarItem.propTypes = {
    pathname: PropTypes.string.isRequired,
    handleMenuClicked: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import '!style!css!sass!./index.scss';

/**
 * @name Loader
 * This is the Loader
 */
export default class Loader extends Component {
    /**
     * @name _getClassNames
     * @param {String} propsClassName
     * @returns {String}
     * Given the props className build the final list of classes in a string
     */
    _getClassNames() {
        const classNames = [];
        if (this.props.className) {
            classNames.push(this.props.className);
        }

        classNames.push('loader-container');

        return classNames.join(' ');
    }

    render() {
        if (!this.props.isLoading) {
            return null;
        }

        return (
            <div className={this._getClassNames()}>
                <CircularProgress />
            </div>
        );
    }

}

Loader.propTypes = {
    /**
     * CSS class to be added to the root element
     */
    className: PropTypes.string,
    isLoading: PropTypes.bool
};

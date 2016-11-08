import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

import '!style!css!sass!./index.scss';

import Loader from '../loader';

export default class Rating extends PureComponent {
    _buildRatings() {
        return this.props.ratings.map((item, index) => (
            <li key={`rating-${index}`}>
                <div className="rating-title-wrapper">
                    <strong>{item.firmFullText}</strong>
                    <small>{moment(item.date).format('L')}</small>
                </div>

                <strong className="rating-value">{item.value}</strong>
            </li>
        ));
    }

    render() {
        return (
            <div className="ratings-container">
                <Loader isLoading={this.props.isFetching} />

                <div className="section-content-wrapper">
                    <h2>Rating</h2>

                    <ul>
                        {this._buildRatings()}
                    </ul>
                </div>
            </div>
        );
    }
}

Rating.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    ratings: PropTypes.array.isRequired
};

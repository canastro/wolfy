import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Rating from '../../components/rating';

class RatingContainer extends PureComponent {
    render() {
        return (
            <Rating
                isFetching={this.props.isFetching}
                ratings={this.props.ratings}
            />
        );
    }
}

RatingContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    ratings: PropTypes.array.isRequired
};

export default connect(state => ({
    isFetching: state.rating.isFetching,
    ratings: state.rating.list
}), { })(RatingContainer);

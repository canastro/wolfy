import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./index.scss';

import Loader from '../loader';
import TweetCard from './card';

export default class Tweets extends PureComponent {
    render() {
        return (
            <div className="tweets-container">
                <Loader isLoading={this.props.isFetching} />

                <div className="app-content-wrapper tweets-list">
                    {this.props.data.list.map(item => <TweetCard {...item.node} />)}
                </div>
            </div>
        );
    }
}

Tweets.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    handleRequestPage: PropTypes.func.isRequired
};

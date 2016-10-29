import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getTweets } from '../../actions/tweet-actions';
import Tweets from '../../components/tweets/index';

class TweetsContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.handleRequestPage = this.handleRequestPage.bind(this);
    }

    handleRequestPage(type) {
        return () => {
            const tweets = this.props.tweets.list;
            const cursor = type === 'next' ? tweets[tweets.length - 1].cursor : tweets[0].cursor;

            this.props.getTweets(this.props.symbol, type, cursor);
        };
    }

    render() {
        return (
            <Tweets
                isFetching={this.props.isFetching}
                data={this.props.tweets}
                handleRequestPage={this.handleRequestPage}
            />
        );
    }
}

TweetsContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    getTweets: PropTypes.func.isRequired,
    tweets: PropTypes.object.isRequired,
    symbol: PropTypes.string.isRequired
};

export default connect(state => ({
    isFetching: state.tweet.isFetching,
    tweets: state.tweet.tweets
}), { getTweets })(TweetsContainer);

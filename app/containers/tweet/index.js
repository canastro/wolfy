import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getTweets } from '../../actions/tweet-actions';
import Tweets from '../../components/tweets/index';

class TweetsContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.props.getTweets(props.params.symbol);

        this.handleRequestPage = this.handleRequestPage.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.params.symbol !== this.props.params.symbol) {
            this.props.getTweets(newProps.params.symbol);
        }
    }

    handleRequestPage() {
        const tweets = this.props.tweets.list;
        this.props.getTweets(this.props.params.symbol, tweets[tweets.length - 1].cursor);
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
    params: PropTypes.object.isRequired
};

export default connect(state => ({
    isFetching: state.tweet.isFetching,
    tweets: state.tweet.tweets
}), { getTweets })(TweetsContainer);

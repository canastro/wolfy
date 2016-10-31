import React, { PureComponent, PropTypes } from 'react';
import '!style!css!sass!./index.scss';

import Loader from '../loader';
import TweetCard from './card';

export default class Tweets extends PureComponent {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const node = this.tweetsListNode;

        if (node.scrollHeight < node.scrollTop + node.clientHeight) {
            this.props.handleRequestPage();
        }
    }

    render() {
        return (
            <div className="tweets-container">
                <Loader isLoading={this.props.isFetching} />

                <div
                    ref={(n) => { this.tweetsListNode = n; }}
                    className="app-content-wrapper"
                    onScroll={this.handleScroll}
                >
                    <h2>Tweets</h2>

                    <div className="tweets-list">
                        {this.props.data.list.map(item => <TweetCard {...item.node} />)}
                    </div>
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

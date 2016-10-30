import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

import '!style!css!sass!./card.scss';

export default class TweetCard extends PureComponent {
    render() {
        const date = moment(this.props.date).format('L HH:mm');

        let footerClassName = 'gold';
        if (this.props.absolute_sentiment > 0) {
            footerClassName = 'green';
        } else if (this.props.absolute_sentiment < 0) {
            footerClassName = 'red';
        }

        return (
            <div className="tweet-card-container">
                <header>
                    <div className="tweet-id">
                        <strong>{this.props.screen_name} </strong>
                        <span>(followers: {this.props.followers_count})</span>
                    </div>

                    <div className="tweet-date">{date}</div>
                </header>

                <article>{this.props.text}</article>

                <footer className={footerClassName}>
                    <div className="tweet-sentiment">
                        <strong>Absolute: </strong>
                        <span>{this.props.absolute_sentiment}</span>
                    </div>

                    <div className="tweet-sentiment">
                        <strong>Relative: </strong>
                        <span>{this.props.relative_sentiment}</span>
                    </div>
                </footer>
            </div>
        );
    }
}

TweetCard.propTypes = {
    date: PropTypes.string.isRequired,
    screen_name: PropTypes.string.isRequired,
    followers_count: PropTypes.string.isRequired,
    absolute_sentiment: PropTypes.string.isRequired,
    relative_sentiment: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

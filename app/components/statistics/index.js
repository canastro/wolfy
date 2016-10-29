import React, { PureComponent, PropTypes } from 'react';

import '!style!css!sass!./index.scss';

import Loader from '../loader';

const items = [
    { key: 'sentimentReportCount', title: 'Reports', color: 'red' },
    { key: 'orderCount', title: 'Orders', color: 'teal' },
    { key: 'pricesCount', title: 'Prices', color: 'teal' },
    { key: 'balance', title: 'Balance', color: 'gold', format: value => `$${value.toFixed(2)}` },
    { key: 'tweetCount', title: 'Tweets', color: 'green' },
    { key: 'articleCount', title: 'Articles', color: 'green' },
    { key: 'ratingCount', title: 'Ratings', color: 'green' }
];

export default class Statistics extends PureComponent {

    _buildItem({ key, title, color, format }) {
        const value = format ? format(this.props[key]) : this.props[key];

        return (
            <li className="statistic-item">
                <header>{value}</header>
                <footer className={color}>{title}</footer>
            </li>
        );
    }

    render() {
        return (
            <div className="statistics-container">
                <Loader isLoading={this.props.isFetching} />

                <ul>
                    {items.map(item => this._buildItem(item))}
                </ul>
            </div>
        );
    }
}

Statistics.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    pricesCount: PropTypes.number.isRequired,
    stockCount: PropTypes.number.isRequired,
    tweetCount: PropTypes.number.isRequired,
    articleCount: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    jobCount: PropTypes.number.isRequired,
    orderCount: PropTypes.number.isRequired,
    sentimentReportCount: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired
};

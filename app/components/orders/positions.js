import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

import '!style!css!sass!./positions.scss';

import Loader from '../loader';

export default class Positions extends PureComponent {
    _buildTable() {
        return this.props.positions.map(item => (
            <tr>
                <td>{moment(item.date).format('L HH:mm')}</td>
                <td>{item.symbol}</td>
                <td>{item.amount}</td>
                <td>${item.value.toFixed(2)}</td>
            </tr>
        ));
    }

    _buildContent() {
        if (this.props.positions && this.props.positions.length) {
            return (
                <table>
                    <tbody>
                        {this._buildTable()}
                    </tbody>
                </table>
            );
        }

        return (
            <div className="positions-empty">
                <h1>No Positions Open</h1>
            </div>
        );
    }

    render() {
        return (
            <div className="positions-container">
                <Loader isLoading={this.props.isFetching} />

                <div className="section-content-wrapper">
                    <h2>Open Positions</h2>

                    {this._buildContent()}
                </div>
            </div>
        );
    }
}

Positions.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    positions: PropTypes.array.isRequired
};

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

    render() {
        return (
            <div className="positions-container">
                <Loader isLoading={this.props.isFetching} />

                <div className="section-content-wrapper">
                    <h2>Open Positions</h2>

                    <table>
                        <tbody>
                            {this._buildTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Positions.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    positions: PropTypes.object.isRequired
};

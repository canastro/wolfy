import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import SkipNext from 'material-ui/svg-icons/av/skip-next';

import '!style!css!sass!./index.scss';

import Loader from '../loader';

export default class Orders extends PureComponent {
    _buildTable() {
        if (!this.props.orders.list) { return null; }

        return this.props.orders.list.map(item => (
            <tr>
                <td>{moment(item.node.date).format('L HH:mm')}</td>
                <td>{item.node.type}</td>
                <td>{item.node.symbol}</td>
                <td>{item.node.amount}</td>
                <td>${item.node.value.toFixed(2)}</td>
            </tr>
        ));
    }

    _buildPagination() {
        return (
            <div className="pagination">
                <FloatingActionButton mini onClick={this.props.handleRequestPage('previous')}>
                    <SkipPrevious />
                </FloatingActionButton>

                <FloatingActionButton mini onClick={this.props.handleRequestPage('next')}>
                    <SkipNext />
                </FloatingActionButton>
            </div>
        );
    }

    render() {
        return (
            <div className="orders-container">
                <Loader isLoading={this.props.isFetching} />

                <div className="section-content-wrapper">
                    <h2>Orders</h2>

                    <table>
                        <tbody>
                            {this._buildTable()}
                        </tbody>
                    </table>
                    {this._buildPagination()}
                </div>
            </div>
        );
    }
}

Orders.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    orders: PropTypes.object.isRequired,
    handleRequestPage: PropTypes.func.isRequired
};

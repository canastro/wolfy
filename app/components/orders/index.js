import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import SkipNext from 'material-ui/svg-icons/av/skip-next';

import '!style!css!sass!./index.scss';

export default class Orders extends PureComponent {
    _buildTable() {
        if (!this.props.data.list) { return null; }

        return this.props.data.list.map(item => (
            <tr>
                <td>{moment(item.node.date).format('L HH:mm')}</td>
                <td>{item.node.type}</td>
                <td>{item.node.symbol}</td>
                <td>{item.node.amount}</td>
                <td>{item.node.value.toFixed(2)}</td>
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
                <h2>Orders</h2>

                <table>
                    {this._buildTable()}
                </table>
                {this._buildPagination()}
            </div>
        );
    }
}

Orders.propTypes = {
    data: PropTypes.object.isRequired,
    handleRequestPage: PropTypes.func.isRequired
};

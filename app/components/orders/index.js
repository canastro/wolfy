import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

export default class Orders extends PureComponent {
    _buildTable() {
        if (!this.props.data) { return null; }

        return this.props.data.map(item => (
            <tr>
                <td>{moment(item.node.date).format('L HH:mm')}</td>
                <td>{item.node.type}</td>
                <td>{item.node.symbol}</td>
                <td>{item.node.amount}</td>
                <td>{item.node.value.toFixed(2)}</td>
            </tr>
        ));
    }

    render() {
        return (
            <div className="orders-container">
                <h2>Orders</h2>

                <table>
                    {this._buildTable()}
                </table>
            </div>
        );
    }
}

Orders.propTypes = {
    data: PropTypes.array
};

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getChart } from '../../actions/chart-actions';
import Home from '../../components/home/home';

class HomeContainer extends PureComponent {
    render() {
        return (
            <Home getChart={this.props.getChart} />
        );
    }
}

HomeContainer.propTypes = {
    getChart: PropTypes.func.isRequired
};

export default connect(() => ({}), { getChart })(HomeContainer);

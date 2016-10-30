import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { red500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '!style!css!sass!./app.scss';

import HeaderContainer from './header/header';
import SidebarContainer from './sidebar';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#2eb398',
        accent1Color: red500
    }
});

class App extends PureComponent {
    render() {
        const params = this.props.params || {};

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="app-container">
                    <HeaderContainer />
                    <div className="app-wrapper">
                        <SidebarContainer
                            pathname={this.props.location.pathname}
                            selectedSymbol={params.symbol}
                        />
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
    params: PropTypes.object,
    location: PropTypes.object
};

export default connect(() => ({}), {})(App);

import React, { PureComponent, PropTypes } from 'react';
import debounce from 'lodash/debounce';
import TextField from 'material-ui/TextField';
import '!style!css!sass!./header.scss';

const getStyles = () => ({
    textfield: {
        inputStyle: {
            color: '#2eb398',
            fontSize: '24px'
        },
        hintStyle: {
            color: '#2eb398',
            fontSize: '24px'
        }
    }
});

export default class Header extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            symbol: ''
        };

        this._handleChange = this._handleChange.bind(this);
    }

    componentWillMount() {
        this.setSymbol = debounce(this.props.setSymbol, 500);
    }

    _handleChange(event) {
        const symbol = event.target.value;

        this.setState({ symbol }, () => {
            this.setSymbol(symbol);
        });
    }

    render() {
        const styles = getStyles();

        return (
            <header className="header-container">
                <TextField
                    className="header-symbol-search"
                    hintStyle={styles.textfield.hintStyle}
                    inputStyle={styles.textfield.inputStyle}
                    hintText="Symbol"
                    value={this.state.symbol}
                    onChange={this._handleChange}
                />
            </header>
        );
    }
}

Header.propTypes = {
    setSymbol: PropTypes.func.isRequired
};

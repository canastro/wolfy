import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const getDisplayName = Component => Component.displayName || Component.name || 'Component';

export default function fitWidth(WrappedComponent, withRef = true, minWidth = 100) {
    class ResponsiveComponent extends PureComponent {
        constructor(props) {
            super(props);

            this.handleWindowResize = this.handleWindowResize.bind(this);
            this.getWrappedInstance = this.getWrappedInstance.bind(this);
            this.saveNode = this.saveNode.bind(this);
            this.setTestCanvas = this.setTestCanvas.bind(this);
            this.state = {};
        }

        componentDidMount() {
            window.addEventListener('resize', this.handleWindowResize);
            const el = this.node;
            const w = el.parentNode.clientWidth - 80;

            /* eslint-disable react/no-did-mount-set-state */
            this.setState({
                width: Math.max(w, minWidth),
                ratio: this.getRatio()
            });
            /* eslint-enable react/no-did-mount-set-state */
        }

        componentWillReceiveProps() {
            setTimeout(() => this.handleWindowResize(), 500);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleWindowResize);
        }

        getRatio() {
            if (this.testCanvas) {
                const context = this.testCanvas.getContext('2d');

                const devicePixelRatio = window.devicePixelRatio || 1;
                const backingStoreRatio = context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;

                return devicePixelRatio / backingStoreRatio;
            }
            return 1;
        }

        setTestCanvas(node) {
            this.testCanvas = node;
        }

        getWrappedInstance() {
            return this.node;
        }

        saveNode(node) {
            this.node = node;
        }

        handleWindowResize() {
            /* eslint-disable react/no-find-dom-node */
            const el = ReactDOM.findDOMNode(this.node);
            /* eslint-enable react/no-find-dom-node */

            const w = el.parentNode.clientWidth;

            if (w > minWidth) {
                this.setState({
                    width: Math.max(w, minWidth),
                    ratio: this.getRatio()
                });
            }
        }

        render() {
            const ref = withRef ? { ref: this.saveNode } : {};

            if (this.state.width) {
                return (
                    <WrappedComponent
                        width={this.state.width}
                        ratio={this.state.ratio}
                        {...this.props}
                        {...ref}
                    />
                );
            }

            return (
                <div {...ref}>
                    <canvas ref={this.setTestCanvas} />
                </div>
            );
        }
    }

    ResponsiveComponent.propTypes = {
        isExpanded: PropTypes.bool.isRequired
    };

    ResponsiveComponent.displayName = `fitWidth(${getDisplayName(WrappedComponent)})`;

    return connect(state => ({
        isExpanded: state.sidebar.isExpanded
    }), { })(ResponsiveComponent);
}

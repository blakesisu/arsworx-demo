import React from 'react';
// import PropTypes from 'prop-types';

// Components
// SVGs
// Constants
// Styles

// const defaultState = { error: null, errorInfo: null };
const defaultState = {
  hasError: false,
  error: null,
  info: null
};

export default class ErrorBoundary extends React.Component {
  // Prop Types
  // ------------------------------------------------------------------------ //
  // static propTypes = {};
  // static defaultProps = {};

  // Constructor
  // ------------------------------------------------------------------------ //
  // constructor(props) {
  //   super(props);
  // }

  // Variables
  // ------------------------------------------------------------------------ //
  state = defaultState;

  // Lifecycle methods
  // ------------------------------------------------------------------------ //
  componentDidCatch(error, info) {
    // Catch errors in any components below and re-render with error message
    console.log('are we catching?', error, info);
    this.setState({
      hasError: true,
      error: error,
      info: info
    });
    // You can also log error messages to an error reporting service here
  }

  // Event handlers
  // ------------------------------------------------------------------------ //

  // Class methods
  // ------------------------------------------------------------------------ //

  // Render methods
  // ------------------------------------------------------------------------ //
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1 style={{ color: 'red', fontSize: '20px' }}>
            Oops, something went wrong :(
          </h1>
          <br />
          <h1>
            If possible, please take a screenshot of expanded details, and send
            to contact/support team.
          </h1>
          <br />
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <p>The error: {this.state.error.toString()}</p>
            <br />
            <p>Where it occured: {this.state.info.componentStack}</p>
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

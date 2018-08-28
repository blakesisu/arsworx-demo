import React from 'react';
// import PropTypes from 'prop-types';

// Components
// import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';
import Button from 'components/_shared/Button/Button';
// SVGs
// Constants
import './Banner.css';

export default class Banner extends React.Component {
  // Prop Types
  // ------------------------------------------------------------------------ //
  static propTypes = {};
  static defaultProps = {};

  // Constructor
  // ------------------------------------------------------------------------ //
  // constructor(props) {
  //   super(props);
  // }

  // Variables
  // ------------------------------------------------------------------------ //

  // Lifecycle methods
  // ------------------------------------------------------------------------ //

  // Event handlers
  // ------------------------------------------------------------------------ //

  // Class methods
  // ------------------------------------------------------------------------ //

  // Render methods
  // ------------------------------------------------------------------------ //

  // <div className="banner__button">
  //   <a href="#">Learn How I can Help</a>
  // </div>
  render() {
    return (
      <div className="banner">
        <h1>We're all in this together.</h1>
        <Button 
          className="banner__button"
          value="Learn How I can Help"
        />
      </div>
    );
  }
}

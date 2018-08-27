import React from 'react';
// import PropTypes from 'prop-types';

// Components
// import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';
// SVGs
// Constants
import './Footer.css';

export default class Footer extends React.Component {
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
  render() {
    return (
      <div className="footer">
        <p>&copy;2018 artworxLA</p>
        <ul className="footer__socials">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}

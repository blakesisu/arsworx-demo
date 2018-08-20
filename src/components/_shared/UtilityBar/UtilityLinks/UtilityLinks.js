import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Components
// SVGs
// Constants
// Styles
import './UtilityLinks.css';

// Prop Types
const propTypes = {};
const defaultProps = {};

const mapStateToProps = state => ({
  state
});

const leaveApp = (e, props) => {
  e.preventDefault();
  console.log('want to leave?')
  // props.dispatch(push('/log-out'));
};

const UtilityLinks = props => {
  return (
    <ul className="utility-links">
      {/* <li className="utility-links__item">
        <Link to="/settings" className="utility-links__link">
          Settings
        </Link>
      </li> */}
      <li className="utility-links__item" onClick={e => leaveApp(e, props)}>
        <a className="utility-links__link" href="#/">
          Log Out
        </a>
      </li>
    </ul>
  );
};

UtilityLinks.propTypes = propTypes;
UtilityLinks.defaultProps = defaultProps;

export default connect(mapStateToProps)(UtilityLinks);

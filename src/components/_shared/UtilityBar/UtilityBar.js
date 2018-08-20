import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// Components
import Breadcrumbs from 'components/_shared/UtilityBar/Breadcrumbs/Breadcrumbs';
import UtilityLinks from 'components/_shared/UtilityBar/UtilityLinks/UtilityLinks';
// SVGs
// Constants
// Styles
import './UtilityBar.css';

// Prop Types
const propTypes = {};
const defaultProps = {};

const mapStateToProps = state => ({
  // user: state.db.user
  user: {
    isAuthenticated: true
  }
});

const UtilityBar = props => {
  // only show if user is logged in
  if (props.user.isAuthenticated === false) {
    return null;
  }

  return (
    <div className="utility-bar">
      <div className="utility-bar__container">
        <Breadcrumbs />
        <UtilityLinks
          userId={props.user.profile ? props.user.profile.id : null}
        />
      </div>
    </div>
  );
};

UtilityBar.propTypes = propTypes;
UtilityBar.defaultProps = defaultProps;

export default connect(mapStateToProps)(UtilityBar);

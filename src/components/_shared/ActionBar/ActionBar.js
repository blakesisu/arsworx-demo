import React from 'react';
import PropTypes from 'prop-types';

// Components
// SVGs
// Constants
// Styles
import './ActionBar.css';

// Prop Types
const propTypes = {
  secondaryActions: PropTypes.arrayOf(PropTypes.element),
  primaryActions: PropTypes.arrayOf(PropTypes.element)
};
const defaultProps = {
  secondaryActions: [],
  primaryActions: []
};

const ActionBar = props => {
  return (
    <div className="action-bar">
      <div className="action-bar__secondary">
        {props.secondaryActions.map(action => action)}
      </div>
      <div className="action-bar__primary">
        {props.primaryActions.map(action => action)}
      </div>
    </div>
  );
};

ActionBar.propTypes = propTypes;
ActionBar.defaultProps = defaultProps;

export default ActionBar;

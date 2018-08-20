import React from 'react';
import PropTypes from 'prop-types';

// Components
// SVGs
// Constants
// Styles
import './PageHeader.css';

// Prop Types
const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};
const defaultProps = {
  description: null
};

const PageHeader = props => {
  return (
    <div className="page-header">
      <h1 className="page-header__title">{props.title}</h1>
      {props.description && (
        <p className="page-header__description">{props.description}</p>
      )}
    </div>
  );
};

PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;

export default PageHeader;

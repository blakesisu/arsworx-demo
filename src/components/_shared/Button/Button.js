import React from 'react';
import PropTypes from 'prop-types';

// Components
// SVGs
// Constants
// Styles
import './Button.css';

// Prop Types
const propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  hollow: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func
};
const defaultProps = {
  className: '',
  type: 'button',
  hollow: false,
  isLoading: false,
  icon: null,
  onClick: () => {}
};

const Button = props => {
  return (
    <button
      className={`
        button
        ${props.className}
        ${props.isLoading ? 'is-loading' : ''}
        ${props.shape ? `button--${props.shape}` : ''}
        ${props.hollow ? 'button--hollow' : ''}
      `}
      onClick={props.onClick}
      type={props.type}
    >
      {props.value}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;

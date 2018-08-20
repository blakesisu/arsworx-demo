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
  hierarchy: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func
};
const defaultProps = {
  className: '',
  type: 'button',
  hollow: false,
  isLoading: false,
  hierarchy: null,
  icon: null,
  iconPosition: 'left',
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
        ${props.hierarchy ? `button--${props.hierarchy}` : ''}
        ${props.hollow ? 'button--hollow' : ''}
        ${props.icon ? `button--icon-${props.iconPosition}` : ''}
      `}
      onClick={props.onClick}
      type={props.type}
    >
      {props.icon}
      {props.value}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;

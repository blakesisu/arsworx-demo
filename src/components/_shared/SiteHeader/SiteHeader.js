import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
// SVGs
// import Logo from 'svgs/logo.svg';
// Constants

// Styles
import './SiteHeader.css';

// Prop Types
const propTypes = {};
const defaultProps = {};

const SiteHeader = props => {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <Link to="/" className="site-header__logo">
          {/* <img src={Logo} alt="something" /> */}
        </Link>
        <h1 className="site-header__title">
          React Application
        </h1>
      </div>
    </header>
  );
};

SiteHeader.propTypes = propTypes;
SiteHeader.defaultProps = defaultProps;

export default SiteHeader;

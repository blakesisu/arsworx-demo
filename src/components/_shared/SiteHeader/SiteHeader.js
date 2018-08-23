import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
// SVGs
import Logo from 'images/logo.png';
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
          <img src={Logo} alt="something" />
        </Link>
        <div className="site-header__right">
          <Link to="/directory" className="site-header__link">
            <p>Directory</p>
          </Link>
          <Link to="/report" className="site-header__link">
            <p>Report</p>
          </Link>
          <Link to="/add-me" className="site-header__link">
            <p>Add Me</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

SiteHeader.propTypes = propTypes;
SiteHeader.defaultProps = defaultProps;

export default SiteHeader;

import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
// SVGs
import { ReactComponent as Logo } from 'svgs/logo.svg';
// Constants

// Styles
import './SiteHeader.css';

// Prop Types
const propTypes = {};
const defaultProps = {};

const SiteHeader = props => {
  // <img src={Logo} alt="something" />
  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__left">
          <Link to="/" className="site-header__logo">
            <Logo />
          </Link>
          <h2>Creative Careers Youth Network</h2>
        </div>
        <div className="site-header__right">
          <Link to="/" className="site-header__link">
            <p>Home</p>
          </Link>
          <Link to="/directory" className="site-header__link">
            <p>Directory</p>
          </Link>
          <Link to="/report" className="site-header__link">
            <p>The Report</p>
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

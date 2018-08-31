import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';

// Components
// SVGs
import { ReactComponent as Logo } from 'svgs/logo.svg';
import { ReactComponent as Hamburger } from 'svgs/hamburger.svg';
import Search from 'images/search_icon.png';
// Constants

// Styles
import './SiteHeader.css';

export class SiteHeader extends React.Component {
  // Prop Types
  // ------------------------------------------------------------------------ //
  static propTypes = {};
  static defaultProps = {};

  // Constructor
  // ------------------------------------------------------------------------ //

  // Variables
  // ------------------------------------------------------------------------ //
  state = {
    menu: false
  }

  // Lifecycle methods
  // ------------------------------------------------------------------------ //
  // componentDidMount() {
  // }

  // Event handlers
  // ------------------------------------------------------------------------ //
  handleSiteSearch = () => {
    console.log('handleSiteSearch')
  }

  handleMenu = () => {
    this.setState({menu: !this.state.menu})
  }

  handleLink = (e, link) => {
    if (e) e.preventDefault();
    if (this.state.menu) {
      this.handleMenu();
    }
    this.props.dispatch(push(link));
  }

  // Class methods
  // ------------------------------------------------------------------------ //

  // Render methods
  // ------------------------------------------------------------------------ //

  render() {
    return (
      <header className={`
        site-header
        ${this.state.menu ? 'site-header--responsive' : ''}
        `}>
        <div className="site-header__container">
          <div className="site-header__left">
            <Link to="/" className="site-header__logo">
              <Logo />
            </Link>
            <h2>Creative Careers Youth Network</h2>
          </div>
          <ul className={`
            site-header__right
            ${this.state.menu ? 'site-header--responsive' : ''}
          `}>
            <li className="site-header__link" onClick={e => this.handleLink(e, '/')}>
              <a href="#">Home</a>
            </li>
            <li className="site-header__link" onClick={e => this.handleLink(e, '/directory')}>
              <a href="#">Directory</a>
            </li>
            <li className="site-header__link" onClick={e => this.handleLink(e, '/report')}>
              <a href="#">Report</a>
            </li>
            <li className="site-header__link" onClick={e => this.handleLink(e, '/add-me')}>
              <a href="#">Add Me</a>
            </li>
            <li className="site-header__link" onClick={this.handleSiteSearch}>
              <img src={Search} alt="nav search"/>
            </li>
            <li className="site-header__link ham-icon"  onClick={this.handleMenu}>
              <Hamburger alt="menu"/>
            </li>
          </ul>
        </div>
      </header>
    )
  }
};

export default connect(null)(SiteHeader);

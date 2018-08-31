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

  routes = {
    home: '/',
    directory: '/directory',
    report: '/report',
    ['add me']: '/add-me'
  };

  // Lifecycle methods
  // ------------------------------------------------------------------------ //
  // componentDidMount() {
  // }

  // Event handlers
  // ------------------------------------------------------------------------ //
  handleSiteSearch = () => {
    console.log('handleSiteSearch', this.props)
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
  renderLinks = () => {
    return (
      <ul className={`
        site-header__right
        ${this.state.menu ? 'site-header--responsive' : ''}
      `}>
        {Object.keys(this.routes).map(route => (
          <li
            className={`
              site-header__link
              ${this.props.path === this.routes[route] ? "site-header--active" : ""}
              `}
            onClick={e => this.handleLink(e, this.routes[route])}>
            <a href="#">{route}</a>
          </li>
        ))}
        <li className="site-header__link site-header__search" onClick={this.handleSiteSearch}>
          <img src={Search} alt="nav search"/>
        </li>
        <li className="site-header__link ham-icon"  onClick={this.handleMenu}>
          <Hamburger alt="menu"/>
        </li>
      </ul>
    )
  }

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
          { this.renderLinks() }
        </div>
      </header>
    )
  }
};

export default connect(null)(SiteHeader);

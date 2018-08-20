import React from 'react';
// import PropTypes from 'prop-types';
import { HashRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Components
// SVGs
import ChevronRight from 'svgs/chevron-right.svg';
// Constants
// Styles
import './Breadcrumbs.css';

const mapStateToProps = state => ({
  state
});

// const BreadcrumbsItem = ({ ...rest, match }) => {
const BreadcrumbsItem = ({ match, ...rest }) => {
  return (
    <React.Fragment>
      <li className="breadcrumbs__item">
        <Link
          to={match.url || ''}
          className={`breadcrumbs__link ${match.isExact && 'is-current'}`}
        >
          {match.params.path.replace(/-/g, ' ')}
        </Link>
        <img src={ChevronRight} alt="" className="breadcrumbs__chevron" />
      </li>
      <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
    </React.Fragment>
  );
};

const goingHome = (e, props) => {
  e.preventDefault();
  console.log('want to go home?')
  // props.dispatch(push('/'));
};

const Breadcrumbs = props => {
  return (
    <HashRouter>
      <ul className="breadcrumbs">
        <li className="breadcrumbs__item" onClick={e => goingHome(e, props)}>
          <a className="breadcrumbs__link" href="#/">
            Home
          </a>
          <img src={ChevronRight} alt="" className="breadcrumbs__chevron" />
        </li>
        <Route path="/:path" component={BreadcrumbsItem} />
      </ul>
    </HashRouter>
  );
};

export default connect(mapStateToProps)(Breadcrumbs);

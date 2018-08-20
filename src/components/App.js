import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Components
import PrivateRoute from 'components/_shared/PrivateRoute/PrivateRoute';
import SiteHeader from 'components/_shared/SiteHeader/SiteHeader';
import UtilityBar from 'components/_shared/UtilityBar/UtilityBar';
import Home from 'components/Home/Home';
import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';
// SVGs
// Constants
// Styles
import './App.css';

// Redux
const mapStateToProps = state => ({
});

const defaultState = {
  errors: null
};

export class App extends React.Component {
  // Prop Types
  // ------------------------------------------------------------------------ //
  static propTypes = {};
  static defaultProps = {};

  // Constructor
  // ------------------------------------------------------------------------ //
  // constructor(props) {
  //   super(props);
  // }

  // Variables
  // ------------------------------------------------------------------------ //
  state = defaultState;

  // Lifecycle methods
  // ------------------------------------------------------------------------ //
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  // Event handlers
  // ------------------------------------------------------------------------ //

  // Class methods
  // ------------------------------------------------------------------------ //

  // Render methods
  // ------------------------------------------------------------------------ //
  render() {

    return (
      <div className={`boilerplate`}>
        <ErrorBoundary>
          <SiteHeader />
        </ErrorBoundary>
        <ErrorBoundary>
          <UtilityBar />
        </ErrorBoundary>
        <main className={`main`}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute component={Home} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));

import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

// Components
import PrivateRoute from 'components/_shared/PrivateRoute/PrivateRoute';
import SiteHeader from 'components/_shared/SiteHeader/SiteHeader';
// import UtilityBar from 'components/_shared/UtilityBar/UtilityBar';
import Main from 'components/Main/Main';
import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';
// SVGs
// Constants
// Styles
import './App.css';

// Redux
import { fetchProviders } from 'store/modules/db/providers/providersReducer';
const mapStateToProps = state => ({
  // providers: state.db.providers
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
  componentDidMount() {
    this.getProviders();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  // Event handlers
  // ------------------------------------------------------------------------ //

  // Class methods
  // ------------------------------------------------------------------------ //
  getProviders = async () => {
    await this.props.dispatch(fetchProviders());
  }

  // Render methods
  // ------------------------------------------------------------------------ //
  render() {

    return (
      <ErrorBoundary>
        <SiteHeader />
        <Main />
      {/* <main className={`main`}>
          <Switch>
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute component={Main} />
          </Switch>
        </main> */}
      </ErrorBoundary>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));

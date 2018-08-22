import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

// Components
// import PrivateRoute from 'components/_shared/PrivateRoute/PrivateRoute';
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
import { fetchLocations } from 'store/modules/db/locations/locationsReducer';

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
    this.getAllData();
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

  getAllData = async () => {
    await this.props.dispatch(fetchProviders());
    await this.props.dispatch(fetchLocations());
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

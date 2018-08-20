import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';
import ExampleMap from 'components/_shared/Map/ExampleMap';

// SVGs
// Constants
// Styles
import './Main.css';

// Redux
const mapStateToProps = state => ({
  // requesting: state.api.requesting,
  // user: state.db.user,
  providers: state.db.providers,
});

export class Home extends React.Component {
  // Prop Types
  // ------------------------------------------------------------------------ //
  static propTypes = {
    recent: PropTypes.arrayOf(PropTypes.object)
  };
  static defaultProps = {};

  // Constructor
  // ------------------------------------------------------------------------ //
  // constructor(props) {
  //   super(props);
  // }

  // Variables
  // ------------------------------------------------------------------------ //

  // Lifecycle methods
  // ------------------------------------------------------------------------ //
  // componentDidMount() {
  // }

  // Event handlers
  // ------------------------------------------------------------------------ //

  // Class methods
  // ------------------------------------------------------------------------ //

  // Render methods
  // ------------------------------------------------------------------------ //
  renderProviders = () => {
    return this.props.providers.providers.map(provider => (
      <li key={provider.title} className={`provider`}>
        <p>Name: {provider.title}</p>
        <p>Address: {provider.location.address}</p>
        <p>Hours: {`${provider.hours.opens} - ${provider.hours.closes}`}</p>
        <p>Telephone: {provider.phone}</p>
        <p>Website: {provider.website}</p>
      </li>
    ))
  }

  render() {
    return (
      <ErrorBoundary>
        <main className={`main`}>
          <ul className={`providers-list`}>
            { !this.props.providers.requesting && this.renderProviders() }
          </ul>
          <ExampleMap providers={this.props.providers.providers}/>
        </main>
      </ErrorBoundary>
    );
  }
}

export default connect(mapStateToProps)(Home);

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
        <p className={`provider__title`}>{provider.title}</p>
        <p className={`provider__address`}>{provider.location.address}</p>
        <p className={`provider__hours`}>Hours: {`${provider.hours.opens} - ${provider.hours.closes}`}</p>
        <p className={`provider__phone`}>Telephone: {provider.phone}</p>
        <a href={`http://www.${provider.website}`} className={`provider__site`}>{provider.website}</a>
      </li>
    ))
  }

  render() {
    return (
      <ErrorBoundary>
        <main className={`main`}>
          <section className="providers">
            <div className="providers__search">
              <input className="providers__search-name" type="text" placeholder="Search by name"/>
              <input className="providers__search-address" type="text" />
            </div>
            <div className="providers__results">
              <div className="providers__results-title"><p>Providers</p></div>
              <div className="providers__results-filters"><p>Filters</p></div>
            </div>
            <ul className={`providers__list`}>
              { !this.props.providers.requesting && this.renderProviders() }
            </ul>
          </section>
          <ExampleMap providers={this.props.providers.providers}/>
        </main>
      </ErrorBoundary>
    );
  }
}

export default connect(mapStateToProps)(Home);

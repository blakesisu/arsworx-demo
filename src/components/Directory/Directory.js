import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';
import ArsMap from 'components/_shared/ArsMap/ArsMap';
import ProviderFilter from 'components/Directory/ProviderFilter/ProviderFilter';

// SVGs
import Verified from "images/verified.png"
// Constants
// Styles
import './Directory.css';

// Redux
const mapStateToProps = state => ({
  // requesting: state.api.requesting,
  // user: state.db.user,
  providers: state.db.providers,
});

export class Directory extends React.Component {
  // Prop Types
  // ------------------------------------------------------------------------ //
  static propTypes = {
    recent: PropTypes.arrayOf(PropTypes.object)
  };
  static defaultProps = {};

  // Constructor
  // ------------------------------------------------------------------------ //

  // Variables
  // ------------------------------------------------------------------------ //
  state = {
    mapView: false,
    options: false,
    overlay: {
      spa: false,
      hood: false
    },
    refresh: false,
    filters: {
      organizationFilters: [],
      creativeFilters: [],
      pipelineFilters: [],
      agesFilters: [],
      populationsFilters: [],
      individualsFilters: [],
    },
    lat: 36.9741,
    lng: -122.0308,
    zoom: 14
  }

  // Lifecycle methods
  // ------------------------------------------------------------------------ //
  // componentDidMount() {
  // }

  // Event handlers
  // ------------------------------------------------------------------------ //
  handleMapView = flag => {
    if (this.state.mapView !== flag) {
      this.setState({ mapView: flag });
    }
  }

  chooseProvider = (e, provider) => {
    if (e) e.preventDefault();
    this.setLocation({
      lat: +provider.location.latitude,
      lng: +provider.location.longitude
    });
  }

  setLocation = locationData => {
    const {lat, lng} = locationData;
    this.setState({
      lat,
      lng
    });
  }

  navigateDetails = e => {
    // if (e) e.preventDefault();
    // this.props.dispatch(push({'/details'}))
  }

  showOptions = e => {
    // if (e) e.preventDefault();
    this.setState({options: !this.state.options})
  }

  toggleCheckbox = (e, type) => {
    // if (e) e.preventDefault();
    this.setState({[type]: !this.state[type]})
  }

  toggleOverlay = (e, type) => {
    // if (e) e.preventDefault();
    this.setState({overlay: {[type]: !this.state.overlay[type]}})
  }

  handleFilter = (e, filterCandidate) => {
    let type = filterCandidate.type + 'Filters';
    let filters = { ...this.state.filters };

    if (filters[type].indexOf(filterCandidate.filter) > -1) {
      filters[type] = filters[type].filter(fltr => fltr !== filterCandidate.filter);
    } else {
      filters[type] = filters[type].concat(filterCandidate.filter)
    }

    this.setState({ filters });
  }

  resetFilters = e => {
    console.log('reset filters')
  }

  applyFilters = e => {
    console.log('apply filters')
  }


  // Class methods
  // ------------------------------------------------------------------------ //

  // Render methods
  // ------------------------------------------------------------------------ //
  renderProviders = () => {
    return this.props.providers.providers.map(provider => (
      <li
        key={provider.title}
        className={`provider__container`}
        onClick={e => this.chooseProvider(e, provider)}
      >
        <div className="provider">
          <p className={`provider__title`}>{provider.organization}</p>
          <p className={`provider__address`}>{provider.location.address}</p>
          <p className={`provider__city`}>{provider.location.city}</p>
          <p className={`provider__phone`}>{provider.phone}</p>
          <p className={`provider__hours`}>Hours: {`${provider.hours.opens} - ${provider.hours.closes}`}</p>
        </div>
        {provider.verified ? <div className="provider__verified"><img src={Verified} alt="verified"/></div> : null}
      </li>
    ))
  }

  render() {
    return (
      <ErrorBoundary>
        <div className={`directory`}>
          <section className={`
            providers
            ${this.state.mapView ? "providers--no-vis" : ""}
            `}>
            <div className="providers__search">
              <input className="providers__search-name" type="text" placeholder="Search by Organization Name"/>
              <input className="providers__search-address" type="text" />
            </div>
            <div className="providers__results">
              <div className="providers__results-title"><p>Search Results</p></div>
              <div
                className={`
                  providers__results-options
                  ${this.state.options ? "providers__results-options--show" : ""}
                  `}
                onClick={this.showOptions}
              >
                <p>Filters</p>
              </div>
            </div>
            { this.state.options ?
              (<ProviderFilter
                  refresh={this.state.refresh}
                  overlayData={this.state.overlay}
                  toggleOverlay={this.toggleOverlay}
                  toggleCheckbox={this.toggleCheckbox}
                  handleFilter={this.handleFilter}
                  filters={this.state.filters}
                  resetFilters={this.resetFilters}
                  applyFilters={this.applyFilters}
                />)
              :
              (<ul className={`providers__list`}>
                { !this.props.providers.requesting && this.renderProviders() }
              </ul>)
            }
          </section>
          <ArsMap
            fullSize={this.state.mapView}
            handleMapView={this.handleMapView}
            providers={this.props.providers.providers}
            location={[ this.state.lat, this.state.lng ]}
            setLocation={this.setLocation}
            zoom={this.state.zoom}
            overlay={this.state.overlay}/>
        </div>
      </ErrorBoundary>
    );
  }
}

export default connect(mapStateToProps)(Directory);

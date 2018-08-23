import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';
import ArsMap from 'components/_shared/ArsMap/ArsMap';

// SVGs
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
  constructor() {
    super()
    // Santa Cruz is default location
    this.state = {
      options: false,
      overlay: {
        spa: false,
        hood: false
      },
      refresh: false,
      lat: 36.9741,
      lng: -122.0308,
      zoom: 13
    }
  }

  // Variables
  // ------------------------------------------------------------------------ //

  // Lifecycle methods
  // ------------------------------------------------------------------------ //
  // componentDidMount() {
  // }

  // Event handlers
  // ------------------------------------------------------------------------ //
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

  // Class methods
  // ------------------------------------------------------------------------ //

  // Render methods
  // ------------------------------------------------------------------------ //
  renderProviders = () => {
    return this.props.providers.providers.map(provider => (
      <li
        key={provider.title}
        className={`provider`}
        onClick={e => this.chooseProvider(e, provider)}
      >
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
        <div className={`directory`}>
          <section className="providers">
            <div className="providers__results">
              <div className="providers__results-title"><p>Providers</p></div>
              <div
                className={`
                  providers__results-options
                  ${this.state.options ? "providers__results-options--show" : ""}
                  `}
                onClick={this.showOptions}
              >
                <p>Options</p>
              </div>
            </div>
            { this.state.options ?
              (<div className="providers__options">
                <div className="providers__search">
                  <h2>Search by name or Address</h2>
                  <input className="providers__search-name" type="text" placeholder="Search by name"/>
                  <input className="providers__search-address" type="text" />
                </div>
                <div className="providers__effects">
                  <div className="providers__effect">
                    <input type="checkbox" checked={this.state.refresh} onChange={e => this.toggleCheckbox(e, 'refresh')}/>
                    <p>Refresh map when repositioned</p>
                  </div>
                  <div className="providers__effect">
                    <input type="checkbox" checked={this.state.overlay.spa} onChange={e => this.toggleOverlay(e, 'spa')}/>
                    <p>Show SPAs overlay</p>
                  </div>
                  <div className="providers__effect">
                    <input type="checkbox" checked={this.state.overlay.hood} onChange={e => this.toggleOverlay(e, 'hood')}/>
                    <p>Show hoods overlay</p>
                  </div>
                </div>
                <div className="providers__filters">
                  <div className="providers__filter">
                    <input type="checkbox" checked={false} />
                    <p>Non-profit</p>
                  </div>
                  <div className="providers__filter">
                    <input type="checkbox" checked={false} />
                    <p>Some filter</p>
                  </div>
                  <div className="providers__filter">
                    <input type="checkbox" checked={false} />
                    <p>Some filter</p>
                  </div>

                </div>
              </div>)
              :
              (<ul className={`providers__list`}>
                { !this.props.providers.requesting && this.renderProviders() }
              </ul>)
            }
          </section>
          <ArsMap
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

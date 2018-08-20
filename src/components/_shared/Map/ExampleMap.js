import React from 'react';
import PropTypes from 'prop-types';

// react leaflet
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Components
// SVGs
// Constants
// Styles
import './ExampleMap.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class ExampleMap extends React.Component {
  // Prop Types
  // ------------------------------------------------------------------------ //
  static propTypes = {};
  static defaultProps = {};

  // Constructor
  // ------------------------------------------------------------------------ //
  constructor() {
    super()
    // Santa Cruz is default location
    this.state = {
      lat: 36.9741,
      lng: -122.0308,
      zoom: 11
    }
  }

  // Variables
  // ------------------------------------------------------------------------ //

  // Lifecycle methods
  // ------------------------------------------------------------------------ //
  componentDidMount() {
    this.getInitLocation();
  }

  // Event handlers
  // ------------------------------------------------------------------------ //

  // Class methods
  // ------------------------------------------------------------------------ //

  getInitLocation = () => {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
      });
    } else {
      /* geolocation IS NOT available */
      return;
    }
  }

  createMarkers = () => {
    return this.props.providers.map(provider => {
      return (
        <Marker key={provider.phone} position={[
          provider.location.longitude,
          provider.location.latitude
        ]}>
          <Popup>
            <div key={provider.title} className={`provider`}>
              <p>Name: {provider.title}</p>
              <p>Address: {provider.location.address}</p>
              <p>Hours: {`${provider.hours.opens} - ${provider.hours.closes}`}</p>
              <p>Telephone: {provider.phone}</p>
              <p>Website: {provider.website}</p>
            </div>
          </Popup>
        </Marker>
      )
    })

  }


  handleMarker = ({ event, anchor, payload }) => {
    console.log('check marker', event, anchor, payload)
  } 

  // Render methods
  // ------------------------------------------------------------------------ //
  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <div className="example-map">
        <LeafletMap center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {this.props.providers.length > 0 && this.createMarkers()}
        </LeafletMap>
      </div>
    );
  }
}

export default ExampleMap;

import React, { createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// react leaflet
import { Map as LeafletMap, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

// Components
// SVGs
// Constants
// Styles
import './ArsMap.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const mapStateToProps = state => ({
  geoData: state.db.locations.locations,
});

class ArsMap extends React.Component {
  // Prop Types
  // ------------------------------------------------------------------------ //
  static propTypes = {};
  static defaultProps = {};

  // Constructor
  // ------------------------------------------------------------------------ //
  // constructor() {
  //   super()
  //   // Santa Cruz is default location
  //   this.state = {
  //     lat: 36.9741,
  //     lng: -122.0308,
  //     zoom: 13
  //   }
  // }

  // Variables
  // ------------------------------------------------------------------------ //
  mapRef = createRef()

  // Lifecycle methods
  // ------------------------------------------------------------------------ //
  componentDidMount() {
    this.getInitLocation();
  }

  // Event handlers
  // ------------------------------------------------------------------------ //
  handleClick = e => {
    console.log('handleclick loc ', e, this.mapRef)
    // this.mapRef.current.leafletElement.locate()
    const { lat, lng } = e.latlng;
    this.props.setLocation({ lat, lng});
  }

  // Class methods
  // ------------------------------------------------------------------------ //

  getInitLocation = () => {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(position => {
        this.props.setLocation({ lat: position.coords.latitude, lng: position.coords.longitude});
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
          provider.location.latitude,
          provider.location.longitude
        ]}>
          <Popup>
            <div key={provider.title} className={`provider-popup`}>
              <p className={`provider-popup__title`}>{provider.title}</p>
              <p>{provider.location.address}</p>
              <p>Hours: {`${provider.hours.opens} - ${provider.hours.closes}`}</p>
              <p>Telephone: {provider.phone}</p>
              <a href={`http://www.${provider.website}`} className={`provider-popup__site`}>{provider.website}</a>
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
    const overlay = Object.keys(this.props.overlay).find(key => {
      return this.props.overlay[key];
    })
    return (
      <div className="arsmap">
        <LeafletMap
          center={this.props.location}
          zoom={this.props.zoom}
          ref={this.mapRef}
          onClick={this.handleClick}
          >
            <TileLayer
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
              url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
            />
          {this.props.providers.length > 0 && this.createMarkers()}
          {overlay && (<GeoJSON data={this.props.geoData[overlay + '_data']} />)}
        </LeafletMap>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ArsMap);

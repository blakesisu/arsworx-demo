import React from 'react';
import './MapToggle.css';

export default class MapToggle extends React.Component {

  dummyFunction = () => {
  }

  triggerMapView = (e, flag) => {
    if (e) e.preventDefault();
    this.props.switchMapView(flag);
    // make resize of map fill appropriate dims
    window.dispatchEvent(new Event('resize'));
  }

  render() {
    return (
      <div
        className={`arsmap-views`}>
        <div
          className={`
          list-view
          `}
          onClick={e => this.triggerMapView(e, false)}>
            <p>list</p>
        </div>
        <div
          className={`
            map-view
            `}
          onClick={e => this.triggerMapView(e, true)}>
            <p>map</p>
        </div>
      </div>
    )
  }
};

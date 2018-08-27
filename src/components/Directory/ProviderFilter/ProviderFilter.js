import React from 'react';
// import PropTypes from 'prop-types';

// Components
import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';

// SVGs
import { ReactComponent as Collapse } from 'svgs/less_icon.svg';
import { ReactComponent as Expand } from 'svgs/more_icon.svg';
// Constants
// Styles
import './ProviderFilter.css';

export default class ProviderFilter extends React.Component {
  // Prop Types
  // ------------------------------------------------------------------------ //
  static propTypes = {};
  static defaultProps = {};

  // Constructor
  // ------------------------------------------------------------------------ //
  constructor() {
    super()
    this.state = {
      effects: false,
      filterTypes: {
        organization: {
          title: "Organization Sector",
          visibility: false,
          filters: [
            'creative industry',
            'higher education',
            'k-12/alt education',
            'non-profit',
            'workforce investment'
          ]
        },
        creative: {
          title: "Creative Sector Alignment",
          visibility: false,
          filters: [
            'creative section filter'
          ]
        },
        pipeline: {
          title: "Pipeline Service",
          visibility: false,
          filters: [
            'pipeline section filter'
          ]
        },
        ages: {
          title: "Ages Served",
          visibility: false,
          filters: [
            'ages section filter'
          ]
        },
        populations: {
          title: "Populations Served",
          visibility: false,
          filters: [
            'populations section filter'
          ]
        },
        individuals: {
          title: "Number of Individuals Served",
          visibility: false,
          filters: [
            'Less than 10',
            '11-50',
            '51-100',
            '101-500',
            '501-1000',
            'More than 1000',
          ]
        }
      }
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
  toggleExpander = (e, type) => {
    // if (e) e.preventDefault();
    if (type === 'effects') {
      this.setState({[type]: !this.state[type]})
    } else {
      let filterTypes = {...this.state.filterTypes}
      filterTypes[type].visibility = !filterTypes[type].visibility;
      this.setState({filterTypes})
    }
  }

  // Class methods
  // ------------------------------------------------------------------------ //

  // Render methods
  // ------------------------------------------------------------------------ //
  buildFilterCheckboxes = type => {
    return (
      <li className="providers__filter">
        {this.state.filterTypes[type].filters.map(filter => (
          <div>
            <input
              type="checkbox"
              checked={this.props.filters[type + "Filters"].indexOf(filter) > -1}
              onChange={e => this.props.handleFilter(e, {
                  type,
                  filter
                })} />
            <p>{filter}</p>
          </div>
        )) }
      </li>
    )
  }


  expandContract = type => {
    if (type === 'effects') {
      return (
        <div onClick={e => this.toggleExpander(e, type)}>
          {this.state.effects ? (<Collapse />) : (<Expand />) }
        </div>
      )
    } else {
      return (
        <div onClick={e => this.toggleExpander(e, type)}>
          {this.state.filterTypes[type].visibility ? (<Collapse />) : (<Expand />) }
        </div>
      )
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="providers__options">
          <div className="providers__effects">
            <div className="providers__filter-header">
              <h2>Effects</h2>
              { this.expandContract('effects') }
            </div>
            {this.state.effects ?
              (
                <div className="providers__effects-list">
                  <div className="providers__effect">
                    <input
                      type="checkbox"
                      checked={this.props.refresh}
                      onChange={e => this.props.toggleCheckbox(e, 'refresh')}/>
                    <p>Refresh map when repositioned</p>
                  </div>
                  <div className="providers__effect">
                    <input
                      type="checkbox"
                      checked={this.props.overlayData.spa}
                      onChange={e => this.props.toggleOverlay(e, 'spa')}/>
                    <p>Show SPAs overlay</p>
                  </div>
                  <div className="providers__effect">
                    <input
                      type="checkbox"
                      checked={this.props.overlayData.hood}
                      onChange={e => this.props.toggleOverlay(e, 'hood')}/>
                    <p>Show Neighborhoods overlay</p>
                  </div>
                </div>
              )
              : null
            }
          </div>

          {
            Object.keys(this.state.filterTypes).map(filterType => (
              <div className={`providers__${filterType}`}>
                <div className="providers__filter-header">
                  <h2>{ this.state.filterTypes[filterType].title }</h2>
                  { this.expandContract(filterType) }
                </div>
                {this.state.filterTypes[filterType].visibility ?
                  (
                    <ul className={`providers__${filterType}-filters`}>
                      {this.buildFilterCheckboxes(filterType)}
                    </ul>
                  )
                  : null
                }
              </div>
            ))
          }

        </div>
      </ErrorBoundary>
    );
  }
}


import React from 'react';
// import PropTypes from 'prop-types';

// Components
import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';
import Button from 'components/_shared/Button/Button';

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

  // Variables
  // ------------------------------------------------------------------------ //
  state = {
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
      // this is breaking
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
    console.log('buildFilterCheckboxes', type, this.props)
    return (
      <ul className={`providers__${type}-filters`}>
        {this.state.filterTypes[type].filters.map(filter => (
          <li key={filter.split(' ')[0]} className="providers__filter">
            <label>
              <input
                type="checkbox"
                checked={this.props.filters[type + "Filters"].indexOf(filter) > -1}
                onChange={e => this.props.handleFilter(e, {
                    type,
                    filter
                  })} />
              <span className="fake-input"></span>
            </label>
            <p>{filter}</p>
          </li>
        )) }
      </ul>
    )
  }


  render() {
    return (
      <ErrorBoundary>
        <div className="providers__options">
          <div className="providers__effects">
            <div className="providers__filter-header">
              <h2>Effects</h2>
              { <div className="providers__expand-icon" onClick={e => this.toggleExpander(e, 'effects')}>
                  {this.state.effects ? (<Collapse/>) : (<Expand />) }
                </div>
              }
            </div>
            {this.state.effects ?
              (
                <ul className="providers__effects-list">
                  <li className="providers__effect">
                    <label>
                      <input
                        type="checkbox"
                        checked={this.props.refresh}
                        onChange={e => this.props.toggleCheckbox(e, 'refresh')}/>
                      <span className="fake-input"></span>
                    </label>
                    <p>Refresh map when repositioned</p>
                  </li>
                  <li className="providers__effect">
                    <label>
                      <input
                        type="checkbox"
                        checked={this.props.overlayData.spa}
                        onChange={e => this.props.toggleOverlay(e, 'spa')}/>
                      <span className="fake-input"></span>
                    </label>
                    <p>Show SPAs overlay</p>
                  </li>
                  <li className="providers__effect">
                    <label>
                      <input
                        type="checkbox"
                        checked={this.props.overlayData.hood}
                        onChange={e => this.props.toggleOverlay(e, 'hood')}/>
                      <span className="fake-input"></span>
                    </label>
                    <p>Show Neighborhoods overlay</p>
                  </li>
                </ul>
              )
              : null
            }
          </div>

          {
            Object.keys(this.state.filterTypes).map(filterType => (
              <div key={filterType} className={`
                providers__filters
                providers__${filterType}`}>
                <div className="providers__filter-header">
                  <h2>{ this.state.filterTypes[filterType].title }</h2>
                  { <div
                      className="providers__expand-icon"
                      onClick={e => this.toggleExpander(e, filterType)}>
                      {this.state.filterTypes[filterType].visibility ? (<Collapse />) : (<Expand />) }
                    </div>
                  }
                </div>
                {this.state.filterTypes[filterType].visibility ?
                  (
                    <React.Fragment>
                      {this.buildFilterCheckboxes(filterType)}
                    </React.Fragment>
                  )
                  : null
                }
              </div>
            ))
          }
          <div className="providers__filters-ctas">
            <Button
              hollow={true}
              className="providers__filters-btn"
              value="Clear All"
              onClick={this.props.resetFilters}
            />
            <Button
              className="providers__filters-btn"
              value="Apply"
              onClick={this.props.applyFilters}
            />
          </div>

        </div>
      </ErrorBoundary>
    );
  }
}


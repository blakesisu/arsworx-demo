import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import ErrorBoundary from 'components/_shared/ErrorBoundary/ErrorBoundary';
import ExampleMap from 'components/_shared/Map/ExampleMap';

// SVGs
// Constants
// Styles
import './Home.css';

// Redux
const mapStateToProps = state => ({
  // requesting: state.api.requesting,
  // user: state.db.user,
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
  render() {
    return (
      <div>
        <ErrorBoundary>
          <p> Sisu map testing! </p>
          <ExampleMap />
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);

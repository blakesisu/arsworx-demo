import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  // isAuthenticated: state.db.user.isAuthenticated
  isAuthenticated: true
});

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default connect(mapStateToProps)(PrivateRoute);

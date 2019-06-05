import React from 'react';
import { connect } from 'react-redux';

const Auth = ({ component: Component, loggedIn, ...rest}) => (
  loggedIn ? (
    null
  ) : (
    <Component {...rest} />
  )
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  loggedIn ? (
    <Component {...rest} />
  ) : (
    null
  )
);

const mapStateToProps = state => (
  { loggedIn: state.session.isAuthenticated }
);

export const AuthComponent = connect(mapStateToProps)(Auth);

export const ProtectedComponent = connect(mapStateToProps)(Protected);
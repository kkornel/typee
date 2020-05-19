import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function AuthenticatedRoute({ auth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth.isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(AuthenticatedRoute);
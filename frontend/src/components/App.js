import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../history';
import Header from './Header';
import Landing from './Landing';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import Login from './auth/Login';
import Register from './auth/Register';
import PasswordReset from './auth/PasswordReset';
import NewPassword from './auth/NewPassword';
import TestAuth from './users/TestAuth';
import Private from './Private';
import Container from './ui/bootstrap/Container';
import Row from './ui/bootstrap/Row';
import { fetchUserProfile } from '../actions/authActions';

function App({ fetchUserProfile }) {
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <Container>
      <Router history={history}>
        <Header />
        <Row>
          <Switch>
            <AuthenticatedRoute path="/private" component={Private} />
            <AuthenticatedRoute exact path="/" component={Landing} />
            <UnauthenticatedRoute exact path="/login" component={Login} />
            <UnauthenticatedRoute exact path="/register" component={Register} />
            <UnauthenticatedRoute
              exact
              path="/password/reset"
              component={PasswordReset}
            />
            <UnauthenticatedRoute
              exact
              path="/password/reset/new"
              component={NewPassword}
            />
            <Route exact path="/testauth" component={TestAuth} />
          </Switch>
        </Row>
      </Router>
    </Container>
  );
}

export default connect(null, { fetchUserProfile })(App);

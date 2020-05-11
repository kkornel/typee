import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Header from './Header';
import PrivateRoute from './auth/PrivateRoute';
import Login from './auth/Login';
import Register from './auth/Register';
import PasswordReset from './auth/PasswordReset';
import NewPassword from './auth/NewPassword';
import TestAuth from './users/TestAuth';
import Private from './Private';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router history={history}>
          <Header />
          <div className="row">
            <Switch>
              <PrivateRoute path="/private" component={Private} />
              <Route exact path="/" component={null} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/password/reset" component={PasswordReset} />
              <Route exact path="/password/reset/new" component={NewPassword} />
              <Route exact path="/testauth" component={TestAuth} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

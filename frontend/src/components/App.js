import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Header from './Header';
import Login from './auth/Login';
import Register from './auth/Register';
import PasswordReset from './auth/PasswordReset';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router history={history}>
          <Header />
          <div className="row">
            <Switch>
              <Route exact path="/" component={null} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/password/reset" component={PasswordReset} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

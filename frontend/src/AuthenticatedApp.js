import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import FourOhFour from './components/404';
import Dashboard from './components/Dashboard';

function AuthenticatedApp() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/channel/*" component={Dashboard} />
      <Redirect to="/dashboard" from="/sign-in" />
      <Redirect to="/dashboard" from="/sign-up" />
      <Route path="/" component={Dashboard} />
      <Route path="*">
        <FourOhFour />
      </Route>
    </Switch>
  );
}

export default AuthenticatedApp;

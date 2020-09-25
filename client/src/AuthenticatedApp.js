import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import FourOhFour from './components/404';
import Dashboard from './components/chat/Dashboard';

function AuthenticatedApp() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Redirect to="/dashboard" from="/sign-in" />
      <Redirect to="/dashboard" from="/sign-up" />
      <Redirect to="/dashboard" from="/" />
      <Route path="*">
        <FourOhFour />
      </Route>
    </Switch>
  );
}

export default AuthenticatedApp;

import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import PasswordReset from './components/Auth/PasswordReset';
import PasswordNew from './components/Auth/PasswordNew';
import Dashboard from './components/Dashboard';

function UnauthenticatedApp() {
  const location = useLocation();

  return (
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/password-reset" component={PasswordReset} />
      <Route path="/password-reset-new" component={PasswordNew} />
      {/* <Route to="/dashboard" component={Dashboard} /> */}
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: location.pathname },
        }}
        from="*"
      />
    </Switch>
  );
}

export default UnauthenticatedApp;

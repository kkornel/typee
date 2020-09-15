import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PasswordReset from './components/auth/PasswordReset';
import PasswordNew from './components/auth/PasswordNew';

export default function UnauthenticatedApp() {
  const location = useLocation();

  return (
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/password-reset" component={PasswordReset} />
      <Route path="/password-reset-new" component={PasswordNew} />
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

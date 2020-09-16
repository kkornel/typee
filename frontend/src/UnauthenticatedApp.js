import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PasswordReset from './components/auth/PasswordReset';
import PasswordNew from './components/auth/PasswordNew';
import { Box } from '@material-ui/core';

export default function UnauthenticatedApp() {
  const location = useLocation();

  return (
    <Box style={{ backgroundColor: '#2f3136', height: '100vh' }}>
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
    </Box>
  );
}

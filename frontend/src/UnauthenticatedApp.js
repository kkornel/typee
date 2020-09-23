import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import About from './components/home/About';
import DevLog from './components/home/DevLog';
import Home from './components/home/Home';
import PasswordNew from './components/auth/PasswordNew';
import PasswordReset from './components/auth/PasswordReset';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

import FourOhFour from './components/404';

export default function UnauthenticatedApp() {
  const location = useLocation();
  const classes = useStyles();

  return (
    <Box className={classes.body}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/about" component={About} />
        <Route path="/dev-log" component={DevLog} />
        <Route path="/password-reset" component={PasswordReset} />
        <Route path="/password-reset-new" component={PasswordNew} />
        {/* <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: location.pathname },
          }}
          from="*"
        /> */}
        <Route path="*">
          <FourOhFour />
        </Route>
      </Switch>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  body: {
    height: 'calc(100vh - 48px)',
    background: theme.palette.backgroundSecondary,
  },
}));

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Container, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    marginBottom: 40,
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  paperNoCenter: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Container maxWidth="xs">
            <Box>
              <h1>Login Page</h1>
              <div>
                <form name="login-form" className={classes.root}>
                  {/* {username input} */}
                  <TextField
                    label="Username"
                    name="username"
                    fullWidth
                    variant="outlined"
                  />

                  {/* {password input} */}
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                    variant="outlined"
                  />

                  <Button variant="contained" color="primary" name="login">
                    Login
                  </Button>
                </form>
              </div>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={12} />
        {/*  Footer */}
        <Grid item xs={2}></Grid>
        <Grid item xs={8} />
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;

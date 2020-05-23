import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';

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
              <Typography variant="h1" component="h2">
                Dashboard
              </Typography>
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

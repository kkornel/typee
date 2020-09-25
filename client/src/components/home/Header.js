import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Container maxWidth="md" className={classes.container}>
          <Link to="/" className={classes.homeLink}>
            <Box className={classes.leftSection}>
              <Typography variant="h6" className={classes.title}>
                typee
              </Typography>
            </Box>
          </Link>

          <Box className={classes.rightSection}>
            <Link to="/sign-in" className={classes.link}>
              Sign In
            </Link>
            <Link to="/sign-up" className={classes.link}>
              Sign Up
            </Link>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            {/* <Link to="/password-reset" className={classes.link}>
              Reset
            </Link>
            <Link to="/password-reset-new" className={classes.link}>
              New
            </Link> */}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'static',
    backgroundColor: theme.palette.appBarBackground,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  rightSection: {
    display: 'flex',
  },
  title: {
    fontFamily: 'Montserrat',
    letterSpacing: '0.1rem',
    fontWeight: 700,
  },
  link: {
    color: theme.palette.headerPrimary,
    padding: '10px 20px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',

    // 1 or 2
    // fontSize: '16px',
    // fontWeight: 600,
    // OR
    fontFamily: 'Montserrat',
    fontSize: '14px',
    fontWeight: 600,

    lineHeight: '140%',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

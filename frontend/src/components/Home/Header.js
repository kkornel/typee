import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function Header() {
  const classes = useStyles();
  const { execute } = useAsync();
  const { user, logout, logoutAll } = useAuth();

  const onLogout = async () => {
    await execute(logout());
  };

  const onLogoutAll = async () => {
    await execute(logoutAll());
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Container maxWidth="md" className={classes.container}>
          {/* <Container maxWidth="sm" className={classes.root}> */}
          <Link to="/" className={classes.homeLink}>
            <Box className={classes.leftSection}>
              <FontAwesomeIcon icon={faMeteor} className={classes.icon} />
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
            {/* <Button component={Link} to="/sign-in" color="inherit">
            Sign In
          </Button>
          <Button component={Link} to="/sign-up" color="inherit">
            Sign Up
          </Button>
          <Button component={Link} to="/password-reset" color="inherit">
            Reset
          </Button>
          <Button component={Link} to="/password-reset-new" color="inherit">
            New
          </Button> */}
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
    // backgroundColor: theme.palette.purpleAlt,
    // backgroundColor: theme.palette.purpleAlt2,
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
  title: {},
  icon: {
    marginRight: '10px',
  },
  link: {
    color: theme.palette.headerPrimary,
    padding: '10px 20px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

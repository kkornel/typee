import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#4527a0',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  aTag: {
    color: 'white',
    textDecoration: 'none',
  },
}));

function Header() {
  const classes = useStyles();
  const { user, logout, logoutAll } = useAuth();
  const { data, error, execute } = useAsync();

  console.log('data', data);
  console.log('error', error);

  const onLogout = async () => {
    await execute(logout());
  };

  const onLogoutAll = async () => {
    await execute(logoutAll());
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        {/* <Link to="/sign-in">
          <Button color="primary">Login</Button>
        </Link> */}
        {user ? (
          <React.Fragment>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
            <Button color="inherit" onClick={onLogoutAll}>
              Logout all
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button component={Link} to="/sign-in" color="inherit">
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
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

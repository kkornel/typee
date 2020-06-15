import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

const useStyles = makeStyles((theme) => ({
  appBar: {
    // position: 'fixed',
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
  root: {
    display: 'flex',
  },
}));

function Header() {
  const classes = useStyles();
  const { execute } = useAsync();
  const { user, logout, logoutAll } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const onLogout = async () => {
    await execute(logout());
  };

  const onLogoutAll = async () => {
    await execute(logoutAll());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

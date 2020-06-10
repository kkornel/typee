import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
  joinRoom,
  createRoom,
  leaveRoom,
  roomDataHandler,
} from '../../utils/useSocket';
import { useUser } from '../../context/UserContext';

const drawerWidth = 240;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  // appBar: {
  //   backgroundColor: '#4527a0',
  // },
  // toolbar: {
  //   flexWrap: 'wrap',
  // },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
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
  appBar: {
    position: 'relative',
    backgroundColor: '#4527a0',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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

  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  const [dialogValue, setDialogValue] = React.useState('');

  const { currentRoom, setCurrentRoom } = useUser();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleAddClick = (event) => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    console.log(currentRoom);
    setOpenDialog(false);
  };

  const handleCreateClick = () => {
    createRoom(user._id, dialogValue, createCallback);
  };
  const leaveCallback = (somedata) => {
    console.log(somedata);
  };

  const handleJoinClick = () => {
    leaveRoom(user._id, currentRoom, leaveCallback);

    joinRoom(user._id, dialogValue, joinCallback);
  };

  const joinCallback = ({ error, room }) => {
    console.log(error, room);
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      return setOpenSnackbar(true);
    }

    setOpenDialog(false);
  };

  const createCallback = ({ error, room }) => {
    console.log(error, room);
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      return setOpenSnackbar(true);
    }

    setSnackbarMessage(`Room ${room.name} created.`);
    setSnackbarSeverity('success');
    setCurrentRoom(room.name);
    setOpenSnackbar(true);
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleRoomClick = (name) => {
    if (name !== currentRoom) {
      leaveRoom(user._id, currentRoom, leaveCallback);
    }
    setCurrentRoom(name);
    joinRoom(user._id, name, joinCallback);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
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
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
          {user &&
            user.rooms.map((text, index) => (
              <ListItem
                key={text}
                onClick={(event) => handleRoomClick(text)}
                component={Link}
                to={'/channel/' + text}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={(event) => handleAddClick(event)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItem>
        </List>
      </Drawer>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Create a new room or join existing one
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a room name:</DialogContentText>
          <TextField
            onChange={(event) => setDialogValue(event.target.value)}
            value={dialogValue}
            autoFocus
            margin="dense"
            id="name"
            label="Room name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleJoinClick} color="primary">
            Join
          </Button>
          <Button onClick={handleCreateClick} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );

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

import React from 'react';

import classNames from 'classnames';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';

import ManageRoomDialog from './ManageRoomDialog';

export default function MessageAreaBar({ text, isAuthor, onLeaveClick }) {
  const classes = useStyles();
  // const theme = mainTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeaveClick = () => {
    onLeaveClick();
    handleClose();
  };

  const handleManageClick = () => {
    console.log('handleManageClick');
    setOpen(true);
    handleClose();
  };

  return (
    <Box className={classes.messagesBar}>
      <Box className={classes.title}>
        <h3 className={classes.header} style={{ color: '#72767d' }}>
          #{' '}
        </h3>
        <h3 className={classes.header}>{text}</h3>
      </Box>
      <Box className={classes.settingsBox}>
        <IconButton color="inherit" onClick={handleClick}>
          <SettingsIcon />
        </IconButton>
        <StyledMenu
          keepMounted
          id="simple-menu"
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <StyledMenuItem onClick={handleLeaveClick}>Leave room</StyledMenuItem>
          {isAuthor && (
            <StyledMenuItem onClick={handleManageClick}>
              Manage room
            </StyledMenuItem>
          )}
        </StyledMenu>
      </Box>
      <ManageRoomDialog open={open} setOpen={setOpen} />
    </Box>
  );
}

const StyledMenu = withStyles((theme) => ({
  paper: {
    border: `1px solid ${theme.palette.menuBorder}`,
    background: theme.palette.backgroundMiddle,
  },
}))((props) => <Menu elevation={0} {...props} />);

// const StyledMenu = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//     background: '#2f3136',
//   },
// })((props) => <Menu elevation={0} {...props} />);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.menuItemBackgroundOnFocus,
    },
    color: '#fff;',
  },
}))(MenuItem);

// const mainTheme = makeStyles((theme) => ({
//   backgroundPrimary: {
//     backgroundColor: '#36393f',
//   },
// }));

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    flex: 1,
    height: '24px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  settingsBox: {
    marginLeft: 'auto',
  },
  messagesBar: {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.messageBarBorderBottom}`,
    height: '48px',
    background: theme.palette.backgroundDark,
  },
  header: { marginTop: '0', marginBottom: '0', display: 'inline' },
}));

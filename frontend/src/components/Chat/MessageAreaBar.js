import React from 'react';

import classNames from 'classnames';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';

export default function MessageAreaBar({ text, isAuthor, onLeaveClick }) {
  const classes = useStyles();
  const theme = mainTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

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
    handleClose();
  };

  return (
    <Box className={classNames(classes.messagesBar, theme.backgroundPrimary)}>
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
    </Box>
  );
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    background: '#2f3136',
  },
})((props) => <Menu elevation={0} {...props} />);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#32353b',
    },
    color: '#fff;',
  },
}))(MenuItem);

const mainTheme = makeStyles((theme) => ({
  backgroundPrimary: {
    backgroundColor: '#36393f',
  },
}));

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
    borderBottom: '1px solid #202225',
    height: '48px',
  },
  header: { marginTop: '0', marginBottom: '0', display: 'inline' },
}));

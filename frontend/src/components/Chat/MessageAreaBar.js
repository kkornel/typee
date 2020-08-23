import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';

import { updateRoom } from '../../utils/room-client';
import ManageRoomDialog from './ManageRoomDialog';

export default function MessageAreaBar({ room, isAuthor, onLeaveClick }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(true);

  const [dialogData, setDialogData] = React.useState({
    open: true,
    error: null,
  });

  const handleDialogClose = () => {
    if (dialogData.open) {
      setDialogData({ open: false });
    }
  };

  const handleSaveClicked = async (newName, file, deleteCurrent) => {
    console.log(newName, deleteCurrent, file);
    if (newName.startsWith('a')) {
      setDialogData({ ...dialogData, error: 'Name taken' });
    } else {
      setDialogData({ ...dialogData, error: null });
    }
    const data = new FormData();
    data.append('newName', newName);
    data.append('file', file);
    data.append('deleteCurrent', JSON.stringify(deleteCurrent));
    try {
      const res = await updateRoom(room.name, data);
      console.log('handleSaveClicked red', res);
    } catch (e) {
      console.log('!!!', e);
      console.log('!!!', e.response.data);
      setDialogData({ ...dialogData, error: e.response.data.message });
    }
  };

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

  const resetError = () => {
    setDialogData({ ...dialogData, error: null });
  };

  return (
    <Box className={classes.messagesBar}>
      <Box className={classes.title}>
        <h3 className={classes.header} style={{ color: '#72767d' }}>
          #{' '}
        </h3>
        <h3 className={classes.header}>{room?.name}</h3>
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
      <ManageRoomDialog
        room={room}
        dialogData={dialogData}
        resetError={resetError}
        handleDialogClose={handleDialogClose}
        handleSaveClicked={handleSaveClicked}
      />
    </Box>
  );
}

const StyledMenu = withStyles((theme) => ({
  paper: {
    border: `1px solid ${theme.palette.backgroundAccent}`,
    background: theme.palette.backgroundSecondary,
  },
}))((props) => <Menu elevation={0} {...props} />);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.itemOnHover,
    },
    color: theme.palette.headerPrimary,
  },
}))(MenuItem);

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
    borderBottom: `1px solid ${theme.palette.border}`,
    height: '48px',
    background: theme.palette.backgroundPrimary,
  },
  header: { marginTop: '0', marginBottom: '0', display: 'inline' },
}));

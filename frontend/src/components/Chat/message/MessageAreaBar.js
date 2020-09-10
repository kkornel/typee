import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';

import ManageRoomDialog from '../../ui/dialogs/ManageRoomDialog';

import { updateRoom } from '../../../utils/room-client';
import {
  useRoomData,
  ACTIONS as ROOM_DATA_ACTIONS,
} from '../../../context/RoomDataContext';

export default function MessageAreaBar({
  room,
  isAuthor,
  onLeaveClick,
  roomUpdated,
  deleteRoom,
}) {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [, roomDataDispatch] = useRoomData();
  const [dialogData, setDialogData] = React.useState({
    open: false,
    error: null,
  });

  const handleSaveClick = async (newName, file, deleteCurrent) => {
    const data = new FormData();

    data.append('newName', newName);
    data.append('file', file);
    data.append('deleteCurrent', JSON.stringify(deleteCurrent));

    try {
      setLoading(true);

      const updatedRoom = await updateRoom(room.name, data);

      setDialogData({ ...dialogData, open: false });

      roomUpdated(room.name, updatedRoom.name);
      roomDataDispatch({
        type: ROOM_DATA_ACTIONS.UPDATE_ROOM,
        payload: updatedRoom,
      });
    } catch (error) {
      console.log('Update Room ERROR', error.response.data);
      setDialogData({ ...dialogData, error: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeaveClick = () => {
    onLeaveClick(room.name);
    handleClose();
  };

  const handleManageClick = () => {
    setDialogData({ ...dialogData, open: true });
    handleClose();
  };

  const handleDialogClose = () => {
    if (dialogData.open) {
      setDialogData({ open: false });
    }
  };

  const handleDeleteRoom = (roomName) => {
    deleteRoom(roomName);
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
        <h3 className={classes.header}>{room.name}</h3>
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
          {isAuthor ? (
            <StyledMenuItem onClick={handleManageClick}>
              Manage room
            </StyledMenuItem>
          ) : (
            <StyledMenuItem onClick={handleLeaveClick}>
              Leave room
            </StyledMenuItem>
          )}
        </StyledMenu>
      </Box>
      <ManageRoomDialog
        room={room}
        loading={loading}
        dialogData={dialogData}
        resetError={resetError}
        handleDialogClose={handleDialogClose}
        handleSaveClick={handleSaveClick}
        handleDeleteRoom={handleDeleteRoom}
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
  messagesBar: {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.border}`,
    height: '48px',
    background: theme.palette.backgroundPrimary,
    flex: '0 0 auto',
    alignItems: 'center',
    width: '100%',
    outline: 0,
    minWidth: 0,
  },
  title: {
    textAlign: 'center',
    flex: 1,
    height: '24px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  header: {
    marginTop: '0',
    marginBottom: '0',
    display: 'inline',
  },
  settingsBox: {
    marginLeft: 'auto',
  },
}));

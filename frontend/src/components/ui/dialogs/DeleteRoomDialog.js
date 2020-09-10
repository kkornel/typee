import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import InteractiveNormalButton from '../buttons/InteractiveNormalButton';
import InteractiveDangerButton from '../buttons/InteractiveDangerButton';

import {
  useRoomData,
  ACTIONS as ROOM_DATA_ACTIONS,
} from '../../../context/RoomDataContext';

export default function DeleteRoomDialog({
  socket,
  dialogData,
  onDialogClose,
  onSuccessfulDelete,
}) {
  const classes = useStyles();

  const [roomDataState, roomDataDispatch] = useRoomData();

  const { roomId, openDelete } = dialogData;
  const room = roomDataState.rooms[roomId];

  const [confirmName, setConfirmName] = React.useState('');
  const [confirmNameError, setConfirmNameError] = React.useState(false);

  const onConfirmNameChange = (event) => {
    setConfirmName(event.target.value);
  };

  const onDeleteClick = () => {
    const correctConfirmation = room.name === confirmName;
    setConfirmNameError(!correctConfirmation);
    if (correctConfirmation) {
      socket.deleteRoom(confirmName, deleteRoomCallback);
    }
  };

  const deleteRoomCallback = ({ error, room }) => {
    if (error) {
      console.log('deleteRoomCallback', error);
    }

    onSuccessfulDelete(room);
    roomDataDispatch({ type: ROOM_DATA_ACTIONS.ROOM_DELETED, payload: room });
    console.log(`The room ${room.name} has been deleted.`);
  };

  const onExit = () => {
    confirmName('');
    confirmNameError(false);
  };

  return (
    <Dialog
      open={openDelete}
      onClose={onDialogClose}
      onExit={onExit}
      maxWidth={'xs'}
      fullWidth={true}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <DialogTitle className={classes.title}>
        Delete room <i>{room.name}</i>
      </DialogTitle>
      <DialogContent>
        <Box>
          <DialogContentText className={classes.content}>
            Are you sure you want delete this room? <br />
          </DialogContentText>
          <TextField
            label="Type room's name to confirm"
            value={confirmName}
            onChange={onConfirmNameChange}
            error={confirmNameError}
            helperText={confirmNameError ? 'Provided name is incorrect' : ''}
            fullWidth
            id="name"
            type="text"
            margin="dense"
            variant="outlined"
            className={classes.deleteInput}
            InputProps={{ classes: { root: classes.paper } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <InteractiveNormalButton onClick={onDialogClose}>
          Cancel
        </InteractiveNormalButton>
        <InteractiveDangerButton onClick={onDeleteClick}>
          Delete Room
        </InteractiveDangerButton>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.backgroundPrimary,
    color: theme.palette.textNormal,
  },
  title: {
    color: theme.palette.red,
  },
  content: {
    color: theme.palette.textNormal,
  },
  deleteInput: {
    '& .MuiFormLabel-root': {
      color: theme.palette.red,
    },
    '& label.Mui-focused': {
      color: theme.palette.red,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.textMuted,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.red,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.red,
      },
    },
  },
}));

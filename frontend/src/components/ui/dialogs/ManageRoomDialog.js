import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import FullPageSpinner from '../../ui/FullPageSpinner';
import HorizontalTextDivider from '../../ui/HorizontalTextDivider';
import InteractiveNormalButton from '../buttons/InteractiveNormalButton';
import InteractiveDangerButton from '../buttons/InteractiveDangerButton';
import ParticipantListItem from './ui/ParticipantListItem';

import {
  useRoomData,
  ACTIONS as ROOM_DATA_ACTIONS,
} from '../../../context/RoomDataContext';
import { useAuth } from '../../../context/AuthContext';
import { updateRoom } from '../../../utils/room-client';

export default function ManageRoomDialog({
  room,
  socket,
  dialogData,
  deleteRoom,
  roomUpdated,
  onDialogClose,
  onSuccessfulUpdate,
}) {
  const classes = useStyles();

  const inputRef = React.useRef(null);

  const [roomDataState, roomDataDispatch] = useRoomData();

  const { open } = dialogData;

  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { user: currentUser } = useAuth();

  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState('');
  const [deleteCurrent, setDeleteCurrent] = React.useState(false);

  const [confirmName, setConfirmName] = React.useState('');
  const [confirmNameError, setConfirmNameError] = React.useState(false);

  const participants = Object.values(room.users).filter(
    (user) => user._id !== currentUser._id
  );

  const handleSave = async () => {
    // TODO: validate
    if (name.length >= 25) {
      return setError('Maximum length is 25');
    }

    const data = new FormData();

    if (!file && !name && !deleteCurrent) {
      return onDialogClose();
    }

    data.append('newName', name);
    data.append('file', file);
    data.append('deleteCurrent', JSON.stringify(deleteCurrent));

    try {
      setLoading(true);
      console.log('dasda', data);
      const updatedRoom = await updateRoom(room.name, data);
      roomDataDispatch({
        type: ROOM_DATA_ACTIONS.UPDATE_ROOM,
        payload: updatedRoom,
      });
      roomUpdated(room.name, updatedRoom.name);
      setLoading(false);
      onSuccessfulUpdate();
    } catch (error) {
      console.log('Edit Room ERROR', error.response.data);
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const resetError = () => {
    setError(null);
  };

  const onTitleChange = (event) => {
    setName(event.target.value);
    resetError();
  };

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
    if (room.avatarUrl) {
      setDeleteCurrent(true);
    }
  };

  const onDeleteSelectedChange = () => {
    setFile(null);
    inputRef.current.value = null;
  };

  const onDeleteCurrentChange = () => {
    setDeleteCurrent(!deleteCurrent);
  };

  const onExit = () => {
    setFile(null);
    setName('');
    setDeleteCurrent(false);
    inputRef.current.value = null;
  };

  const onRemoveClick = (userId) => {
    socket.removeUser(room._id, userId, removeUserCallback);
  };

  const removeUserCallback = ({ room, user }) => {
    console.log('removeUserCallback', room, user);
    roomDataDispatch({ type: ROOM_DATA_ACTIONS.UPDATE_ROOM, payload: room });
  };

  const onConfirmNameChange = (event) => {
    setConfirmName(event.target.value);
  };

  const handleDeleteClick = () => {
    const correctConfirmation = room.name === confirmName;
    setConfirmNameError(!correctConfirmation);
    if (correctConfirmation) {
      deleteRoom(room.name);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onDialogClose}
      onExit={onExit}
      maxWidth={'xs'}
      fullWidth={true}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      {loading && <FullPageSpinner />}
      <DialogTitle>
        Manage room <i>{room.name}</i>
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.content}>
          Change room's name:
        </DialogContentText>
        <TextField
          label="Room's name"
          value={name}
          onChange={onTitleChange}
          placeholder={room.name}
          error={!!error}
          helperText={error}
          fullWidth
          id="name"
          type="text"
          margin="dense"
          variant="outlined"
          className={classes.root}
          InputProps={{ classes: { root: classes.paper } }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <HorizontalTextDivider
          text={'Avatar'}
          style={{ margin: '10px 4px', color: 'white' }}
        />
        <Box>
          <DialogContentText className={classes.content}>
            Change room avatar:
          </DialogContentText>
          {file && (
            <Box>
              <img
                src={URL.createObjectURL(file)}
                className={classes.img}
                alt="Supposed to show very important data"
              />
            </Box>
          )}
          <input
            id="file"
            type="file"
            accept="image/*"
            multiple=""
            onChange={onChangeHandler}
            ref={inputRef}
          />
        </Box>
        {room.avatarUrl && !file && (
          <Box style={{ marginTop: '8px' }}>
            <Box style={{ marginBottom: '4px' }}>Current avatar:</Box>
            <Box>
              <img
                src={room.avatarUrl}
                className={classes.img}
                alt="Supposed to show very important data"
              />
            </Box>
            <FormControlLabel
              className={classes.formControl}
              control={
                <Checkbox
                  checked={deleteCurrent}
                  onChange={onDeleteCurrentChange}
                  classes={{
                    root: classes.deleteCurrentRoot,
                    checked: classes.checked,
                  }}
                />
              }
              label="Delete current avatar"
            />
          </Box>
        )}
        {file && (
          <FormControlLabel
            className={classes.formControl}
            control={
              <Checkbox
                onChange={onDeleteSelectedChange}
                icon={<DeleteForever />}
                classes={{
                  root: classes.deleteSelectedRoot,
                  checked: classes.checked,
                }}
              />
            }
            label="Delete selected avatar"
          />
        )}
        {participants.length > 0 && (
          <React.Fragment>
            <HorizontalTextDivider
              text={'Participants'}
              style={{ margin: '10px 4px', color: 'white' }}
            />
            <Box className={classes.participants}>
              {participants.map((user) => {
                return (
                  <ParticipantListItem
                    key={user._id}
                    user={user}
                    onRemoveClick={onRemoveClick}
                  />
                );
              })}
            </Box>
          </React.Fragment>
        )}
        <HorizontalTextDivider
          text={'DELETE'}
          style={{ margin: '10px 4px', color: '#f04747' }}
        />
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
          <InteractiveDangerButton
            onClick={handleDeleteClick}
            style={{ marginTop: '8px' }}
          >
            Delete room
          </InteractiveDangerButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <InteractiveNormalButton onClick={onDialogClose}>
          Cancel
        </InteractiveNormalButton>
        <InteractiveNormalButton onClick={handleSave}>
          Save
        </InteractiveNormalButton>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: theme.palette.purple,
    },
    '& label.Mui-focused': {
      color: theme.palette.purple,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.textMuted,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.purple,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.purple,
      },
    },
  },
  paper: {
    backgroundColor: theme.palette.backgroundPrimary,
    color: theme.palette.textNormal,
  },
  content: {
    color: theme.palette.textNormal,
  },
  img: {
    width: '150px',
    height: '150px',
  },
  checked: {},
  deleteCurrentRoot: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.purple,
      backgroundColor: theme.palette.interactiveMuted,
    },
    '&$checked': {
      color: theme.palette.purple,
    },
  },
  deleteSelectedRoot: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.red,
      backgroundColor: theme.palette.interactiveMuted,
    },
    '&$checked': {
      color: theme.palette.red,
    },
  },
  formControl: {
    marginTop: '2px',
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

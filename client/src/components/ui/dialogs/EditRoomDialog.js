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

import FullPageSpinner from '../FullPageSpinner';
import HorizontalTextDivider from '../HorizontalTextDivider';
import InteractiveNormalButton from '../buttons/InteractiveNormalButton';
import ParticipantListItem from './ui/ParticipantListItem';

import { useRoomData } from '../../../context/RoomDataContext';
import { UPDATE_ROOM } from '../../../context/actions/roomData';
import { useAuth } from '../../../context/AuthContext';
import { updateRoom } from '../../../utils/room-client';

export default function EditRoomDialog({
  socket,
  dialogData,
  onDialogClose,
  onSuccessfulUpdate,
}) {
  const classes = useStyles();

  const [roomDataState, roomDataDispatch] = useRoomData();

  const { openEdit, roomId } = dialogData;
  const room = roomDataState.rooms[roomId];

  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { user: currentUser } = useAuth();

  const inputRef = React.useRef(null);

  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState('');
  const [deleteAvatar, setDeleteAvatar] = React.useState(false);

  const participants = Object.values(room.users).filter(
    (user) => user._id !== currentUser._id
  );

  const handleSave = async () => {
    if (name.length >= 25) {
      return setError('Maximum length is 25');
    }

    const data = new FormData();

    data.append('newName', name);
    data.append('file', file);
    data.append('deleteAvatar', JSON.stringify(deleteAvatar));

    try {
      setLoading(true);
      const updatedRoom = await updateRoom(room.name, data);
      setLoading(false);
      roomDataDispatch({
        type: UPDATE_ROOM,
        payload: updatedRoom,
      });
      onRoomUpdated(room.name, updatedRoom.name);
      onSuccessfulUpdate();
    } catch (error) {
      setLoading(false);
      console.log('Edit Room ERROR', error.response.data);
      setError(error.response.data.message);
    }
  };

  const onRoomUpdated = (oldName, newName) => {
    socket.roomUpdated(oldName, newName, roomUpdatedCallback);
  };

  const roomUpdatedCallback = ({ error }) => {
    if (error) {
      return console.log('roomUpdatedCallback', error);
    }

    console.log('Room updated successfully.');
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
      setDeleteAvatar(true);
    }
  };

  const onDeleteSelectedChange = () => {
    setFile(null);
    inputRef.current.value = null;
  };

  const onDeleteCurrentChange = () => {
    setDeleteAvatar(!deleteAvatar);
  };

  const onExit = () => {
    setFile(null);
    setName('');
    setDeleteAvatar(false);
    inputRef.current.value = null;
  };

  const onRemoveClick = (userId) => {
    socket.removeUser(room._id, userId, removeUserCallback);
  };

  const removeUserCallback = ({ user, room, room2 }) => {
    console.log(user, room, room2);
    roomDataDispatch({ type: UPDATE_ROOM, payload: room });
  };

  return (
    <Dialog
      open={openEdit}
      onClose={onDialogClose}
      onExit={onExit}
      maxWidth={'xs'}
      fullWidth={true}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      {loading && <FullPageSpinner />}
      <DialogTitle>
        Edit room <i>{room.name}</i>
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
          InputLabelProps={{ shrink: true }}
        />
        <HorizontalTextDivider style={{ margin: '10px 4px', color: 'white' }}>
          Avatar
        </HorizontalTextDivider>
        <Box>
          <DialogContentText className={classes.content}>
            Change room avatar:
          </DialogContentText>
          {file && (
            <Box>
              <img
                src={URL.createObjectURL(file)}
                className={classes.img}
                alt="It is supposed to show very important data, but it doesn't :("
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
                alt="It is supposed to show very important data, but it doesn't :("
              />
            </Box>
            <FormControlLabel
              className={classes.formControl}
              control={
                <Checkbox
                  checked={deleteAvatar}
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
}));

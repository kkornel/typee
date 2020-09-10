import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import HorizontalTextDivider from '../../ui/HorizontalTextDivider';
import FullPageSpinner from '../../ui/FullPageSpinner';

import InteractiveNormalButton from '../buttons/InteractiveNormalButton';
import InteractiveDangerButton from '../buttons/InteractiveDangerButton';

export default function ManageRoomDialog({
  room,
  loading,
  dialogData,
  resetError,
  handleDialogClose,
  handleSaveClick,
  handleDeleteRoom,
}) {
  const classes = useStyles();

  const inputRef = React.useRef(null);

  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState('');
  const [deleteCurrent, setDeleteCurrent] = React.useState(false);

  const [confirmName, setConfirmName] = React.useState('');
  const [confirmNameError, setConfirmNameError] = React.useState(false);

  // const participants = Object.values(room.users).filter(
  //   ({ user }) => user._id !== currentUser._id
  // );

  const handleSave = () => {
    handleSaveClick(name, file, deleteCurrent);
  };

  const onTitleChange = (event) => {
    setName(event.target.value);
    resetError();
  };

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
    if (room.avatarURL) {
      setDeleteCurrent(true);
    }
  };

  const onConfirmNameChange = (event) => {
    setConfirmName(event.target.value);
  };

  const handleDeleteClick = () => {
    const correctConfirmation = room.name === confirmName;
    setConfirmNameError(!correctConfirmation);
    if (correctConfirmation) {
      handleDeleteRoom(room.name);
    }
  };

  const onDeleteSelectedChange = () => {
    setFile(null);
    inputRef.current.value = null;
  };

  const onDeleteCurrentChange = () => {
    setDeleteCurrent(!deleteCurrent);
  };

  const handleClose = () => {
    handleDialogClose();
  };

  const onExit = () => {
    setFile(null);
    setName('');
    setDeleteCurrent(false);
    inputRef.current.value = null;
  };

  return (
    <Dialog
      open={dialogData.open}
      onClose={handleClose}
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
          error={!!dialogData.error}
          helperText={dialogData.error}
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
        {room.avatarURL && !file && (
          <Box style={{ marginTop: '8px' }}>
            <Box style={{ marginBottom: '4px' }}>Current avatar:</Box>
            <Box>
              <img
                src={room.avatarURL}
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
        <InteractiveNormalButton onClick={handleClose}>
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

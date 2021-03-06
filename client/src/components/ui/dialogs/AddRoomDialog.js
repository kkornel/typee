import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import InteractiveNormalButton from '../buttons/InteractiveNormalButton';

export default function AddRoomDialog({
  dialogData,
  handleDialogClose,
  handleJoinRoomClick,
  handleCreateRoomClick,
}) {
  const classes = useStyles();

  const { open, error } = dialogData;
  const [dialogValue, setDialogValue] = React.useState('');

  const onDialogClose = () => {
    handleDialogClose();
  };

  const onJoinRoomClick = () => {
    if (!dialogValue) {
      return;
    }

    handleJoinRoomClick(dialogValue);
  };

  const onCreateRoomClick = () => {
    if (!dialogValue) {
      return;
    }

    handleCreateRoomClick(dialogValue);
  };

  const onExit = () => {
    setDialogValue('');
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      onExit={onExit}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <DialogTitle>Create a new room or join existing one</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.content}>
          Please enter a room name:
        </DialogContentText>
        <TextField
          label="Room name"
          value={dialogValue}
          onChange={(event) => setDialogValue(event.target.value)}
          error={!!error}
          helperText={error}
          autoFocus
          fullWidth
          id="name"
          type="text"
          margin="dense"
          className={classes.root}
          InputProps={{ classes: { root: classes.paper } }}
        />
      </DialogContent>
      <DialogActions>
        <InteractiveNormalButton onClick={onDialogClose}>
          Cancel
        </InteractiveNormalButton>
        <InteractiveNormalButton onClick={onJoinRoomClick}>
          Join
        </InteractiveNormalButton>
        <InteractiveNormalButton onClick={onCreateRoomClick}>
          Create
        </InteractiveNormalButton>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.purple,
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.interactiveNormal,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.palette.purple,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.purple,
    },
  },
  paper: {
    backgroundColor: theme.palette.backgroundPrimary,
    color: theme.palette.textNormal,
  },
  content: {
    color: theme.palette.textNormal,
  },
  interactiveNormalButton: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.interactiveHover,
      backgroundColor: theme.palette.interactiveMuted,
    },
  },
}));

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function ({
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
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: '#36393f',
          color: '#dcddde',
        },
      }}
      onExit={onExit}
    >
      <DialogTitle id="form-dialog-title">
        Create a new room or join existing one
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: '#dcddde' }}>
          Please enter a room name:
        </DialogContentText>
        <TextField
          helperText={error}
          error={!!error}
          onChange={(event) => setDialogValue(event.target.value)}
          value={dialogValue}
          autoFocus
          margin="dense"
          id="name"
          label="Room name"
          type="text"
          fullWidth
          className={classes.root}
          InputProps={{
            style: {
              color: '#dcddde',
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onDialogClose}
          className={classes.interactiveNormalButton}
        >
          Cancel
        </Button>
        <Button
          onClick={onJoinRoomClick}
          className={classes.interactiveNormalButton}
        >
          Join
        </Button>
        <Button
          onClick={onCreateRoomClick}
          className={classes.interactiveNormalButton}
        >
          Create
        </Button>
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
  interactiveNormalButton: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.interactiveHover,
      backgroundColor: theme.palette.interactiveMuted,
    },
  },
}));

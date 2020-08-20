import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import TextDivider from './TextDivider';

export default function ManageRoomDialog({ open, setOpen }) {
  const theme = mainTheme();

  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState('');

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (event) => {
    console.log(event.target.files);
    setFile(event.target.files[0]);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: '#36393f',
          color: '#dcddde',
        },
      }}
    >
      <DialogTitle>Change room's name or update its avatar</DialogTitle>
      <DialogContent>
        {/* <DialogContentText style={{ color: '#dcddde' }}>
          Change room's name or update its avatar
        </DialogContentText> */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Room's name"
          type="text"
          fullWidth
          variant="outlined"
          className={theme.root}
          InputProps={{
            style: {
              color: '#dcddde',
            },
          }}
        />
        {/* <Divider
          variant="fullWidth"
          style={{ background: 'red', marginTop: '10px', marginBottom: '10px' }}
        /> */}
        <TextDivider style={{ marginTop: '8px', marginBottom: '8px' }}>
          Avatar
        </TextDivider>
        {/* <Divider variant="fullWidth" style={{ background: 'red' }} /> */}
        <Box>
          <DialogContentText style={{ color: '#dcddde' }}>
            Change channel image
          </DialogContentText>
          <input
            id="file"
            type="file"
            accept="image/*"
            multiple=""
            onChange={onChangeHandler}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mainTheme = makeStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: '#7289da',
    },
    '& .MuiFormLabel-root': {
      color: '#b9bbbe',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#7289da',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#7289da',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#7289da',
    },
  },
  interactiveNormal: {
    color: '#b9bbbe',
    '&:hover': {
      color: '#dcddde',
    },
  },
  interactiveNormalButton: {
    '&:hover': {
      backgroundColor: '#4f545c',
    },
  },
}));

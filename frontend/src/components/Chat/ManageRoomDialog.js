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
import TextDivider from './TextDivider';
import TextField from '@material-ui/core/TextField';

import FullPageSpinner from '../ui/FullPageSpinner';

export default function ManageRoomDialog({
  room,
  loading,
  dialogData,
  resetError,
  handleDialogClose,
  handleSaveClicked,
}) {
  const classes = useStyles();

  const inputRef = React.useRef(null);

  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState('');
  const [deleteCurrent, setDeleteCurrent] = React.useState(false);

  const handleSave = () => {
    handleSaveClicked(name, file, deleteCurrent);
  };

  const onTitleChange = (event) => {
    setName(event.target.value);
    resetError();
  };

  const handleClose = () => {
    handleDialogClose();
  };

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
    if (room.avatarURL) {
      setDeleteCurrent(true);
    }
  };

  const onExit = () => {
    setFile(null);
    setName('');
    setDeleteCurrent(false);
    inputRef.current.value = null;
  };

  const onDeleteSelectedChange = () => {
    setFile(null);
    inputRef.current.value = null;
  };

  const onDeleteCurrentChange = () => {
    setDeleteCurrent(!deleteCurrent);
  };

  return (
    <Dialog
      open={dialogData.open}
      onClose={handleClose}
      onExit={onExit}
      maxWidth={'xs'}
      fullWidth={true}
      aria-labelledby="form-dialog-name"
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
        <TextDivider style={{ margin: '10px 4px' }}>Avatar</TextDivider>
        <Box>
          <DialogContentText className={classes.content}>
            Change room avatar:
          </DialogContentText>
          {file && (
            <Box>
              <img src={URL.createObjectURL(file)} className={classes.img} />
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
              <img src={room.avatarURL} className={classes.img} />
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          className={classes.interactiveNormalButton}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className={classes.interactiveNormalButton}
        >
          Save
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
    '& input:valid + fieldset': {
      borderColor: theme.palette.purpleAlt,
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.interactiveNormal,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.purple,
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
  interactiveNormalButton: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.interactiveHover,
      backgroundColor: theme.palette.interactiveMuted,
    },
  },
}));

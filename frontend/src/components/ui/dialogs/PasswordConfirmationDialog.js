import React from 'react';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import FullPageSpinner from '../FullPageSpinner';
import OutlinedDangerButton from '../buttons/OutlinedDangerButton';
import InteractiveNormalButton from '../buttons/InteractiveNormalButton';

import { useAsync } from '../../../utils/useAsync';
import { useAuth } from '../../../context/AuthContext';

export default function PasswordConfirmationDialog({ open, onDialogCancel }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, isError, error, execute } = useAsync();
  const { verifyPassword, user, deleteAccount } = useAuth();

  const [password, setPassword] = React.useState('Polska12');

  const onChange = (event) => {
    setPassword(event.target.value);
  };

  const onDeleteClick = async () => {
    const response = await execute(verifyPassword(user._id, password));
    console.log('onDeleteClick response ', response);

    if (response.success) {
      await execute(deleteAccount(user._id));

      enqueueSnackbar(`Account has been deleted`, {
        variant: 'success',
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onDialogCancel}
      maxWidth={'sm'}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      {isLoading && <FullPageSpinner />}
      <DialogTitle className={classes.title}>
        Are you really sure you want to delete your account?
      </DialogTitle>
      <DialogContent className={classes.content}>
        All rooms created by you will be removed. <br />
        <TextField
          label="Type your password in oder to confirm"
          value={password}
          onChange={onChange}
          placeholder="Password"
          error={isError}
          helperText={isError ? error.message : null}
          fullWidth
          id="password"
          type="password"
          margin="dense"
          variant="outlined"
          className={classes.passwordInput}
          InputProps={{ classes: { root: classes.paper } }}
          InputLabelProps={{ shrink: true }}
        />
        This operation cannot be reversed. <br />
      </DialogContent>
      <DialogActions>
        <InteractiveNormalButton onClick={onDialogCancel}>
          Cancel
        </InteractiveNormalButton>
        <OutlinedDangerButton onClick={onDeleteClick}>
          Delete
        </OutlinedDangerButton>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.backgroundSecondary,
    color: theme.palette.textNormal,
  },
  title: {
    color: theme.palette.red,
  },
  content: {
    marginTop: 0,
    paddingTop: 0,
    color: theme.palette.textNormal,
  },
  passwordInput: {
    margin: '25px 0',
    '& .MuiFormLabel-root': {
      color: theme.palette.red,
    },
    '& label.Mui-focused': {
      color: theme.palette.red,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.red,
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

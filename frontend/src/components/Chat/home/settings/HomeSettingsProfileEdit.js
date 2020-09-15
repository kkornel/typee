import React from 'react';
import { useForm } from 'react-hook-form';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import FullPageSpinner from '../../../ui/FullPageSpinner';
import GreenButton from '../../../ui/buttons/GreenButton';
import HomeSectionHeader from '../HomeSectionHeader';
import HorizontalTextDivider from '../../../ui/HorizontalTextDivider';
import InteractiveNormalButton from '../../../ui/buttons/InteractiveNormalButton';
import OutlinedDangerButton from '../../../ui/buttons/OutlinedDangerButton';
import PasswordConfirmationDialog from '../../../ui/dialogs/PasswordConfirmationDialog';

import profileUpdateSchema from '../../../../utils/profileUpdateSchema';

export default function HomeSettingsProfileEdit({
  user,
  socket,
  updateProfile,
  onCancelClick,
  onSuccessfulUpdate,
}) {
  const classes = useStyles();
  const {
    getValues,
    register,
    errors,
    handleSubmit,
    clearError,
    setError,
  } = useForm({
    mode: 'onBlur',
    validationSchema: profileUpdateSchema,
  });

  const [file, setFile] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [deleteAvatar, setDeleteAvatar] = React.useState(false);

  const showRemoveButton = file || (user.avatarUrl && !deleteAvatar);

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async ({ email, username, password, newPassword }) => {
    const data = new FormData();

    data.append('email', email);
    data.append('username', username);
    data.append('password', password);
    data.append('file', file);
    data.append('deleteAvatar', JSON.stringify(deleteAvatar));

    if (newPassword) {
      data.append('newPassword', newPassword);
    }

    try {
      setLoading(true);
      const response = await updateProfile(user._id, data);
      console.log('onSubmit response', response);
      onSuccessfulUpdate();
    } catch (error) {
      const { details, status, message } = error.response.data;
      console.log('onSubmit error', error.response.data);
      setError(details.field, status, message);
    }

    setLoading(false);
  };

  const getAvatar = () => {
    if (file) {
      return URL.createObjectURL(file);
    }
    if (deleteAvatar) {
      // return 'https://www.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png';
      return null;
    }
    return user.avatarUrl;
  };

  return (
    <Box>
      {loading && <FullPageSpinner />}
      <HomeSectionHeader title="Update info" />
      <Box className={classes.profileEdit}>
        <Box className={classes.profileEditImage}>
          <Avatar
            className={classes.profileAvatar}
            src={getAvatar()}
            alt="It is supposed to show very important data, but it doesn't :("
          >
            {user.username[0]}
            {user.username[1]}
          </Avatar>
          {showRemoveButton && (
            <Box
              className={classes.profileEditImageButton}
              onClick={() => {
                setDeleteAvatar(true);
                setFile(null);
              }}
            >
              Remove
            </Box>
          )}
          <Box className={classes.profileEditImageButton}>
            <Box className={classes.customFileInputBox}>
              Change
              <input
                type="file"
                onChange={onChangeHandler}
                className={classes.customFileInput}
              />
            </Box>
          </Box>
        </Box>
        <Box className={classes.profileEditForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <EditProfileTextField
              required
              fullWidth
              size="small"
              margin="normal"
              variant="filled"
              id="email"
              name="email"
              label="Email"
              defaultValue={user.email}
              error={!!errors.email}
              helperText={!!errors.email ? errors.email.message : null}
              inputRef={register}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ shrink: true }}
            />
            <EditProfileTextField
              required
              fullWidth
              size="small"
              margin="normal"
              variant="filled"
              id="username"
              name="username"
              label="Username"
              defaultValue={user.username}
              error={!!errors.username}
              helperText={!!errors.username ? errors.username.message : null}
              inputRef={register}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ shrink: true }}
            />
            <EditProfileTextField
              required
              fullWidth
              size="small"
              margin="normal"
              variant="filled"
              type="password"
              id="password"
              name="password"
              label="Current password"
              defaultValue="Polska12"
              error={!!errors.password}
              helperText={!!errors.password ? errors.password.message : null}
              inputRef={register}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ shrink: true }}
            />
            <HorizontalTextDivider
              text="Set new password?"
              style={{ margin: 0, marginTop: '10px' }}
            />
            <EditProfileTextField
              fullWidth
              size="small"
              margin="normal"
              variant="filled"
              type="password"
              id="newPassword"
              name="newPassword"
              label="Set new password"
              error={!!errors.newPassword}
              helperText={
                !!errors.newPassword ? errors.newPassword.message : null
              }
              inputRef={register}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ shrink: true }}
            />
            <EditProfileTextField
              fullWidth
              size="small"
              margin="normal"
              variant="filled"
              type="password"
              id="newPasswordConfirmation"
              name="newPasswordConfirmation"
              label="Confirm new password"
              error={!!errors.newPasswordConfirmation}
              helperText={
                !!errors.newPasswordConfirmation
                  ? errors.newPasswordConfirmation.message
                  : null
              }
              inputRef={register}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ shrink: true }}
            />
            <Box className={classes.profileEditButtons}>
              <OutlinedDangerButton onClick={() => setOpen(true)}>
                Delete account
              </OutlinedDangerButton>
              <Box>
                <InteractiveNormalButton
                  onClick={() => setOpen(false)}
                  style={{ marginRight: '20px' }}
                >
                  Cancel
                </InteractiveNormalButton>
                <GreenButton type="submit">Save</GreenButton>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
      <PasswordConfirmationDialog
        open={open}
        socket={socket}
        onDialogCancel={() => setOpen(false)}
      />
    </Box>
  );
}

const EditProfileTextField = withStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: theme.palette.interactiveNormal,
    },
    '& label.Mui-focused': {
      color: theme.palette.purple,
    },
    '& .MuiInput-underline': {
      // borderBottomColor: theme.palette.purple,
    },
    '& .MuiFilledInput-underline:before': {
      // borderBottomColor: theme.palette.purple,
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: theme.palette.purple,
    },
    '& .MuiFilledInput-root': {
      background: theme.palette.textInputBackground,
      borderTop: `1px solid ${theme.palette.textInputBorder}`,
      borderLeft: `1px solid ${theme.palette.textInputBorder}`,
      borderRight: `1px solid ${theme.palette.textInputBorder}`,
    },
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  profileEdit: {
    display: 'flex',
    flex: '1 1 auto',
    padding: '16px',
    borderRadius: '5px',
    background: theme.palette.editableCardBackground,
    border: `1px solid ${theme.palette.backgroundTertiary}`,
  },
  profileAvatar: {
    width: '100px',
    height: '100px',
    fontSize: '42px',
  },
  profileEditImage: {
    marginRight: '16px',
    textAlign: 'center',
  },
  profileEditImageButton: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'Roboto',
    cursor: 'pointer',
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.textMuted,
      textDecoration: 'underline',
    },
  },
  customFileInputBox: {
    overflow: 'hidden',
    position: 'relative',
    display: 'inline-block',
    height: '17px',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.textMuted,
      textDecoration: 'underline',
    },
  },
  customFileInput: {
    cursor: 'pointer',
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '50px',
    zIndex: 999,
  },
  profileEditForm: {},
  input: {
    color: theme.palette.textNormal,
  },
  profileEditButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '4px',
  },

  // submit: {
  //   color: theme.palette.textNormal,
  //   background: theme.palette.purple,
  // },
}));

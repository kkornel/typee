import React from 'react';
import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DarkTextFieldStyled from '../ui/forms/DarkTextFieldStyled';
import PurpleButton from '../ui/buttons/PurpleButton';

import passwordNewSchema from '../../utils/schemas/passwordNewSchema';

export default function PasswordResetForm({ onNewPassword, isError, error }) {
  const classes = useStyles();

  const { register, errors, handleSubmit, clearError, setError } = useForm({
    mode: 'onBlur',
    validationSchema: passwordNewSchema,
  });

  const showError = React.useCallback(() => {
    if (isError) {
      setError('password', error.status, error.message);
    }
  }, [error, setError, isError]);

  React.useEffect(() => {
    showError();
  }, [isError, showError]);

  const onSubmit = ({ password }) => {
    onNewPassword(password);
  };

  const hideError = () => {
    if (isError) {
      clearError('password');
    }
  };

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" className={classes.title}>
        Change Your Password
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <DarkTextFieldStyled
          required
          type="password"
          id="password"
          name="password"
          label="New password"
          onFocus={hideError}
          error={!!errors.password}
          helperText={!!errors.password ? errors.password.message : null}
          inputRef={register}
        />
        <DarkTextFieldStyled
          required
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Confirm password"
          error={!!errors.passwordConfirmation}
          helperText={
            !!errors.passwordConfirmation
              ? errors.passwordConfirmation.message
              : null
          }
          inputRef={register}
        />
        <Box className={classes.formButtons}>
          <PurpleButton type="submit" fullWidth>
            Change password
          </PurpleButton>
        </Box>
      </form>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontWeight: 600,
    color: theme.palette.headerPrimary,
  },
  form: {
    marginTop: '8px',
  },
  formButtons: {
    marginTop: '8px',
  },
}));

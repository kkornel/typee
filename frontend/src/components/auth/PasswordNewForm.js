import React from 'react';
import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import DarkTextFieldStyled from '../ui/forms/DarkTextFieldStyled';
import FullPageSpinner from '../ui/FullPageSpinner';
import PurpleButton from '../ui/buttons/PurpleButton';

import passwordNewSchema from '../../utils/schemas/passwordNewSchema';

export default function PasswordResetForm({
  onNewPassword,
  isLoading,
  isError,
  error,
}) {
  const classes = useStyles();

  const { register, errors, handleSubmit, clearError, setError } = useForm({
    mode: 'onBlur',
    validationSchema: passwordNewSchema,
  });

  React.useEffect(() => {
    showError();
  }, [isError]);

  const onSubmit = ({ password }) => {
    onNewPassword(password);
  };

  const hideError = () => {
    if (isError) {
      clearError('password');
    }
  };

  const showError = () => {
    if (isError) {
      setError('password', error.status, error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      {isLoading && <FullPageSpinner />}
      <Box className={classes.mainBox}>
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
            // defaultValue="Polska12"
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
            // defaultValue="Polska12"
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
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '16px',
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '16px',
    padding: '24px 16px 24px 16px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px 0 #000',
    color: theme.palette.textMuted,
    background: theme.palette.backgroundPrimary,
  },
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

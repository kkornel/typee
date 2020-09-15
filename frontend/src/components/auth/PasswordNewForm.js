import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Box,
  Container,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import passwordNewSchema from '../../utils/schemas/passwordNewSchema';

export default function PasswordResetForm({
  onNewPassword,
  isLoading,
  isError,
  error,
}) {
  const classes = useStyles();

  const [wasErrorShowed, setWasErrorShowed] = React.useState(false);

  const { register, errors, handleSubmit, clearError, setError } = useForm({
    mode: 'onBlur',
    validationSchema: passwordNewSchema,
  });

  const onSubmit = ({ password }) => {
    onNewPassword(password, setWasErrorShowed);
  };

  const resetErrorsOnFocus = () => {
    setWasErrorShowed(true);
    if (isError) {
      clearError('password');
    }
  };

  if (isError && !wasErrorShowed) {
    setError('password', error.status, error.message);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        border={1}
        borderRadius={12}
        borderColor="grey.500"
        className={classes.mainBox}
      >
        <Typography component="h1" variant="h5" className={classes.title}>
          Set New Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            fullWidth
            type="password"
            margin="normal"
            variant="outlined"
            id="password"
            name="password"
            label="Password"
            defaultValue="Polska12"
            onFocus={resetErrorsOnFocus}
            error={!!errors.password}
            helperText={!!errors.password ? errors.password.message : null}
            inputRef={register}
          />
          <TextField
            required
            fullWidth
            type="password"
            margin="normal"
            variant="outlined"
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirm Password"
            defaultValue="Polska12"
            error={!!errors.passwordConfirmation}
            helperText={
              !!errors.passwordConfirmation
                ? errors.passwordConfirmation.message
                : null
            }
            inputRef={register}
          />
          {isLoading && (
            <Box className={classes.spinner}>
              <CircularProgress />
            </Box>
          )}
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submit}
          >
            Set New Password
          </Button>
        </form>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  mainBox: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 2, 3, 2),
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 700,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(2),
    textTransform: 'none',
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  recaptchaError: {
    color: theme.palette.recaptchaError,
    textAlign: 'center',
    fontSize: '12px',
  },
}));

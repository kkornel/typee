import React from 'react';
import { useForm } from 'react-hook-form';

import ReCAPTCHA from 'react-google-recaptcha';

import {
  Button,
  Box,
  Container,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PasswordResetSchema from '../../utils/PasswordResetSchema';

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

function PasswordResetForm({ onPasswordReset, isLoading, isError, error }) {
  const classes = useStyles();
  const recaptchaRef = React.useRef();
  const recaptchaErrorRef = React.useRef();

  const [wasErrorShowed, setWasErrorShowed] = React.useState(false);

  const { register, errors, handleSubmit, clearError, setError } = useForm({
    mode: 'onBlur',
    validationSchema: PasswordResetSchema,
  });

  const onSubmit = ({ email, username, password }) => {
    const recaptchaValue = recaptchaRef.current.getValue();

    if (!recaptchaValue) {
      recaptchaErrorRef.current.hidden = false;
      return;
    }

    onPasswordReset(email, setWasErrorShowed);
  };

  const onChange = () => {
    recaptchaErrorRef.current.hidden = true;
  };

  const resetErrorsOnFocus = () => {
    setWasErrorShowed(true);
    if (isError) {
      clearError(error.details.field);
    }
  };

  if (isError && !wasErrorShowed) {
    setError(error.details.field, error.status, error.message);
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
          Forgot Password?
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            variant="outlined"
            id="email"
            name="email"
            label="Email"
            defaultValue="kornelcodes@gmail.com"
            onFocus={resetErrorsOnFocus}
            error={!!errors.email}
            helperText={!!errors.email ? errors.email.message : null}
            inputRef={register}
          />
          <Box display="flex" justifyContent="center">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={onChange}
              ref={recaptchaRef}
            />
          </Box>
          <Box
            ref={recaptchaErrorRef}
            hidden
            className={classes.recaptchaError}
          >
            Fill ReCAPTCHA
          </Box>
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
            Request Password Reset
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default PasswordResetForm;

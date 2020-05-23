import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import classNames from 'classnames';

import {
  Button,
  Box,
  Container,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SignInSchema from '../../utils/SignInSchema';

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
  passwordInput: {
    marginBottom: '2px',
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
  or: {
    margin: theme.spacing(2, 0, 2),
    color: '#616161',
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  signUp: {
    color: '#424242',
    fontSize: '14px',
    marginTop: '4px',
  },
  signUpLink: {
    // color: '#9c27b0',
    color: '#3f50b5',
    fontWeight: 700,
    marginLeft: '4px',
  },
  forgotLink: {
    color: '#757575',
    fontStyle: 'italic',
    fontSize: '12px',
  },
  resendLink: {
    color: '#3f50b5',
    fontStyle: 'italic',
    fontSize: '12px',
    fontWeight: 600,
  },
  divider: {
    backgroundColor: '#9e9e9e',
  },
}));

const GoogleButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#DB4437'),
    textTransform: 'none',
    backgroundColor: '#DB4437',
    '&:hover': {
      backgroundColor: '#c42d1f',
    },
  },
}))(Button);

function SignInForm({
  onSignIn,
  isLoading,
  isError,
  error,
  onResendEmailClicked,
}) {
  const classes = useStyles();
  const resendRef = React.useRef();

  // It was necessary to control, somehow, if the SERVER error was showed,
  // because the 'error' object and 'isError' are present until re-submission.
  // So even if, user changed input the error was displayed, because it last
  // since previous request. The state is set to show error, after making another request.
  const [wasErrorShowed, setWasErrorShowed] = React.useState(false);

  const {
    register,
    errors,
    handleSubmit,
    clearError,
    setError,
    getValues,
  } = useForm({
    mode: 'onBlur',
    validationSchema: SignInSchema,
  });

  const onSubmit = (formValues) => {
    onSignIn(formValues, setWasErrorShowed);
  };

  const onResendClicked = async () => {
    const { email } = getValues();
    onResendEmailClicked(email);
    resendRef.current.hidden = true;
    setWasErrorShowed(true);
  };

  const resetErrorsOnFocus = () => {
    if (!wasErrorShowed) {
      setWasErrorShowed(true);
    }
    if (isError) {
      clearError(['email', 'password']);
      resendRef.current.hidden = true;
    }
  };

  if (isError && !wasErrorShowed) {
    setError('email', error.status, error.message);
    if (error.status === 'NOT_VERIFIED') {
      resendRef.current.hidden = false;
    } else {
      setError('password', error.status, null);
    }
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
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
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
          <Box textAlign="right" ref={resendRef} hidden>
            <Box
              component="span"
              onClick={onResendClicked}
              className={classNames(classes.link, classes.resendLink)}
            >
              Resend verification email?
            </Box>
          </Box>
          <TextField
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
            className={classes.passwordInput}
          />
          <Box textAlign="right">
            <Link
              to="/password-reset"
              className={classNames(classes.link, classes.forgotLink)}
            >
              Forgot Password?
            </Link>
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
            Sign In
          </Button>
        </form>
        <Typography align="center" className={classes.or}>
          OR
        </Typography>
        <GoogleButton
          fullWidth
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faGoogle} />}
        >
          Continue with Google
        </GoogleButton>
        <Box mt={2}>
          <Divider className={classes.divider} />
          <Box
            display="flex"
            justifyContent="center"
            className={classes.signUp}
          >
            Don't have an account?
            <Link
              to="/sign-up"
              className={classNames(classes.link, classes.signUpLink)}
            >
              Create One
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignInForm;

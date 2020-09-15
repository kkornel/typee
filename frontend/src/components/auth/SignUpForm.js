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
import { makeStyles } from '@material-ui/core/styles';

import SignUpSchema from '../../utils/SignUpSchema';

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
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  signIn: {
    color: theme.palette.signUpText,
    fontSize: '14px',
    marginTop: '4px',
  },
  signInLink: {
    // color: '#9c27b0',
    color: theme.palette.signUpLink,
    fontWeight: 700,
    marginLeft: '4px',
  },
  divider: {
    backgroundColor: theme.palette.signInDivider,
  },
  forgotLink: {
    color: theme.palette.signInResendLink,
    fontStyle: 'italic',
    fontSize: '12px',
    fontWeight: 600,
  },
}));

function SignUpForm({ onSignUp, isLoading, isError, error }) {
  const classes = useStyles();
  const forgotLinkRef = React.useRef();

  const [wasErrorShowed, setWasErrorShowed] = React.useState(false);

  const { register, errors, handleSubmit, clearError, setError } = useForm({
    mode: 'onBlur',
    validationSchema: SignUpSchema,
  });

  const onSubmit = ({ email, username, password }) => {
    onSignUp({ email, username, password }, setWasErrorShowed);
  };

  const resetErrorsOnFocus = () => {
    if (!wasErrorShowed) {
      setWasErrorShowed(true);
    }
    if (isError) {
      clearError(error.details.field);
      forgotLinkRef.current.hidden = true;
    }
  };

  if (isError && !wasErrorShowed) {
    setError(error.details.field, error.status, error.message);
    if (error.details.field === 'email') {
      forgotLinkRef.current.hidden = false;
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
          Sign Up
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
            defaultValue="pawel@gmail.com"
            onFocus={resetErrorsOnFocus}
            error={!!errors.email}
            helperText={!!errors.email ? errors.email.message : null}
            inputRef={register}
          />
          <Box textAlign="right" ref={forgotLinkRef} hidden>
            <Link
              to="/password-reset"
              className={classNames(classes.link, classes.forgotLink)}
            >
              Forgot Password?
            </Link>
          </Box>
          <TextField
            required
            fullWidth
            margin="normal"
            variant="outlined"
            id="username"
            name="username"
            label="Username"
            defaultValue="kornel"
            onFocus={resetErrorsOnFocus}
            error={!!errors.username}
            helperText={!!errors.username ? errors.username.message : null}
            inputRef={register}
          />
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
            Sign Up
          </Button>
          <Box mt={2}>
            <Divider className={classes.divider} />
            <Box
              display="flex"
              justifyContent="center"
              className={classes.signIn}
            >
              Already have an account?
              <Link
                to="/sign-in"
                className={classNames(classes.link, classes.signInLink)}
              >
                Sign In
              </Link>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default SignUpForm;

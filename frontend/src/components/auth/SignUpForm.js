import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DarkTextFieldStyled from '../ui/forms/DarkTextFieldStyled';
import HorizontalLineDivider from '../ui/HorizontalLineDivider';
import PurpleButton from '../ui/buttons/PurpleButton';

import signUpSchema from '../../utils/schemas/signUpSchema';

export default function SignUpForm({ onSignUp, isError, error }) {
  const classes = useStyles();

  const { register, errors, handleSubmit, clearError, setError } = useForm({
    mode: 'onBlur',
    validationSchema: signUpSchema,
  });

  const forgotLinkRef = React.useRef();

  // If there will be some problem with showError
  // remove useCallback from showError and remove showError from dependency array
  const showError = React.useCallback(() => {
    if (isError) {
      setError(error.details.field, error.status, error.message);
      if (error.details.field === 'email') {
        forgotLinkRef.current.hidden = false;
      }
    }
  }, [error, isError, setError, forgotLinkRef]);

  React.useEffect(() => {
    showError();
  }, [isError, showError]);

  const onSubmit = ({ email, username, password }) => {
    onSignUp({ email, username, password });
  };

  const hideError = () => {
    if (isError) {
      clearError(error.details.field);
      forgotLinkRef.current.hidden = true;
    }
  };

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" className={classes.title}>
        Create an account
      </Typography>
      <Typography variant="subtitle2" gutterBottom className={classes.subTitle}>
        Start your journey right now
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <DarkTextFieldStyled
          autoFocus
          required
          id="email"
          name="email"
          label="Email"
          defaultValue="pawel@gmail.com"
          onFocus={hideError}
          error={!!errors.email}
          helperText={!!errors.email ? errors.email.message : null}
          inputRef={register}
        />
        <Box className={classes.textAlignRight} ref={forgotLinkRef} hidden>
          <Link
            to="/password-reset"
            className={classNames(classes.link, classes.forgotLink)}
          >
            Forgot your password?
          </Link>
        </Box>
        <DarkTextFieldStyled
          required
          id="username"
          name="username"
          label="Username"
          defaultValue="kornel"
          onFocus={hideError}
          error={!!errors.username}
          helperText={!!errors.username ? errors.username.message : null}
          inputRef={register}
        />
        <DarkTextFieldStyled
          required
          type="password"
          id="password"
          name="password"
          label="Password"
          defaultValue="Polska12"
          error={!!errors.password}
          helperText={!!errors.password ? errors.password.message : null}
          inputRef={register}
        />
        <DarkTextFieldStyled
          required
          type="password"
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
        <Box className={classes.formButtons}>
          <PurpleButton type="submit" fullWidth>
            Sign Up
          </PurpleButton>
        </Box>
        <Box className={classes.footerBox}>
          <HorizontalLineDivider />
          <Box className={classes.signIn}>
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
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontWeight: 600,
    color: theme.palette.headerPrimary,
  },
  subTitle: {
    marginTop: '8px',
    textAlign: 'center',
    color: theme.palette.headerSecondary,
  },
  form: {
    marginTop: '8px',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  link: {
    color: theme.palette.purple,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  forgotLink: {
    fontStyle: 'italic',
    fontSize: '12px',
    fontWeight: 600,
  },
  formButtons: {
    marginTop: '8px',
  },
  footerBox: {
    marginTop: '8px',
  },
  signIn: {
    fontSize: '14px',
    marginTop: '4px',
    display: 'flex',
    justifyContent: 'center',
  },
  signInLink: {
    fontWeight: 700,
    marginLeft: '4px',
  },
}));

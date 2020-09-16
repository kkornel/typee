import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DarkTextFieldStyled from '../ui/forms/DarkTextFieldStyled';
import FullPageSpinner from '../ui/FullPageSpinner';
import GoogleButton from '../ui/buttons/GoogleButton';
import HorizontalTextDivider from '../ui/HorizontalTextDivider';
import HorizontalLineDivider from '../ui/HorizontalLineDivider';
import PurpleButton from '../ui/buttons/PurpleButton';

import signInSchema from '../../utils/schemas/signInSchema';

export default function SignInForm({
  onSignIn,
  isLoading,
  isError,
  error,
  onResendEmailClicked,
}) {
  const classes = useStyles();
  const resendRef = React.useRef();

  const {
    register,
    errors,
    handleSubmit,
    clearError,
    setError,
    getValues,
  } = useForm({
    mode: 'onBlur',
    validationSchema: signInSchema,
  });

  React.useEffect(() => {
    showError();
  }, [isError]);

  const onSubmit = (formValues) => {
    onSignIn(formValues);
  };

  const onResendClicked = async () => {
    const { email } = getValues();
    onResendEmailClicked(email);
    resendRef.current.hidden = true;
  };

  const resetErrorsOnFocus = () => {
    if (isError) {
      clearError(['email', 'password']);
      resendRef.current.hidden = true;
    }
  };

  const showError = () => {
    if (isError) {
      setError('email', error.status, error.message);
      if (error.status === 'NOT_VERIFIED') {
        resendRef.current.hidden = false;
      } else {
        setError('password', error.status, null);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && <FullPageSpinner />}
      <Box className={classes.mainBox}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Welcome back!
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.subTitle}
        >
          Good to see you again!
        </Typography>
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DarkTextFieldStyled
            autoFocus
            id="email"
            name="email"
            label="Email"
            // defaultValue="pawel1@gmail.com"
            defaultValue="kornelcodess@gmail.com"
            onFocus={resetErrorsOnFocus}
            error={!!errors.email}
            helperText={!!errors.email ? errors.email.message : null}
            inputRef={register}
          />
          <Box className={classes.textAlignRight} ref={resendRef} hidden>
            <Box
              component="span"
              onClick={onResendClicked}
              className={classNames(classes.link, classes.forgotResendLink)}
            >
              Resend verification email?
            </Box>
          </Box>
          <DarkTextFieldStyled
            type="password"
            id="password"
            name="password"
            label="Password"
            defaultValue="Polska12"
            onFocus={resetErrorsOnFocus}
            error={!!errors.password}
            helperText={!!errors.password ? errors.password.message : null}
            inputRef={register}
          />
          <Box className={classes.textAlignRight}>
            <Link
              to="/password-reset"
              className={classNames(classes.link, classes.forgotResendLink)}
            >
              Forgot your password?
            </Link>
          </Box>
          <Box className={classes.formButtons}>
            <PurpleButton type="submit" fullWidth>
              Sign In
            </PurpleButton>
            <HorizontalTextDivider style={{ marginLeft: 0, marginRight: 0 }}>
              OR
            </HorizontalTextDivider>
            <a href="/api/v1/auth/google">
              <GoogleButton
                fullWidth
                variant="contained"
                startIcon={<FontAwesomeIcon icon={faGoogle} />}
                style={{ marginTop: '16px' }}
              >
                Continue with Google
              </GoogleButton>
            </a>
          </Box>
        </form>
        <Box className={classes.footerBox}>
          <HorizontalLineDivider />
          <Box className={classes.signUp}>
            Need an account?
            <Link
              to="/sign-up"
              className={classNames(classes.link, classes.signUpLink)}
            >
              Create one
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
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
      cursor: 'pointer',
    },
  },
  forgotResendLink: {
    fontSize: '12px',
    fontWeight: 600,
    fontStyle: 'italic',
  },
  formButtons: {
    marginTop: '16px',
  },
  footerBox: {
    marginTop: '16px',
  },
  signUp: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '14px',
    marginTop: '4px',
  },
  signUpLink: {
    fontWeight: 700,
    marginLeft: '4px',
  },
}));

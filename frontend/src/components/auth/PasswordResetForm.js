import React from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DarkTextFieldStyled from '../ui/forms/DarkTextFieldStyled';
import PurpleButton from '../ui/buttons/PurpleButton';

import passwordResetSchema from '../../utils/schemas/passwordResetSchema';

export default function PasswordResetForm({ onPasswordReset, isError, error }) {
  const classes = useStyles();

  const { register, errors, handleSubmit, clearError, setError } = useForm({
    mode: 'onBlur',
    validationSchema: passwordResetSchema,
  });

  const recaptchaRef = React.useRef();
  const recaptchaErrorRef = React.useRef();

  // React.useEffect(() => {
  //   showError();
  // }, [isError]);

  const showError = React.useCallback(() => {
    if (isError) {
      setError(error.details.field, error.status, error.message);
    }
  }, [error, isError, setError]);

  React.useEffect(() => {
    showError();
  }, [isError, showError]);

  const onSubmit = ({ email, username, password }) => {
    const recaptchaValue = recaptchaRef.current.getValue();

    if (!recaptchaValue) {
      recaptchaErrorRef.current.hidden = false;
      return;
    }

    onPasswordReset(email);
  };

  const onChange = () => {
    recaptchaErrorRef.current.hidden = true;
  };

  const hideError = () => {
    if (isError) {
      clearError(error.details.field);
    }
  };

  // const showError = () => {
  //   if (isError) {
  //     setError(error.details.field, error.status, error.message);
  //   }
  // };

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" className={classes.title}>
        Forgot your password?
      </Typography>
      <Typography variant="subtitle2" gutterBottom className={classes.subTitle}>
        Don't worry, it happens to everyone!
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DarkTextFieldStyled
          autoFocus
          required
          id="email"
          name="email"
          label="Email"
          defaultValue="kornelcodes@gmail.com"
          onFocus={hideError}
          error={!!errors.email}
          helperText={!!errors.email ? errors.email.message : null}
          inputRef={register}
        />
        <Box className={classes.recaptchaBox}>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onChange}
            ref={recaptchaRef}
            theme="dark"
          />
        </Box>
        <Box ref={recaptchaErrorRef} className={classes.recaptchaError} hidden>
          Fill ReCAPTCHA
        </Box>
        <Box className={classes.buttonBox}>
          <PurpleButton type="submit" fullWidth>
            Request Password Reset
          </PurpleButton>
        </Box>
      </form>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    color: theme.palette.headerPrimary,
  },
  subTitle: {
    marginTop: '8px',
    color: theme.palette.headerSecondary,
  },
  recaptchaBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  recaptchaError: {
    color: theme.palette.recaptchaError,
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 700,
    marginTop: '4px',
  },
  buttonBox: {
    marginTop: '16px',
  },
}));

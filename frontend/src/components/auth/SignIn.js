import React from 'react';

import { Collapse, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';

import SignInForm from './SignInForm';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

function SignIn(props) {
  let isMounted = false;
  const { state } = props.location;

  const { signIn, resendVerificationEmail } = useAuth();
  const [open, setOpen] = React.useState(state && !!state.message);
  const [alertMessage, setAlertMessage] = React.useState(
    state && state.message ? state.message : ''
  );

  const { isLoading, isError, error, execute } = useAsync();

  React.useEffect(() => {
    isMounted = true;
    setTimeout(() => (isMounted ? setOpen(false) : null), 7000);
    return () => (isMounted = false);
  }, [open]);

  const onSignIn = async (formValues, setWasErrorShowed) => {
    await execute(signIn(formValues));

    if (isMounted) {
      setWasErrorShowed(false);
    }
  };

  const onResendEmailClicked = async (email) => {
    const response = await resendVerificationEmail(email);
    setAlertMessage(response.message);
    setOpen(true);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Collapse in={open}>
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          variant="filled"
          severity="success"
          style={{ marginTop: '12px' }}
        >
          {alertMessage}
        </Alert>
      </Collapse>
      <SignInForm
        onSignIn={onSignIn}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onResendEmailClicked={onResendEmailClicked}
      />
    </Container>
  );
}

export default SignIn;

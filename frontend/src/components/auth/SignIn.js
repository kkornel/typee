import React from 'react';

import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';

import SignInForm from './SignInForm';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function SignIn(props) {
  let isMounted = false;
  const { state } = props.location;

  const { signIn, resendVerificationEmail } = useAuth();
  const { isLoading, isError, error, execute } = useAsync();

  const [open, setOpen] = React.useState(state && !!state.message);
  const [alertMessage, setAlertMessage] = React.useState(
    state && state.message ? state.message : ''
  );

  React.useEffect(() => {
    isMounted = true;
    setTimeout(() => (isMounted ? setOpen(false) : null), 7000);
    return () => (isMounted = false);
  }, [open]);

  const onSignIn = async (formValues) => {
    await execute(signIn(formValues));
  };

  const onResendEmailClicked = async (email) => {
    const response = await execute(resendVerificationEmail(email));
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

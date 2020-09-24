import React from 'react';

import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';

import BodyContainer from '../home/BodyContainer';
import FullPageSpinner from '../ui/FullPageSpinner';
import SignInForm from './SignInForm';

import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function SignIn(props) {
  const { state } = props.location;

  const { signIn, resendVerificationEmail } = useAuth();
  const { isLoading, isError, error, execute } = useAsync();

  const [open, setOpen] = React.useState(state && !!state.message);
  const [alertMessage, setAlertMessage] = React.useState(
    state && state.message ? state.message : ''
  );

  React.useEffect(() => {
    document.title = 'Sign in | typee';
    setTimeout(() => setOpen(false), 7000);
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
      {open && (
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
      )}
      <BodyContainer>
        {isLoading && <FullPageSpinner />}
        <SignInForm
          onSignIn={onSignIn}
          isError={isError}
          error={error}
          onResendEmailClicked={onResendEmailClicked}
        />
      </BodyContainer>
    </Container>
  );
}

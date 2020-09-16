import React from 'react';
import { useHistory } from 'react-router-dom';

import BodyContainer from '../home/BodyContainer';
import FullPageSpinner from '../ui/FullPageSpinner';
import SignUpForm from './SignUpForm';

import ROUTES from '../../utils/consts/routes';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function SignUp() {
  const history = useHistory();
  const { signUp } = useAuth();
  const { isLoading, isError, error, execute } = useAsync();

  const onSignUp = async (formValues) => {
    const response = await execute(signUp(formValues));

    // Can't do this in 'if (isSuccess) {}', because it would be executed
    // before setWasErrorShowed(false) which would cause error:
    // Can't perform a React state update on an unmounted component.
    if (response.success) {
      history.push(ROUTES.SIGN_IN, {
        message: response.message,
      });
    }
  };

  return (
    <BodyContainer>
      {isLoading && <FullPageSpinner />}
      <SignUpForm onSignUp={onSignUp} isError={isError} error={error} />
    </BodyContainer>
  );
}

import React from 'react';
import { useHistory } from 'react-router-dom';

import ROUTES from '../../utils/consts/routes';
import SignUpForm from './SignUpForm';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

function SignUp() {
  const history = useHistory();
  const { signUp } = useAuth();
  const { isLoading, isError, error, execute } = useAsync();

  const onSignUp = async (formValues, setWasErrorShowed) => {
    const response = await execute(signUp(formValues));
    setWasErrorShowed(false);

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
    <div>
      <SignUpForm
        onSignUp={onSignUp}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}

export default SignUp;

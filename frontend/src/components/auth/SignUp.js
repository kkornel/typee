import React from 'react';
import { useHistory } from 'react-router-dom';

import BodyContainer from '../home/BodyContainer';
import FullPageSpinner from '../ui/FullPageSpinner';
import SignUpForm from './SignUpForm';

import { SIGN_IN } from '../../utils/consts/routes';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function SignUp() {
  const history = useHistory();
  const { signUp } = useAuth();
  const { isLoading, isError, error, execute } = useAsync();

  React.useEffect(() => {
    document.title = 'Sign up | typee';
  }, []);

  const onSignUp = async (formValues) => {
    const response = await execute(signUp(formValues));

    if (response.success) {
      history.push(SIGN_IN, {
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

import React from 'react';
import { useHistory } from 'react-router-dom';

import BodyContainer from '../home/BodyContainer';
import FullPageSpinner from '../ui/FullPageSpinner';
import PasswordResetForm from './PasswordResetForm';

import { SIGN_IN } from '../../utils/consts/routes';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function PasswordReset() {
  const history = useHistory();
  const { resetPassword } = useAuth();
  const { isLoading, isError, error, execute } = useAsync();

  const onPasswordReset = async (email) => {
    const response = await execute(resetPassword(email));

    if (response.success) {
      history.push(SIGN_IN, { message: response.message });
    }
  };

  return (
    <BodyContainer>
      {isLoading && <FullPageSpinner />}
      <PasswordResetForm
        onPasswordReset={onPasswordReset}
        isError={isError}
        error={error}
      />
    </BodyContainer>
  );
}

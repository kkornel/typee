import React from 'react';
import { useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import ROUTES from '../../utils/consts/routes';
import PasswordResetForm from './PasswordResetForm';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function PasswordReset() {
  const history = useHistory();
  const { resetPassword } = useAuth();
  const { isLoading, isError, error, execute } = useAsync();

  const onPasswordReset = async (email) => {
    const response = await execute(resetPassword(email));

    if (response.success) {
      history.push(ROUTES.SIGN_IN, { message: response.message });
    }
  };

  return (
    <PasswordResetForm
      onPasswordReset={onPasswordReset}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
}

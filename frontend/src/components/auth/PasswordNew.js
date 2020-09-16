import React from 'react';
import { useHistory } from 'react-router-dom';

import ROUTES from '../../utils/consts/routes';
import PasswordNewForm from './PasswordNewForm';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function PasswordNew() {
  const history = useHistory();
  const { changePassword } = useAuth();
  const { isLoading, isError, error, execute } = useAsync();

  const onNewPassword = async (password) => {
    const response = await execute(changePassword(password));

    if (response.success) {
      history.push(ROUTES.SIGN_IN, { message: response.message });
    }
  };

  return (
    <PasswordNewForm
      onNewPassword={onNewPassword}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
}

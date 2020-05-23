import React from 'react';
import { useHistory } from 'react-router-dom';

import PasswordResetForm from './PasswordResetForm';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

function PasswordReset() {
  const { resetPassword } = useAuth();
  const history = useHistory();
  const { isLoading, isError, isSuccess, data, error, execute } = useAsync();

  if (isSuccess) {
    // history.push('/sign-in', { msg: 'elo' });
  }

  const onPasswordReset = async (email, setWasErrorShowed) => {
    const response = await execute(resetPassword(email));
    setWasErrorShowed(false);
    console.log(response);
    if (response.success) {
      history.push('/sign-in', { message: response.message });
    }
  };

  return (
    <div>
      <PasswordResetForm
        onPasswordReset={onPasswordReset}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}

export default PasswordReset;

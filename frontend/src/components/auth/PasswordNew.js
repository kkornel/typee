import React from 'react';
import { useHistory } from 'react-router-dom';

import PasswordNewForm from './PasswordNewForm';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

function PasswordNew() {
  const { changePassword } = useAuth();
  const history = useHistory();

  const { isLoading, isError, isSuccess, data, error, execute } = useAsync();

  if (isSuccess) {
    console.log('isSuccess');
  }

  const onNewPassword = async (password, setWasErrorShowed) => {
    console.log('onSubmit');
    const response = await execute(changePassword(password));
    setWasErrorShowed(false);
    console.log(response);
    if (response.success) {
      history.push('/sign-in', { message: response.message });
    }
  };
  return (
    <div>
      <PasswordNewForm
        onNewPassword={onNewPassword}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}

export default PasswordNew;

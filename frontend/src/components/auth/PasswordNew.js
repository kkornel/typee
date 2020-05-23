import React from 'react';
import { useHistory } from 'react-router-dom';

import PasswordNewForm from './PasswordNewForm';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

function PasswordNew() {
  const history = useHistory();
  const { changePassword } = useAuth();

  const { isLoading, isError, error, execute } = useAsync();

  const onNewPassword = async (password, setWasErrorShowed) => {
    const response = await execute(changePassword(password));
    setWasErrorShowed(false);
    console.log(';lsdfjlksdj', response);
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

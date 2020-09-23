import React from 'react';
import { useHistory } from 'react-router-dom';

import BodyContainer from '../home/BodyContainer';
import FullPageSpinner from '../ui/FullPageSpinner';
import PasswordNewForm from './PasswordNewForm';

import { SIGN_IN } from '../../utils/consts/routes';
import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function PasswordNew() {
  const history = useHistory();
  const { changePassword } = useAuth();
  const { isLoading, isError, error, execute } = useAsync();

  const onNewPassword = async (password) => {
    const response = await execute(changePassword(password));

    if (response.success) {
      history.push(SIGN_IN, { message: response.message });
    }
  };

  return (
    <BodyContainer>
      {isLoading && <FullPageSpinner />}
      <PasswordNewForm
        onNewPassword={onNewPassword}
        isError={isError}
        error={error}
      />
    </BodyContainer>
  );
}

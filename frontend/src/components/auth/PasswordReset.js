import React from 'react';
import { connect } from 'react-redux';

import FormContainer from '../ui/FormContainer';
import PasswordResetForm from './PasswordResetForm';
import { passwordResetRequest } from '../../actions/authActions';

function PasswordReset({ passwordResetRequest }) {
  const onFinish = (email) => {
    passwordResetRequest(email);
  };

  return (
    <FormContainer>
      <PasswordResetForm onSubmit={onFinish} />
    </FormContainer>
  );
}

export default connect(null, { passwordResetRequest })(PasswordReset);

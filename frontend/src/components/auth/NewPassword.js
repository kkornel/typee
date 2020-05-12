import React from 'react';
import { connect } from 'react-redux';

import FormContainer from '../ui/FormContainer';
import NewPasswordForm from './NewPasswordForm';
import { resetPassword } from '../../actions/authActions';

function NewPassword({ resetPassword }) {
  const onFinish = (newPassword) => {
    resetPassword(newPassword);
  };

  return (
    <FormContainer>
      <NewPasswordForm onSubmit={onFinish} />
    </FormContainer>
  );
}

export default connect(null, { resetPassword })(NewPassword);

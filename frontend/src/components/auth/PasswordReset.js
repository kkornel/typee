import React from 'react';
import { connect } from 'react-redux';

import PasswordResetForm from './PasswordResetForm';
import { passwordResetRequest } from '../../actions/authActions';

const PasswordReset = (props) => {
  const onSubmit = (email) => {
    console.log(email);
    props.passwordResetRequest(email);
  };

  return (
    <div className="container col-sm-6 offset-sm-3 mt-3 block-content-borders">
      <PasswordResetForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { passwordResetRequest })(PasswordReset);

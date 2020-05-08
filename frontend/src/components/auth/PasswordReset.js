import React from 'react';

import ResetPasswordForm from './ResetPasswordForm';

const PasswordReset = () => {
  const onSubmit = (email) => {
    console.log(email);
  };

  return (
    <div className="container col-sm-6 offset-sm-3 mt-3 block-content-borders">
      <ResetPasswordForm onSubmit={onSubmit} />
    </div>
  );
};

export default PasswordReset;

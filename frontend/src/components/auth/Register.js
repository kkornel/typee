import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import FormContainer from '../ui/FormContainer';
import {
  signUpWithEmail,
  resetMessageAndError,
} from '../../actions/authActions';

function Register({ resetMessageAndError, signUpWithEmail }) {
  useEffect(() => {
    return function cleanup() {
      resetMessageAndError();
    };
  }, [resetMessageAndError]);

  const onFinish = (email, username, password) => {
    signUpWithEmail(email, username, password);
  };

  return (
    <FormContainer>
      <RegisterForm onSubmit={onFinish} />
      <div className="border-top text-center mt-2">
        <small className="text-muted">
          Already Have An Account? <Link to="/login">Sign In</Link>
        </small>
      </div>
    </FormContainer>
  );
}

export default connect(null, {
  signUpWithEmail,
  resetMessageAndError,
})(Register);

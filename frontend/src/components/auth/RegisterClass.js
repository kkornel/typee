import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import FormContainer from '../ui/FormContainer';
import {
  signUpWithEmail,
  resetMessageAndError,
} from '../../actions/authActions';

class Register extends Component {
  componentWillUnmount() {
    this.props.resetMessageAndError();
  }

  onFinish = (email, username, password) => {
    this.props.signUpWithEmail(email, username, password);
  };

  render() {
    return (
      <FormContainer>
        <RegisterForm onSubmit={this.onFinish} />
        <div className="border-top text-center mt-2">
          <small className="text-muted">
            Already Have An Account? <Link to="/login">Sign In</Link>
          </small>
        </div>
      </FormContainer>
    );
  }
}

export default connect(null, {
  signUpWithEmail,
  resetMessageAndError,
})(Register);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormContainer from '../ui/FormContainer';
import NewPasswordForm from './NewPasswordForm';
import { resetPassword } from '../../actions/authActions';

class NewPassword extends Component {
  onFinish = (newPassword) => {
    this.props.resetPassword(newPassword);
  };

  render() {
    return (
      <FormContainer>
        <NewPasswordForm onSubmit={this.onFinish} />
      </FormContainer>
    );
  }
}

export default connect(null, { resetPassword })(NewPassword);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NewPasswordForm from './NewPasswordForm';
import { updatePassword } from '../../actions/authActions';

class NewPassword extends Component {
  submit = (formValues) => {
    const { password1: newPassword } = formValues;
    try {
      this.props.updatePassword(newPassword);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="container col-sm-6 offset-sm-3 mt-3 block-content-borders">
        <NewPasswordForm onSubmit={this.submit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { updatePassword })(NewPassword);

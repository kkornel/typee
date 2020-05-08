import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NewPasswordForm from './NewPasswordForm';
import { signUpWithEmail } from '../../actions/authActions';

class NewPassword extends Component {
  submit = (formValues) => {
    const { password1 } = formValues;
    try {
      // TODO: change
      // this.props.signUpWithEmail({ email, username, password: password1 });
      console.log(password1);
    } catch (error) {
      console.log('object');
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

export default connect(mapStateToProps, { signUpWithEmail })(NewPassword);

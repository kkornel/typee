import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import { signUpWithEmail } from '../../actions/authActions';

class Register extends Component {
  submit = (formValues) => {
    const { email, username, password1 } = formValues;
    try {
      this.props.signUpWithEmail({ email, username, password: password1 });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="container col-sm-6 offset-sm-3 mt-3 block-content-borders">
        <RegisterForm onSubmit={this.submit} />
        <div className="border-top text-center mt-2">
          <small className="text-muted">
            Already Have An Account? <Link to="/login">Sign In</Link>
          </small>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signUpWithEmail })(Register);

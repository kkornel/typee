import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import RegisterForm from './RegisterForm';
import { signUpWithEmail } from '../../actions/authActions';

class Register extends Component {
  submit = (formValues) => {
    console.log(formValues);
    const { email, username, password1 } = formValues;
    this.props.signUpWithEmail({ email, username, password: password1 });
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

export default connect(null, { signUpWithEmail })(Register);

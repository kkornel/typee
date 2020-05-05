import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';

class Register extends Component {
  submit = (formValues) => {
    console.log(formValues);
    // this.props.signUpWithEmail(formValues);
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

export default connect(null, {})(Register);

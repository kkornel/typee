import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';

class Login extends Component {
  submit = (formValues) => {
    console.log(formValues);
    // this.props.loginWithEmail(formValues);
  };

  render() {
    return (
      <div className="container col-sm-6 offset-sm-3 mt-3 block-content-borders">
        <div className="row">
          <div className="col">
            <LoginForm onSubmit={this.submit} />
          </div>
        </div>
        <hr data-content="OR" className="hr-text"></hr>
        <div className="row">
          <div className="col">
            <div className="row justify-content-center mb-2 mt-1">
              <div className="btn btn-sm btn-tw">
                <i className="fa fa-twitter"></i> Continue with Twitter
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="btn btn-sm btn-go">
                <i className="fa fa-google"></i> Continue with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(Login);

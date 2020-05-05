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
      <div className="ui one column center aligned grid">
        <div className="ui segment">
          <LoginForm onSubmit={this.submit} />
          <div className="ui horizontal divider">Or</div>
          <div className="ui one column center aligned grid">
            <div className="column twelve wide">
              <div className="ui twitter button">
                <i className="twitter icon"></i>
                Continue with Twitter
              </div>
            </div>
            <div className="column twelve wide">
              <div className="ui google plus button">
                <i className="google icon"></i>
                Continue with Google
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div>
      //   <LoginForm onSubmit={this.submit} />
      // </div>
    );
  }
}

export default connect(null, {})(Login);

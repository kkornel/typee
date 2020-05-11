import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import {
  loginWithEmail,
  resetMessageAndError,
} from '../../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);

    console.log('test');

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    this.from = from;
    this.props.resetMessageAndError();
  }

  submit = (email, password) => {
    this.props.loginWithEmail(email, password);
  };

  renderMessage = () => {
    let message = '';
    let isError = false;
    if (this.props.auth.message) {
      message = this.props.auth.message;
    } else if (this.props.auth.error) {
      message = this.props.auth.error.message;
      isError = true;
    }

    if (message) {
      const className = `alert alert-${isError ? 'warning' : 'info'}`;
      return (
        <div className="just">
          <div className={className} role="alert">
            {message}
          </div>
        </div>
      );
    }
  };

  render() {
    if (this.props.auth.isSignedIn) {
      return <Redirect to={this.from} />;
    }

    return (
      <div className="container col-sm-12">
        {this.renderMessage()}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {
  loginWithEmail,
  resetMessageAndError,
})(Login);

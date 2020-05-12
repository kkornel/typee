import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resendVerificationEmail } from '../../actions/authActions';
import InvalidFeedback from '../ui/InvalidFeedback';
import RowJustifiedCentered from '../ui/RowJustifiedCentered';
import Legend from '../ui/forms/Legend';
import Fieldset from '../ui/forms/Fieldset';
import PrimaryButton from '../ui/buttons/PrimaryButton';

class LoginForm extends Component {
  // TODO: Remove initial values
  // state = {
  //   email: { value: '', previousValue: '', error: null, touched: false },
  //   password: { value: '', previousValue: '', error: null, touched: false },
  //   componentDidMountForFirstTime: true,
  // };
  state = {
    email: {
      value: 'Kornelcodes@gmail.com',
      previousValue: '',
      error: null,
      touched: false,
    },
    password: {
      value: 'Kkorneel1@gmail.com',
      previousValue: '',
      error: null,
      touched: false,
    },
    componentDidMountForFirstTime: true,
  };

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email.value;
    const password = this.state.password.value;

    if (!email || !password) {
      return;
    }

    this.setState({
      email: {
        ...this.state.email,
        previousValue: email,
      },
      password: {
        ...this.state.password,
        previousValue: password,
      },
      componentDidMountForFirstTime: false,
    });

    this.props.onSubmit(email, password);
  };

  onResendClick = () => {
    this.props.resendVerificationEmail(this.state.email.value);
  };

  handleBlur(name) {
    this.setState({
      [name]: {
        ...this.state[name],
        touched: true,
      },
    });
  }

  validateForm = () => {
    const { email, password } = this.state;

    const errors = {};

    if (!email.value) {
      errors.email = 'Required!';
    }

    if (!password.value) {
      errors.password = 'Required!';
    }

    return errors;
  };

  shouldMarkError = (field, errors, renderError) => {
    // Was touched?
    const touched = this.state[field].touched;

    // If client-side validation returned error for field
    let hasError = errors[field];

    if (hasError && touched) {
      return true;
    }

    // If there is a server-side error, but client-side is fine
    // and the field is only email (renderError === true)
    if (this.props.auth.error && renderError) {
      hasError = true;
    }

    return hasError && touched;
  };

  renderError = (errors, field) => {
    const error = errors[field];
    const { error: authError } = this.props.auth;

    if (error) {
      // Rendering client-side error, like 'Required'
      return <InvalidFeedback>{error}</InvalidFeedback>;
    } else if (authError) {
      // Rendering server-side error, like 'NOT_VERIFIED'
      return (
        <InvalidFeedback>
          {authError.message}
          {authError.status === 'NOT_VERIFIED' && (
            <span className="link" onClick={this.onResendClick}>
              {' '}
              Resend verification email?
            </span>
          )}
        </InvalidFeedback>
      );
    }
  };

  renderField = (name, label, type, renderError) => {
    const errors = this.validateForm();

    // Has the input values changed since last submission?
    let inputChanged = false;
    if (this.props.auth.error) {
      inputChanged =
        this.state.email.value !== this.state.email.previousValue ||
        this.state.password.value !== this.state.password.previousValue;
    }

    const markError = this.shouldMarkError(name, errors, renderError);
    let className = '';

    // Mark error if there is an error either client or server side
    // also if input hasn't changed since last submission,
    // or if is empty (couldn't do that in shouldMarkError)
    if (name === 'email') {
      className = `form-control ${
        (markError && !inputChanged) ||
        (this.state.email.value === '' &&
          !this.state.componentDidMountForFirstTime)
          ? 'is-invalid'
          : ''
      }`;
    } else {
      className = `form-control ${markError ? 'is-invalid' : ''}`;
    }

    return (
      <div className="form-group">
        <label>{label}</label>
        <div>
          <input
            name={name}
            placeholder={label}
            type={type}
            className={className}
            value={this.state[name].value}
            onBlur={() => this.handleBlur(name)}
            onChange={(e) =>
              this.setState({
                ...this.state,
                [name]: { value: e.target.value },
              })
            }
          />
          {this.renderError(errors, name)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Fieldset>
          <Legend text="Sign In" />
          {this.renderField('email', 'Email', 'email', true)}
          {this.renderField('password', 'Password', 'password', false)}
          <RowJustifiedCentered>
            <PrimaryButton text="Sign In" />
          </RowJustifiedCentered>
        </Fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {
  resendVerificationEmail,
})(LoginForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import passwordValidator from '../../utils/passwordValidator';

class RegisterForm extends Component {
  // Had to switch to controlled input, because redux-form does not re render
  // Fields on updating component (changing state), so there is no way to
  // change input class to is-invalid
  // state = {
  //   email: { value: '', error: null, touched: false },
  //   username: { value: '', error: null, touched: false },
  //   password1: { value: '', error: null, touched: false },
  //   password2: { value: '', error: null, touched: false },
  // };
  // TODO: Remove initial values
  state = {
    email: { value: 'Kornelcodes@gmail.com', error: null, touched: false },
    username: { value: 'Kornelcodes@gmail.com', error: null, touched: false },
    password1: { value: 'Kkorneel1@gmail.com', error: null, touched: false },
    password2: { value: 'Kkorneel1@gmail.com', error: null, touched: false },
  };

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email.value;
    const username = this.state.username.value;
    const password = this.state.password1.value;

    this.props.onSubmit(email, username, password);
  };

  // Is invoked when input losses focus (was touched)
  handleBlur(name) {
    this.setState({ [name]: { ...this.state[name], touched: true } });
  }

  // Client-side validation
  validateForm = () => {
    const { email, username, password1, password2 } = this.state;

    const errors = {};

    if (!email.value) {
      errors.email = 'Required.';
    } else if (!validator.isEmail(email.value)) {
      errors.email = 'Invalid email.';
    }

    if (!username.value) {
      errors.username = 'Required.';
    }

    if (!password1.value) {
      errors.password1 = 'Required.';
    } else if (!passwordValidator.validate(password1.value)) {
      console.log(passwordValidator.validate(password1.value, { list: true }));
      errors.password1 = 'Must have: 8 chars, upper, lower, digits.';
    }

    if (!password2.value) {
      errors.password2 = 'Required.';
    } else if (password1.value !== password2.value) {
      errors.password2 = `Passwords don't match.`;
    }

    return errors;
  };

  renderError = (error) => {
    if (error) {
      // Rendering client-side error, like 'Required' or 'Passwords do not match'
      return <div className="invalid-feedback">{error}</div>;
    } else if (this.props.auth.error) {
      // Rendering server side error, like 'Email already in use' (duplicate key error)
      const { field, value } = this.props.auth.error.details;

      // If the value in input changed (is different than server error value) return.
      // There were a bug, where after submitting form, the error was received and even,
      // after changing value in form and RE-submitting FOR THE FIRST TIME error message didn't disappear.
      if (this.state[field].value !== value) {
        return;
      }

      if (field === 'email') {
        return (
          <div className="invalid-feedback">
            Email already in use. <Link to="/"> Forgot password?</Link>
          </div>
        );
      } else if (field === 'username') {
        return <div className="invalid-feedback">Username already in use.</div>;
      }

      // TODO Test and delete later, probably.
      // Should never appear. Need testing  with different data.
      return (
        <div className="invalid-feedback">{this.props.auth.error.message}</div>
      );
    }
  };

  renderField = (name, label, type) => {
    const errors = this.validateForm();

    const shouldMarkError = (field) => {
      // If client-side validation returned error for field
      let hasError = errors[field];
      // Was touched?
      const touched = this.state[field].touched;

      // If there is a server-side error, but client-side is fine
      if (this.props.auth.error && !hasError) {
        hasError = this.props.auth.error.details.field === field;
      }

      return hasError && touched;
    };

    const className = `form-control ${
      shouldMarkError(name) ? 'is-invalid' : ''
    }`;

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
          {this.renderError(errors[name])}
        </div>
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset className="form-group mb-1">
          <legend className="border-bottom mb-3 pb-1">Sign Up</legend>
          {this.renderField('email', 'Email', 'email')}
          {this.renderField('username', 'Username', 'text')}
          {this.renderField('password1', 'Password', 'password')}
          {this.renderField('password2', 'Confirm password', 'password')}
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(RegisterForm);

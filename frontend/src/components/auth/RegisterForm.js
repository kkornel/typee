import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';

import passwordValidator from '../../utils/passwordValidator';

class RegisterForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  renderError(touched, error) {
    if (touched && error) {
      return <div className="invalid-feedback">{error}</div>;
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    const className = `form-control ${touched && error ? 'is-invalid' : ''}`;

    return (
      <div className="form-group">
        <label>{label}</label>
        <div>
          <input
            {...input}
            placeholder={label}
            type={type}
            className={className}
          />
          {this.renderError(touched, error)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <fieldset className="form-group mb-1">
          <legend className="border-bottom mb-3 pb-1">Join Today!</legend>
          <Field
            type="email"
            name="email"
            component={this.renderField}
            label="Email"
          />
          <Field
            type="text"
            name="username"
            component={this.renderField}
            label="Username"
          />
          <Field
            type="password"
            name="password1"
            component={this.renderField}
            label="Password"
          />
          <Field
            type="password"
            name="password2"
            component={this.renderField}
            label="Confirm password"
          />
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

const validate = ({ email, username, password1, password2 }) => {
  const errors = {};

  if (!email) {
    errors.email = 'Required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Invalid email';
  }

  if (!username) {
    errors.username = 'Required';
  }

  if (!password1) {
    errors.password1 = 'Required';
  } else if (!passwordValidator.validate(password1)) {
    console.log(passwordValidator.validate(password1, { list: true }));
    errors.password1 = 'Must has 8 chars, upper, lower, digits';
  }

  if (password1 !== password2) {
    errors.password2 = `Passwords don't match.`;
  }

  return errors;
};

export default reduxForm({
  form: 'registerForm',
  validate,
})(RegisterForm);

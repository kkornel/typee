import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';

class LoginForm extends Component {
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
            type="password"
            name="password"
            component={this.renderField}
            label="Password"
          />
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'Required';
  } else if (!validator.isEmail(formValues.email)) {
    errors.email = 'Invalid email';
  }

  if (!formValues.password) {
    errors.password = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);

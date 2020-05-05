import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';

class LoginForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  renderError(touched, error) {
    if (touched && error) {
      return (
        // <div className="ui error message">
        //   <div className="header">{error}</div>
        // </div>
        <div className="ui pointing red basic label">{error}</div>
      );
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    const className = `field ${touched && error ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {this.renderError(touched, error)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <h2 className="ui dividing header">Create new account!</h2>
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
        <div className="ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            <button className="ui button" type="submit">
              Log In
            </button>
          </div>
        </div>
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

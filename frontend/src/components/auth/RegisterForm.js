import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import passwordValidator from 'password-validator';

class RegisterForm extends Component {
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
        <div className="ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            <button className="ui teal button" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }
}
// Create a schema
const passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

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
  } else if (!passwordSchema.validate(password1)) {
    console.log(passwordSchema.validate(password1, { list: true }));
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

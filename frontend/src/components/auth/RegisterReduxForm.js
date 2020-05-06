import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validator from 'validator';

import passwordValidator from '../../utils/passwordValidator';

class RegisterForm extends Component {
  state = { error: null };
  constructor(props) {
    super(props);

    this.errorRef = React.createRef();
    this.errorRef2 = React.createRef();
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  renderError(touched, error) {
    if (touched && error) {
      // return <div className="invalid-feedback" ref={this.errorRef}>{error}</div>;
    }
    let msg = this.props.auth.error ? this.props.error.msg : '';
    console.log('msg', msg);
    return (
      <div className="invalid-feedback" ref={this.errorRef}>
        {this.state.error}
      </div>
    );
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    const className = `form-control ${touched && error ? 'is-invalid' : ''}`;
    console.log('2');
    console.log(input);
    return (
      <div className="form-group">
        <label>{label}</label>
        <div>
          {/* TODO: Remove default value from here. */}
          <input
            {...input}
            placeholder={label}
            type={type}
            className={className}
            ref={this.errorRef2}
          />
          {this.renderError(touched, error)}
        </div>
      </div>
    );
  };

  componentDidUpdate() {
    if (this.props.auth.error) {
      console.log('huston', this.errorRef.current);
      this.errorRef.current.value = 'dasdasdasd';
      console.log(this.state);
      this.errorRef2.current.class = 'form-control is-invalid';
      console.log('this.errorRef2.current', this.errorRef2.current);
    }
  }

  render() {
    console.log('1');

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

  // TODO: Return errors.
  return errors;
  // return {};
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

RegisterForm = connect(mapStateToProps)(RegisterForm);

export default reduxForm({
  form: 'registerForm',
  validate,
})(RegisterForm);

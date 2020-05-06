import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validator from 'validator';

import passwordValidator from '../../utils/passwordValidator';

class RegisterForm extends Component {
  state = {
    email: { value: '', error: null, touched: false },
    username: { value: '', error: null, touched: false },
    password1: { value: '', error: null, touched: false },
    password2: { value: '', error: null, touched: false },
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      email: this.state.email.value,
      username: this.state.username.value,
      password1: this.state.password1.value,
      password2: this.state.password2.value,
    });
  };

  renderError = (error) => {
    console.log('error', error);
    if (error) {
      return <div className="invalid-feedback">{error}</div>;
    }
    console.log('error', this.props.auth);
    if (this.props.auth.error) {
      return (
        <div className="invalid-feedback">{this.props.auth.error.message}</div>
      );
    }
  };

  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  };

  handleUsernameChange = (evt) => {
    this.setState({ password: evt.target.value });
  };

  handlePassword1Change = (evt) => {
    this.setState({ password: evt.target.value });
  };

  handlePassword2Change = (evt) => {
    this.setState({ password: evt.target.value });
  };

  handleBlur(name) {
    console.log('1', this.state);
    this.setState({ [name]: { ...this.state[name], touched: true } });
  }

  renderField = (name, label, type, touched = null, error = null) => {
    const errors = validate(this.state);
    console.log('2', errors);

    const shouldMarkError = (field) => {
      let hasError = errors[field];
      const touched = this.state[field].touched;
      if (this.props.auth.error) {
        hasError = this.props.auth.error.field === field ? true : hasError;
      }

      return hasError && touched;
    };

    const className = `form-control ${
      shouldMarkError(name) ? 'is-invalid' : ''
    }`;
    let handleFunction = null;
    if (name === 'email') {
      handleFunction = this.handleEmailChange;
    } else if (name === 'username') {
      handleFunction = this.handleUsernameChange;
    } else if (name === 'password1') {
      handleFunction = this.handlePassword1Change;
    } else if (name === 'password2') {
      handleFunction = this.handlePassword2Change;
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
            onBlur={(e) => this.handleBlur(name)}
            onChange={(e) =>
              this.setState({
                ...this.state,
                [name]: { value: e.target.value },
              })
            }
          />
          {this.renderError(errors[name])}
          {/* <div className="invalid-feedback">co jest kurwa</div> */}
        </div>
      </div>
    );
  };

  componentDidUpdate() {}

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset className="form-group mb-1">
          <legend className="border-bottom mb-3 pb-1">Join Today!</legend>
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

const validate = ({ email, username, password1, password2 }) => {
  const errors = {};
  console.log('object, ', email, username, password1, password2);
  if (!email.value) {
    errors.email = 'Required';
  } else if (!validator.isEmail(email.value)) {
    errors.email = 'Invalid email';
  }

  if (!username.value) {
    errors.username = 'Required';
  }

  if (!password1.value) {
    errors.password1 = 'Required';
  } else if (!passwordValidator.validate(password1.value)) {
    console.log(passwordValidator.validate(password1.value, { list: true }));
    errors.password1 = 'Must has 8 chars, upper, lower, digits';
  }

  if (!password2.value) {
    errors.password2 = 'Required';
  } else if (password1.value !== password2.value) {
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

// RegisterForm = connect(mapStateToProps)(RegisterForm);

// export default reduxForm({
//   form: 'registerForm',
//   validate,
// })(RegisterForm);

export default connect(mapStateToProps)(RegisterForm);

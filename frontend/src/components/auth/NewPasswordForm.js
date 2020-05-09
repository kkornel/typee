import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import passwordValidator from '../../utils/passwordValidator';

class NewPasswordForm extends Component {
  // Had to switch to controlled input, because redux-form does not re render
  // Fields on updating component (changing state), so there is no way to
  // change input class to is-invalid
  // state = {
  //   password1: { value: '', error: null, touched: false },
  //   password2: { value: '', error: null, touched: false },
  // };
  // TODO: Remove initial values
  state = {
    password1: { value: 'Kkorneel1@gmail.com', error: null, touched: false },
    password2: { value: 'Kkorneel1@gmail.com', error: null, touched: false },
  };

  onSubmit = (event) => {
    event.preventDefault();

    const newPassword = this.state.password1.value;
    this.props.onSubmit(newPassword);
  };

  // Is invoked when input losses focus (was touched)
  handleBlur(name) {
    this.setState({ [name]: { ...this.state[name], touched: true } });
  }

  // Client-side validation
  validateForm = () => {
    const { password1, password2 } = this.state;

    const errors = {};

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
      return <div className="invalid-feedback">{error}</div>;
    }
  };

  renderField = (name, label, type) => {
    const errors = this.validateForm();

    const shouldMarkError = (field) => {
      // If client-side validation returned error for field
      let hasError = errors[field];
      // Was touched?
      const touched = this.state[field].touched;

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
          <legend className="border-bottom mb-3 pb-1">Set new password</legend>
          {this.renderField('password1', 'Password', 'password')}
          {this.renderField('password2', 'Confirm password', 'password')}
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary">
              Confirm
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

export default connect(mapStateToProps)(NewPasswordForm);

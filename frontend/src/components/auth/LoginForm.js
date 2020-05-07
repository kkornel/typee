import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginForm extends Component {
  state = {
    email: { value: '', previousValue: '', error: null, touched: false },
    password: { value: '', previousValue: '', error: null, touched: false },
  };

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email.value;
    const password = this.state.password.value;

    if (!email || !password) {
      return;
    }

    const formValues = { email, password };

    this.setState({
      email: {
        ...this.state.email,
        previousValue: email,
      },
      password: {
        ...this.state.password,
        previousValue: password,
      },
    });

    this.props.onSubmit(formValues);
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

  renderError = (errors, field) => {
    const error = errors[field];

    if (error) {
      // Rendering client-side error, like 'Required'
      return <div className="invalid-feedback">{error}</div>;
    } else if (this.props.auth.error) {
      return (
        <div className="invalid-feedback">{this.props.auth.error.message}</div>
      );
    }
  };

  renderField = (name, label, type, renderError) => {
    const errors = this.validateForm();

    const shouldMarkError = (field) => {
      // If client-side validation returned error for field
      let hasError = errors[field];
      // Was touched?
      const touched = this.state[field].touched;

      // If there is a server-side error, but client-side is fine
      if (this.props.auth.error && !hasError && renderError) {
        hasError = true;
      }

      return hasError && touched;
    };

    let inputChanged = false;
    if (this.props.auth.error) {
      inputChanged =
        this.state.email.value !== this.state.email.previousValue ||
        this.state.password.value !== this.state.password.previousValue;
    }

    const className = `form-control ${
      shouldMarkError(name) && !inputChanged ? 'is-invalid' : ''
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
          {this.renderError(errors, name)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset className="form-group mb-1">
          <legend className="border-bottom mb-3 pb-1">Sign In</legend>
          {this.renderField('email', 'Email', 'email', true)}
          {this.renderField('password', 'Password', 'password', false)}
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(LoginForm);

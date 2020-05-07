import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginForm extends Component {
  state = {
    email: { value: '', error: '', touched: false },
    password: { value: '', error: null, touched: false },
  };

  onSubmit = (event) => {
    event.preventDefault();

    const formValues = {
      email: this.state.email.value,
      password: this.state.password.value,
    };

    this.props.onSubmit(formValues);
  };

  handleBlur(name) {
    this.setState({ [name]: { ...this.state[name], touched: true } });
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

  renderError = (error) => {
    if (error) {
      // Rendering client-side error, like 'Required'
      return <div className="invalid-feedback">{error}</div>;
    } else if (this.props.auth.error) {
      // const { message} = this.props.auth.error;

      // if (this.state[field].value !== value) {
      //   return;
      // }

      // if (field === 'email') {
      //   return <div className="invalid-feedback">{message}</div>;
      // }

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
        hasError = true;
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
          <legend className="border-bottom mb-3 pb-1">Sign In</legend>
          {this.renderField('email', 'Email', 'email')}
          {this.renderField('password', 'Password', 'password')}
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

import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginForm extends Component {
  // state = {
  //   email: { value: '', previousValue: '', error: null, touched: false },
  //   password: { value: '', previousValue: '', error: null, touched: false },
  //   componentDidMountForFirstTime: true,
  // };
  // TODO: Remove initial values
  state = {
    email: {
      value: 'Kornelcodes@gmail.com',
      previousValue: '',
      error: null,
      touched: false,
    },
    password: {
      value: 'Kkorneel1@gmail.com',
      previousValue: '',
      error: null,
      touched: false,
    },
    componentDidMountForFirstTime: true,
  };

  componentDidMount() {
    if (this.props.auth && this.props.auth.user) {
      console.log(this.props.auth.user.email);
      this.setState({
        email: {
          ...this.state.email,
          value: this.props.auth.user.email,
          touched: true,
        },
      });
    }
  }

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
      componentDidMountForFirstTime: false,
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

      if (hasError && touched) {
        return true;
      }

      // If there is a server-side error, but client-side is fine
      // and the field is only email (renderError === true)
      if (this.props.auth.error && renderError) {
        hasError = true;
      }

      return hasError && touched;
    };

    // Did the input values changed since last submission?
    let inputChanged = false;
    if (this.props.auth.error) {
      inputChanged =
        this.state.email.value !== this.state.email.previousValue ||
        this.state.password.value !== this.state.password.previousValue;
    }

    let className = '';
    // Mark error if there is an error either client or server side
    // also if input hasn't changed since last submission,
    // or if is empty (couldn't do that in shouldMarkError)
    if (name === 'email') {
      className = `form-control ${
        (shouldMarkError(name) && !inputChanged) ||
        (this.state.email.value === '' &&
          !this.state.componentDidMountForFirstTime)
          ? 'is-invalid'
          : ''
      }`;
    } else {
      className = `form-control ${shouldMarkError(name) ? 'is-invalid' : ''}`;
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

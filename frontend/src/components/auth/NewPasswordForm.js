import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import passwordValidator from '../../utils/passwordValidator';
import InvalidFeedback from '../ui/InvalidFeedback';
import RowJustifiedCentered from '../ui/RowJustifiedCentered';
import Legend from '../ui/forms/Legend';
import Fieldset from '../ui/forms/Fieldset';
import PrimaryButton from '../ui/buttons/PrimaryButton';

class NewPasswordForm extends Component {
  // TODO: Remove initial values
  // state = {
  //   password1: { value: '', error: null, touched: false },
  //   password2: { value: '', error: null, touched: false },
  // };
  state = {
    password1: { value: 'Kkorneel1@gmail.com', error: null, touched: false },
    password2: { value: 'Kkorneel1@gmail.com', error: null, touched: false },
  };

  constructor(props) {
    super(props);
    this.errorRef = React.createRef();
  }

  onSubmit = (event) => {
    event.preventDefault();

    const newPassword = this.state.password1.value;

    this.errorRef.current.hidden = true;
    this.props.onSubmit(newPassword);
  };

  // Is invoked when input losses focus (was touched)
  handleBlur(name) {
    this.setState({ [name]: { ...this.state[name], touched: true } });
  }

  // Client-side validation
  validateForm = () => {
    const errors = {};
    const { password1, password2 } = this.state;

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

  shouldMarkError = (field, errors) => {
    const touched = this.state[field].touched;
    let hasError = errors[field];

    return hasError && touched;
  };

  renderError = (error) => {
    if (error) {
      return <InvalidFeedback>{error}</InvalidFeedback>;
    }
  };

  renderServerError = () => {
    if (this.props.auth.error && this.errorRef.current) {
      this.errorRef.current.hidden = false;
      return this.props.auth.error.message;
    }
  };

  renderField = (name, label, type) => {
    const errors = this.validateForm();

    const className = `form-control ${
      this.shouldMarkError(name, errors) ? 'is-invalid' : ''
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
        <Fieldset>
          <Legend text="Set new password" />
          {this.renderField('password1', 'Password', 'password')}
          {this.renderField('password2', 'Confirm password', 'password')}
          <RowJustifiedCentered>
            <PrimaryButton text="Confirm" />
          </RowJustifiedCentered>
          <div
            className="row justify-content-center text-danger mt-2"
            ref={this.errorRef}
            hidden
          >
            <h6 className="mb-0">
              {this.renderServerError()}{' '}
              <Link to="/password/reset">Send new reset request?</Link>
            </h6>
          </div>
        </Fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(NewPasswordForm);

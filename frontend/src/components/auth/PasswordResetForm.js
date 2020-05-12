import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import validator from 'validator';

import InvalidFeedback from '../ui/InvalidFeedback';
import RowJustifiedCentered from '../ui/RowJustifiedCentered';
import Legend from '../ui/forms/Legend';
import Fieldset from '../ui/forms/Fieldset';
import PrimaryButton from '../ui/buttons/PrimaryButton';

class ResetPasswordForm extends Component {
  // TODO: Remove initial values
  // state = { emailValue: '', touched: false };
  state = { emailValue: 'Kornelcodes@gmail.com', touched: false };

  constructor(props) {
    super(props);
    this.recaptchaRef = React.createRef();
    this.recaptchaErrorRef = React.createRef();
    this.emailErrorRef = React.createRef();
  }

  onChange = () => {
    this.recaptchaErrorRef.current.hidden = true;
  };

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.emailValue;

    // TODO: Remove initial values (uncomment all)
    // if (!email) {
    //   this.emailErrorRef.current.hidden = false;
    // }

    // const recaptchaValue = this.recaptchaRef.current.getValue();

    // if (!recaptchaValue) {
    //   this.recaptchaErrorRef.current.hidden = false;
    //   return;
    // }

    this.props.onSubmit(email);
  };

  handleBlur = () => {
    this.setState({ touched: true });
  };

  validateForm = () => {
    const errors = {};
    const { emailValue } = this.state;

    if (!emailValue) {
      errors.email = 'Required.';
    } else if (!validator.isEmail(emailValue)) {
      errors.email = 'Invalid email.';
    }

    return errors;
  };

  shouldMarkError = (errors) => {
    const touched = this.state.touched;
    let hasError = errors.email;

    return hasError && touched;
  };

  renderError = (error) => {
    if (error) {
      return <InvalidFeedback>{error}</InvalidFeedback>;
    }
  };

  render() {
    if (this.emailErrorRef.current) {
      this.emailErrorRef.current.hidden = true;
    }

    const errors = this.validateForm();
    const className = `form-control ${
      this.shouldMarkError(errors) ? 'is-invalid' : ''
    }`;

    return (
      <form onSubmit={this.onSubmit}>
        <Fieldset>
          <Legend text="Forgot password?" />
          <div className="form-group">
            <label>Email</label>
            <div>
              <input
                name="email"
                placeholder="Email"
                type="email"
                className={className}
                value={this.state.emailValue}
                onBlur={() => this.handleBlur()}
                onChange={(e) => this.setState({ emailValue: e.target.value })}
              />
              {this.renderError(errors.email)}
              <div className="text-danger" ref={this.emailErrorRef} hidden>
                <small>Required.</small>
              </div>
            </div>
          </div>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={this.onChange}
            ref={this.recaptchaRef}
          />
          <div className="text-danger" ref={this.recaptchaErrorRef} hidden>
            <small>Fill ReCAPTCHA</small>
          </div>
          <div className="mt-2"></div>
          <RowJustifiedCentered>
            <PrimaryButton text="Request password reset" />
          </RowJustifiedCentered>
        </Fieldset>
      </form>
    );
  }
}

export default ResetPasswordForm;

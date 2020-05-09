import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import validator from 'validator';

class ResetPasswordForm extends Component {
  // state = { emailValue: '', touched: false };
  // TODO: Remove initial values
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

  renderError = (error) => {
    if (error) {
      return <div className="invalid-feedback">{error}</div>;
    }
  };

  render() {
    if (this.emailErrorRef.current) {
      this.emailErrorRef.current.hidden = true;
    }

    const errors = this.validateForm();

    const shouldMarkError = () => {
      let hasError = errors.email;
      const touched = this.state.touched;

      return hasError && touched;
    };

    const className = `form-control ${shouldMarkError() ? 'is-invalid' : ''}`;
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset className="form-group mb-1">
          <legend className="border-bottom mb-3 pb-1">Forgot password?</legend>
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
          <div className="row justify-content-center mt-2">
            <button type="submit" className="btn btn-primary">
              Request password reset
            </button>
          </div>
        </fieldset>
      </form>
    );
  }

  validateForm = () => {
    const { emailValue } = this.state;

    const errors = {};

    if (!emailValue) {
      errors.email = 'Required.';
    } else if (!validator.isEmail(emailValue)) {
      errors.email = 'Invalid email.';
    }

    return errors;
  };
}

export default ResetPasswordForm;

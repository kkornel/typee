import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  loginWithEmail,
  resetMessageAndError,
} from '../../actions/authActions';
import LoginForm from './LoginForm';
import AlertMessage from '../ui/AlertMessage';
import FormContainer from '../ui/FormContainer';
import BodyContainer from '../ui/BodyContainer';
import HorizontalDivider from '../ui/HorizontalDivider';
import RowJustifiedCentered from '../ui/RowJustifiedCentered';
import GoogleButton from '../ui/buttons/GoogleButton';
import TwitterButton from '../ui/buttons/TwitterButton';
import Row from '../ui/bootstrap/Row';
import Column from '../ui/bootstrap/Column';

class Login extends Component {
  constructor(props) {
    super(props);
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    this.from = from;
  }

  componentWillUnmount() {
    this.props.resetMessageAndError();
  }

  onFinish = (email, password) => {
    this.props.loginWithEmail(email, password);
  };

  render() {
    const { auth } = this.props;

    if (auth.isSignedIn) {
      return <Redirect to={this.from} />;
    }

    return (
      <BodyContainer>
        {auth.message && (
          <AlertMessage message={auth.message} alertType="info" />
        )}
        <FormContainer>
          <Row>
            <Column>
              <LoginForm onSubmit={this.onFinish} />
            </Column>
          </Row>
          <HorizontalDivider text="OR" />
          <Row>
            <Column>
              <RowJustifiedCentered className="mb-2 mt-1">
                <TwitterButton />
              </RowJustifiedCentered>
              <RowJustifiedCentered>
                <GoogleButton />
              </RowJustifiedCentered>
            </Column>
          </Row>
        </FormContainer>
      </BodyContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {
  loginWithEmail,
  resetMessageAndError,
})(Login);

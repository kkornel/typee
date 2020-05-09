import axios from 'axios';

import {
  SIGN_UP_WITH_EMAIL,
  SIGN_UP_WITH_EMAIL_ERROR,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_FAILED,
} from './types';

import history from '../history';

export const signUpWithEmail = (email, username, password) => async (
  dispatch
) => {
  try {
    const response = await axios.post('/api/auth/register', {
      email,
      username,
      password,
    });
    console.log('signUpWithEmail', response.data);

    // response.data = { message: `A verification email has been sent to ${user.email}`}
    dispatch({ type: SIGN_UP_WITH_EMAIL, payload: response.data });

    history.push('/login');
  } catch (error) {
    console.log('ERROR:', error.response.data);

    if (error.response.data.error.code === 409) {
      dispatch({
        type: SIGN_UP_WITH_EMAIL_ERROR,
        payload: error.response.data,
      });
    }
  }
};

export const loginWithEmail = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    console.log('loginWithEmail', response.data);

    // response.data = { token, user }
    dispatch({ type: LOGIN_WITH_EMAIL, payload: response.data });

    history.push('/');
  } catch (error) {
    console.log('ERROR:', error.response.data);

    dispatch({
      type: LOGIN_WITH_EMAIL_ERROR,
      payload: error.response.data,
    });
  }
};

export const passwordResetRequest = (email) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/password/reset', { email });
    console.log('passwordResetRequest', response.data);

    // response.data = { message: `A reset email has been sent to ${user.email}` }
    dispatch({ type: PASSWORD_RESET_REQUEST, payload: response.data });

    history.push('/login');
  } catch (error) {
    console.log('ERROR:', error.response.data);
  }
};

export const updatePassword = (newPassword) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/password/reset/new', {
      newPassword,
    });
    console.log('updatePassword', response.data);

    // response.data = { message: 'Password has been updated.' }
    dispatch({
      type: PASSWORD_RESET_REQUEST_SUCCESS,
      payload: response.data,
    });

    history.push('/login');
  } catch (error) {
    console.log('ERROR:', error.response.data);

    dispatch({
      type: PASSWORD_RESET_REQUEST_FAILED,
      payload: error.response.data,
    });
  }
};

export const resendVerifyEmail = (email) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/verify', { email });
    console.log('resendVerifyEmail', response.data);

    // response.data = { message: `A verification email has been sent to ${user.email}` }
    dispatch({
      type: PASSWORD_RESET_REQUEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('ERROR:', error.response.data);
  }
};

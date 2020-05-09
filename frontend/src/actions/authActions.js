import axios from 'axios';

import {
  REQUEST_ERROR,
  SIGN_UP_WITH_EMAIL,
  LOGIN_WITH_EMAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  RESEND_VERIFICATION_EMAIL,
} from './types';

import history from '../history';

/**
 * Posts data to: /api/auth/register
 *
 * Dispatches an action with payload: { message: 'A verification email has been sent to ${user.email}'}.
 */
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

    // response.data = { message: `A verification email has been sent to {email}' }.
    dispatch({ type: SIGN_UP_WITH_EMAIL, payload: response.data });

    history.push('/login');
  } catch (error) {
    console.log('ERROR:', error.response.data);

    if (error.response.data.error.code === 409) {
      dispatch({
        type: REQUEST_ERROR,
        payload: error.response.data,
      });
    }
  }
};

/**
 * Posts data to: /api/auth/login
 *
 * Dispatches an action with payload: { token, user }.
 */
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
      type: REQUEST_ERROR,
      payload: error.response.data,
    });
  }
};

/**
 * Posts data to: /api/auth/password/reset
 *
 * Dispatches an action with payload: { message: 'Password has been updated.' }.
 */
export const passwordResetRequest = (email) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/password/reset', { email });
    console.log('passwordResetRequest', response.data);

    // response.data = { message: 'Password has been updated.' }
    dispatch({ type: PASSWORD_RESET_REQUEST, payload: response.data });

    history.push('/login');
  } catch (error) {
    console.log('ERROR:', error.response.data);

    dispatch({
      type: REQUEST_ERROR,
      payload: error.response.data,
    });
  }
};

/**
 * Posts data to: /api/auth/password/reset/new
 *
 * Dispatches an action with payload: { message: 'Password has been updated.' }.
 */
export const resetPassword = (newPassword) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/password/reset/new', {
      newPassword,
    });
    console.log('resetPassword', response.data);

    // response.data = { message: 'Password has been updated.' }
    dispatch({
      type: PASSWORD_RESET_REQUEST_SUCCESS,
      payload: response.data,
    });

    history.push('/login');
  } catch (error) {
    console.log('ERROR:', error.response.data);

    dispatch({
      type: REQUEST_ERROR,
      payload: error.response.data,
    });
  }
};

/**
 * Posts data to: /api/auth/verify
 *
 * Dispatches an action with payload: { message: 'A verification email has been sent to {email}' }.
 */
export const resendVerificationEmail = (email) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/verify', { email });
    console.log('resendVerificationEmail', response.data);

    // response.data = { message: `A verification email has been sent to ${user.email}` }
    dispatch({
      type: RESEND_VERIFICATION_EMAIL,
      payload: response.data,
    });
  } catch (error) {
    console.log('ERROR:', error.response.data);

    dispatch({
      type: REQUEST_ERROR,
      payload: error.response.data,
    });
  }
};

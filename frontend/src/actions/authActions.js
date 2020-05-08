import axios from 'axios';

import {
  SIGN_UP_WITH_EMAIL,
  SIGN_UP_WITH_EMAIL_ERROR,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_ERROR,
  PASSWORD_RESET_REQUEST,
} from './types';

import history from '../history';

export const signUpWithEmail = (formValues) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/signup', formValues);
    dispatch({ type: SIGN_UP_WITH_EMAIL, payload: response.data });
    history.push('/login');
  } catch (error) {
    console.log(error.response);

    if (error.response.data.error.code === 409) {
      dispatch({
        type: SIGN_UP_WITH_EMAIL_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

export const loginWithEmail = (formValues) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', formValues);
    console.log(response.data);
    dispatch({ type: LOGIN_WITH_EMAIL, payload: response.data });
    history.push('/');
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: LOGIN_WITH_EMAIL_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const passwordResetRequest = (email) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/password/reset', email);
    console.log(response.data);
    dispatch({ type: PASSWORD_RESET_REQUEST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

import axios from 'axios';

import { SIGN_UP_WITH_EMAIL, SIGN_UP_WITH_EMAIL_ERROR } from './types';

export const signUpWithEmail = (formValues) => async (dispatch) => {
  try {
    const response = await axios.post('/auth/signup', formValues);
    dispatch({ type: SIGN_UP_WITH_EMAIL, payload: response.data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: SIGN_UP_WITH_EMAIL_ERROR,
      payload: error.response.data.error,
    });
  }
};

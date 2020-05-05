import axios from 'axios';

import { SIGN_UP_WITH_EMAIL, SIGN_UP_WITH_EMAIL_ERROR } from './types';

export const signUpWithEmail = (formValues) => async (dispatch) => {
  try {
    const response = await axios.post('/auth/signup', formValues);
    dispatch({ type: SIGN_UP_WITH_EMAIL, payload: response.data });
  } catch (error) {
    // console.log(error);
    // console.log(error.message);
    // console.log(error.request);
    console.log(error.response.data);
    // console.log(error.toJSON());
    // console.log(Object.getOwnPropertyNames(error));
    // console.log(response);
    dispatch({ type: SIGN_UP_WITH_EMAIL_ERROR, payload: error.response.data });
  }
};

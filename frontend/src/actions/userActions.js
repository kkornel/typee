import axios from 'axios';

export const testauth = () => async (dispatch, getState) => {
  try {
    const AuthStr = 'Bearer '.concat(getState().auth.token);
    const response = await axios.get('/api/testauth', {
      headers: { Authorization: AuthStr },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

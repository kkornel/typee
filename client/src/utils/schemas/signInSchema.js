import * as yup from 'yup';

const signInSchema = yup.object().shape({
  email: yup.string().required('This field is required').email('Invalid email'),
  password: yup.string().required('This field is required'),
});

export default signInSchema;

import * as yup from 'yup';

const signInSchema = yup.object().shape({
  email: yup.string().required('Required.').email('Invalid email.'),
  password: yup.string().required('Required.'),
});

export default signInSchema;

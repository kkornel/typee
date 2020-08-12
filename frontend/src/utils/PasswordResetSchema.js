import * as yup from 'yup';

const PasswordResetSchema = yup.object().shape({
  email: yup.string().required('Required.').email('Invalid email.'),
});

export default PasswordResetSchema;

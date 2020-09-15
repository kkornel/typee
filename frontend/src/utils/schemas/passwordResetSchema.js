import * as yup from 'yup';

const passwordResetSchema = yup.object().shape({
  email: yup.string().required('Required.').email('Invalid email.'),
});

export default passwordResetSchema;

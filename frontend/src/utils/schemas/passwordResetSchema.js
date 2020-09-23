import * as yup from 'yup';

const passwordResetSchema = yup.object().shape({
  email: yup.string().required('This field is required').email('Invalid email'),
});

export default passwordResetSchema;

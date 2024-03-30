import * as yup from 'yup';

const validationSignInSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Email not valid')
    .required("Email can't be empty"),
  password: yup
    .string()
    .label('password')
    .required("Password can't be empty")
    .min(2, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
});

export default validationSignInSchema;

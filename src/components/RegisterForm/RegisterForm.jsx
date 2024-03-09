// RegisterForm.jsx
import { useDispatch } from 'react-redux';
import css from './RegisterForm.module.css';
import { register } from '../../redux/authRedux/operations';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

// Оголосіть константи для ідентифікаторів
const NAME_FIELD_ID = 'nameInput';
const EMAIL_FIELD_ID = 'emailInput';
const PASSWORD_FIELD_ID = 'passwordInput';

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must not exceed 50 characters')
    .required('This is a required field'),
  email: Yup.string().required('This is a required field'),
  password: Yup.string()
    .min(8, 'Too short')
    .max(50, 'Too long')
    .required('This is a required field'),
});

const RegisterForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={userSchema}
      onSubmit={async (values, actions) => {
        try {
          const response = await dispatch(register({ ...values }));
          console.log('Registration Successful:', response);
        } catch (error) {
          console.error('Registration Error:', error);
        } finally {
          actions.resetForm();
        }
      }}
    >
      {() => (
        <div className={css.containerForm}>
          <Form className={css.registerform} autoComplete="off">
            <div className={css.contactFormGroup}>
              <label htmlFor="name" className={css.labelForm}>
                Username
              </label>
              <Field className={css.inputField} type="text" name="name" id={NAME_FIELD_ID} />
              <ErrorMessage className={css.error} name="name" component="span" />
            </div>
            <div className={css.contactFormGroup}>
              <label htmlFor="email" className={css.labelForm}>
                Email
              </label>
              <Field className={css.inputField} type="email" name="email" id={EMAIL_FIELD_ID} />
              <ErrorMessage className={css.error} name="email" component="span" />
            </div>
            <div className={css.contactFormGroup}>
              <label htmlFor="password" className={css.labelForm}>
                Password
              </label>
              <Field
                className={css.inputField}
                type="password"
                name="password"
                id={PASSWORD_FIELD_ID}
              />
              <ErrorMessage className={css.error} name="password" component="span" />
            </div>
            <button type="submit">Register</button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;

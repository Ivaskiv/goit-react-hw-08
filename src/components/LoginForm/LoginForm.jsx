import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/authRedux/operations';
import css from './LoginForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('This is a required field'),
  password: Yup.string().required('This is a required field'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log('login success');
      })
      .catch(() => {
        console.log('login error');
      });

    actions.resetForm();
  };
  return (
    <div className={css.containerForm}>
      <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
        <Form className={css.loginForm} autoComplete="off">
          <div className={css.contactFormGroup}>
            <label htmlFor="email">Email</label>
            <Field className={css.inputField} type="email" name="email" />
            <ErrorMessage className={css.error} name="email" component="span" />
          </div>

          <div className={css.contactFormGroup}>
            <label htmlFor="password">Password</label>
            <Field className={css.inputField} type="password" name="password" />
            <ErrorMessage className={css.error} name="password" component="span" />
          </div>
          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </div>
  );
};

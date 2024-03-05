// RegisterForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './RegisterForm.module.css';
import { register } from '../../redux/authRedux/operations';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(formData));
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label className={css.label}>
        Email
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;

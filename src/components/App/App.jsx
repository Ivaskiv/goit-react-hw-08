import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contactsRedux/operations';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ContactForm from '../ContactForm/ContactForm';
import Layout from '../Layout';
import HomePage from '../../pages/HomePage';
import RestrictedRoute from '../RestrictedRoute';
import PrivateRoute from '../PrivateRoute';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import RegisterPage from '../../pages/RegisterPage';
import LoginPage from '../../pages/LoginPage';
import ContactsPage from '../../pages/ContactsPage';
import { selectVisibleContacts } from '../../redux/contactsRedux/selectors';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const visibleContacts = useSelector(selectVisibleContacts);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />}
        />
      </Routes>
      <h1>Phonebook</h1>
      <ContactForm />
      <p className="searchText">Find contacts by name</p>
      <SearchBox />
      {visibleContacts.length !== 0 ? (
        <ContactList contacts={visibleContacts} />
      ) : (
        <p className="searchText">There are no contacts in your phonebook!</p>
      )}
    </div>
  );
};

export default App;

/* В контексті бібліотеки React та її розширення React Router, Switch - це компонент, який використовується для рендерингу тільки одного дочірнього Route за раз. Основна його роль полягає в тому, щоб вибрати перший Route, який відповідає поточному шляху (URL), і проігнорувати всі інші. */
/* Компонент PrivateRoute - це власна обгортка навколо Route з бібліотеки react-router-dom, яка дозволяє перенаправляти користувача на сторінку логіну, якщо він не авторизований. */

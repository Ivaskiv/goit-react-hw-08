import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import { fetchContacts } from '../../redux/contactsRedux/operations';
import { Layout } from '../Layout';
import './App.css';
import { PrivateRoute } from '../PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute';
import { SearchBox } from '../SearchBox/SearchBox';
import { ContactList } from '../ContactList/ContactList';
import { selectVisibleContacts } from '../../redux/contactsRedux/selectors';
import { useAuth } from '../../hooks/useAuth';
import { refreshUser } from '../../redux/authRedux/operations';
import { Toaster } from 'react-hot-toast';
import { ContactForm } from '../ContactForm/ContactForm.jsx';

const HomePage = lazy(() => import('../../pages/HomePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  const visibleContacts = useSelector(selectVisibleContacts);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          }
        />
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
      <Toaster />
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

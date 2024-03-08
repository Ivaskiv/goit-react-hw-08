import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SearchBox } from '../SearchBox/SearchBox';
import { ContactList } from '../ContactList/ContactList';
import { selectVisibleContacts } from '../../redux/contactsRedux/selectors';
import { useAuth } from '../../hooks/useAuth';
import { refreshUser } from '../../redux/authRedux/operations';
import { Toaster } from 'react-hot-toast';
import { ContactForm } from '../ContactForm/ContactForm';
import { Layout } from '../Layout';
import RestrictedRoute from '../RestrictedRoute';

const HomePage = lazy(() => import('../../pages/HomePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage'));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route
          index
          element={
            // <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
            // </Suspense>
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

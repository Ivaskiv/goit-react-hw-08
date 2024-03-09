import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from '../../components/PrivateRoute';
import { useAuth } from '../../hooks/useAuth';
import { refreshUser } from '../../redux/authRedux/operations';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../Layout';
import { selectVisibleContacts } from '../../redux/contactsRedux/selectors';
import RestrictedRoute from '../RestrictedRoute';

const HomePage = lazy(() => import('../../pages/HomePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  //===========
  // const token = useSelector(state => state.auth.token);
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  //===============
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            path="/home"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={<RestrictedRoute redirectTo="/contacts" element={<RegisterPage />} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute redirectTo="/contacts" element={<LoginPage />} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute redirectTo="/login" element={<ContactsPage />} />}
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;

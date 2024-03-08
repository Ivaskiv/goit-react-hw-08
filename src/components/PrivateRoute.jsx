import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ element: Element, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return <Route element={shouldRedirect ? <Navigate to={redirectTo} /> : <Element />} />;
};

export default PrivateRoute;

// PrivateRoute використовує useAuth() для перевірки авторизації користувача. Якщо користувач авторизований, PrivateRoute рендерить переданий компонент. Якщо користувач не авторизований, він перенаправляється на сторінку логіну (/login).

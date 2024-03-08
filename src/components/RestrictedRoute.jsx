import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RestrictedRoute = ({ element: Element, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();

  return <Route element={isLoggedIn ? <Navigate to={redirectTo} /> : <Element />} />;
};

export default RestrictedRoute;

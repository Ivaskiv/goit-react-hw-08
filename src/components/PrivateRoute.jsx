// PrivateRoute використовує useAuth() для перевірки авторизації користувача. Якщо користувач авторизований, PrivateRoute рендерить переданий компонент. Якщо користувач не авторизований, він перенаправляється на сторінку логіну (/login).

import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  // Кастомний хук useAuth() - повертає інформацію про авторизацію користувача
  const { isLoggedIn } = useAuth();
  // Повертаємо компонент Route з переданими пропсами (rest), а також визначаємо його рендеринг
  // Умова isLoggedIn && <Component {...props} /> означає, що компонент буде відображений тільки,якщо користувач авторизований (isLoggedIn === true)
  return (
    <Route
      {...rest}
      render={props => (isLoggedIn ? <Component {...props} /> : <Navigate to="/login" />)}
    />
  );
};

export default PrivateRoute;

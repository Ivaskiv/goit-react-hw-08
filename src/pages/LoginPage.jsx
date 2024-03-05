import { LoginForm } from '../components/LoginForm/LoginForm';
import DocumentTitle from '../components/DocumentTitle';

export const LoginPage = () => {
  return (
    <div>
      <DocumentTitle>Login</DocumentTitle>
      <LoginForm />
    </div>
  );
};
export default LoginPage;

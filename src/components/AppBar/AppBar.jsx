//appBar
import css from './AppBar.module.css';
import { AuthNav } from '../AuthNav/AuthNav';
import { useAuth } from '../../hooks';
import { Navigation } from '../Navigation/Navigation';
import { UserMenu } from '../userMenu/UserMenu';

export const AppBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

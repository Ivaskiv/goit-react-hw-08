//appBar
import css from './AppBar.module.css';
import { UserMenu } from '../userMenu/UserMenu';
import { AuthNav } from '../AuthNav/AuthNav';
import { Navigation } from '../Navigation/Navigation';
import { useAuth } from '../../hooks/useAuth';

export const AppBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header className={css.header}>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to phone Book</h1>
      </div>
    </>
  );
};

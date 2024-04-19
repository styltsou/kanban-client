import { Outlet } from '@tanstack/react-router';
import classes from './index.module.scss';
import { Navigation } from './Navigation';

export const MainLayout = () => {
  const user: string | null = null;

  return (
    <div className={classes.AppWrapper}>
      {user && <Navigation />}
      <main className={classes.Main}>
        <Outlet />
      </main>
    </div>
  );
};

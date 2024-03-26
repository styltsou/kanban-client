import { Outlet } from '@tanstack/react-router';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import classes from './index.module.scss';

export const WorkspaceLayout: React.FC = () => {
  return (
    <div className={classes.AppShellGrid}>
      <Sidebar />
      <div className={classes.MainWrapper}>
        <Navbar />
        <main className={classes.ContentWrapper}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

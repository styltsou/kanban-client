import { Outlet } from '@tanstack/react-router';
import { Sidebar } from './Sidebar';
import classes from './index.module.scss';

export const WorkspaceLayout: React.FC = () => {
  return (
    <div className={classes.WorkspaceWrapper}>
      <aside className={classes.SidebarWrapper}>
        <Sidebar />
      </aside>
      <div className={classes.MainContentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

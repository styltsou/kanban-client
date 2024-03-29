import { Outlet } from '@tanstack/react-router';
import classes from './index.module.scss';
import { cn } from '@/utils/cn';
import { Sidebar } from './Sidebar';
import { useSidebar } from '@/contexts/SideBarContext';
import { ChevronRightIcon } from '@radix-ui/react-icons';

export const WorkspaceLayout: React.FC = () => {
  const { isOpen, openSidebar } = useSidebar();

  return (
    <div className={classes.WorkspaceWrapper}>
      <div
        className={cn(
          classes.SidebarOpenButtonWrapper,
          !isOpen && classes.collapsed,
        )}
      >
        <button onClick={openSidebar}>
          <ChevronRightIcon />
        </button>
      </div>
      <aside className={classes.SidebarWrapper}>
        <Sidebar />
      </aside>
      <div
        className={cn(classes.MainContentWrapper, !isOpen && classes.collapsed)}
      >
        <Outlet />
      </div>
    </div>
  );
};

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import classes from './index.module.scss';
import { useKeybinding } from '@/hooks/useKeybinding';

export const Sidebar: React.FC = () => {
  useKeybinding(']', () => {
    console.log('toggle sidebar');
  });

  return (
    <aside className={classes.Wrapper}>
      <div className={classes.WorkspaceIndicator}>
        <div className={classes.WorkspaceInfo}>
          <div className={classes.WorkspaceBadge}>H</div>
          Hackney
        </div>
        <button className={classes.CloseSidebarButton}>
          <ChevronLeftIcon />
        </button>
      </div>
    </aside>
  );
};

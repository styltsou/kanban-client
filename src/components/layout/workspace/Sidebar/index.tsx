import { useRef } from 'react';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import classes from './index.module.scss';
import { cn } from '@/utils/cn';
import { useSidebar } from '@/contexts/SideBarContext';
import { useKeybinding } from '@/hooks/useKeybinding';

export const Sidebar: React.FC = () => {
  const collapseButtonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, toggleSidebar, closeSidebar, openSidebar } = useSidebar();

  useKeybinding('[', () => {
    if (collapseButtonRef.current) collapseButtonRef.current.focus();
    toggleSidebar();
  });

  useKeybinding('Escape', () => {
    if (
      collapseButtonRef.current &&
      collapseButtonRef.current === document.activeElement
    )
      collapseButtonRef.current.blur();
  });

  return (
    <div className={cn(classes.Wrapper, !isOpen && classes.collapsed)}>
      {isOpen ? (
        <>
          <div className={classes.WorkspaceIndicator}>
            <div className={classes.WorkspaceInfo}>
              <div className={classes.WorkspaceBadge}>A</div>
              Arouria
            </div>
            <button
              ref={collapseButtonRef}
              className={classes.CloseSidebarButton}
              onClick={closeSidebar}
            >
              <ChevronLeftIcon />
            </button>
          </div>
        </>
      ) : (
        <div
          className={classes.CollapsedSidebarPortion}
          onClick={openSidebar}
        />
      )}
    </div>
  );
};

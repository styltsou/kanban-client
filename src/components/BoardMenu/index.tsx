import classes from './index.module.scss';
import { useBoardMenu } from '@/contexts/BoardMenuContext';
import { cn } from '@/utils/cn';
import { Cross1Icon, ChevronLeftIcon } from '@radix-ui/react-icons';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BoardMenu: React.FC<{ boardId: string }> = ({ boardId }) => {
  const { isOpen, closeBoardMenu } = useBoardMenu();

  const currentSegment: string = 'Menu';

  return (
    <aside className={classes.MenuContainer} data-isOpen={isOpen}>
      <div className={classes.MenuHeader}>
        {currentSegment !== 'Menu' ? (
          <button className={cn(classes.IconButton, classes.BackButton)}>
            <ChevronLeftIcon />
          </button>
        ) : (
          <div />
        )}
        <h4 className={classes.Title}>{currentSegment}</h4>
        <button
          className={cn(classes.IconButton, classes.CloseButton)}
          onClick={closeBoardMenu}
        >
          <Cross1Icon />
        </button>
      </div>
      <div className={classes.Divider} />
    </aside>
  );
};

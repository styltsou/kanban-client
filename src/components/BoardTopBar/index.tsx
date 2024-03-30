import classes from './index.module.scss';
import { cn } from '@/utils/cn';
import { BoardNameForm } from './BoardNameForm';

export const BoardTopBar: React.FC<{
  boardId: string;
  boardName: string;
  isDark: boolean;
}> = ({ boardId, boardName, isDark }) => {
  return (
    <header className={cn(classes.Wrapper, isDark && classes.dark)}>
      <div className={classes.HeightContainer}>
        <BoardNameForm boardId={boardId} boardName={boardName} />
        <div className={classes.RightSection}>share</div>
      </div>
    </header>
  );
};

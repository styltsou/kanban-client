import classes from './index.module.scss';
import { cn } from '@/utils/cn';

export const BoardTopBar: React.FC<{
  boardId: string;
  boardName: string;
  isDark: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ boardId, boardName, isDark }) => {
  return (
    <header className={cn(classes.Wrapper, isDark && classes.dark)}>
      {boardName}
    </header>
  );
};

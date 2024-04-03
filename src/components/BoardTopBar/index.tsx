import classes from './index.module.scss';
import { cn } from '@/utils/cn';
import { BoardNameForm } from './BoardNameForm';
import { DotsHorizontalIcon, Share1Icon } from '@radix-ui/react-icons';
import { useBoardMenu } from '@/contexts/BoardMenuContext';
import { ShareBoardModal } from '@/components/ShareBoardModal';

export const BoardTopBar: React.FC<{
  boardId: string;
  boardName: string;
  isDark: boolean;
}> = ({ boardId, boardName, isDark }) => {
  const { isOpen, openBoardMenu } = useBoardMenu();

  const users = [
    {
      initials: 'ST',
      color: 'orangered',
    },
  ];

  return (
    <header className={cn(classes.Wrapper, isDark && classes.dark)}>
      <div className={classes.HeightContainer}>
        <BoardNameForm boardId={boardId} boardName={boardName} />
        <div className={classes.RightSection}>
          <div className={classes.Divider} />
          <div className={classes.UserIconsContainer}>
            {users?.map(user => (
              <span
                key={user.initials}
                className={classes.UserIcon}
                style={{
                  backgroundColor: user.color,
                }}
              >
                {user.initials}
              </span>
            ))}
          </div>
          <ShareBoardModal>
            <button className={classes.ShareButton}>
              <Share1Icon />
              Share
            </button>
          </ShareBoardModal>
          {!isOpen && (
            <button className={classes.BoardMenuButton} onClick={openBoardMenu}>
              <DotsHorizontalIcon />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

import classes from './index.module.scss';

export const BoardTopBar: React.FC<{
  boardId: string;
  boardName: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ boardId, boardName }) => {
  return <header className={classes.Wrapper}>{boardName}</header>;
};

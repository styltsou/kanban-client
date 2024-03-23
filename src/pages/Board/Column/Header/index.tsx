import { useState } from 'react';
import classes from './index.module.scss';
import { ActionsMenu } from '../ActionsMenu';

export const Header: React.FC<{
  columnId: string;
  children: string;
}> = ({ columnId, children }) => {
  const [title, setTitle] = useState<string>(children);
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Update title of column with id', columnId);
    setIsTitleEditing(false);
  };

  return (
    <div className={classes.Wrapper}>
      {isTitleEditing ? (
        <form className={classes.TitleForm} onSubmit={handleTitleSubmit}>
          <input
            type="text"
            autoFocus
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setIsTitleEditing(false)}
          />
        </form>
      ) : (
        <div className={classes.Title} onClick={() => setIsTitleEditing(true)}>
          {title}
        </div>
      )}
      <ActionsMenu />
    </div>
  );
};

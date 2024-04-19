import { useState } from 'react';
import classes from './index.module.scss';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
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
    if (title === '') return;
    console.log('Update title of column with id', columnId);
    setIsTitleEditing(false);
  };

  return (
    <div className={classes.ColumnTitleWrapper}>
      {!isTitleEditing ? (
        <h2
          className={classes.Title}
          onClick={() => {
            setIsTitleEditing(true);
          }}
        >
          {title}
        </h2>
      ) : (
        <form className={classes.TitleForm} onSubmit={handleTitleSubmit}>
          <input
            type="text"
            autoFocus
            onFocus={e => e.target.select()}
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setIsTitleEditing(false)}
          />
        </form>
      )}
      <ActionsMenu>
        <button className={classes.IconButton} aria-label="Column Actions">
          <DotsHorizontalIcon />
        </button>
      </ActionsMenu>
    </div>
  );
};

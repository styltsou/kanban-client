import { useRef, useState } from 'react';
import classes from './index.module.scss';
import { AutoResizeInput } from '@/components/ui/AutoResizeInput';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useKeybinding } from '@/hooks/useKeybinding';

export const BoardNameForm: React.FC<{
  boardId: string;
  boardName: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ boardId, boardName }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const [newBoardName, setNewBoardName] = useState<string>(boardName);

  const closeForm = () => {
    // This first call might be redundant
    setNewBoardName(boardName);
    setIsFormActive(false);
  };

  const handleChangeBoardName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newBoardName === '') return;

    if (newBoardName !== boardName) {
      // Reset the name just for now
      setNewBoardName(boardName);
      setIsFormActive(false);
    }
  };

  useOnClickOutside(formRef, closeForm);
  useKeybinding('Escape', closeForm);

  return (
    <div className={classes.Wrapper}>
      {!isFormActive ? (
        <button
          className={classes.BoardNameButton}
          onClick={() => setIsFormActive(true)}
        >
          {boardName}
        </button>
      ) : (
        <form
          ref={formRef}
          className={classes.BoardNameForm}
          onSubmit={handleChangeBoardName}
        >
          <AutoResizeInput
            className={classes.Input}
            autoFocus={true}
            autoSelect={true}
            type="text"
            value={newBoardName}
            onChange={e => setNewBoardName(e.target.value)}
          />
        </form>
      )}
    </div>
  );
};

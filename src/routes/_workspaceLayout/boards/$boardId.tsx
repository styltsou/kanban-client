import { useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import classes from './index.module.scss';
import { Column } from '@/components/Column';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/Buttons';
import { CardModal } from '@/components/CardModal';
import { useKeybinding } from '@/hooks/useKeybinding';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const cards = [
  {
    id: 'item1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'item2',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'item3',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'item4',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 'item5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'item6',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'item7',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'item8',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 'item9',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'item10',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'item11',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'item12',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 'item13',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'item14',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'item15',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'item16',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 'item17',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'item18',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'item19',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'item20',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const searchParamsSchema = z.object({
  cardId: z.string().optional(),
});

export const Route = createFileRoute('/_workspaceLayout/boards/$boardId')({
  component: Board,
  validateSearch: searchParamsSchema,
});

function Board(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);

  const [columns, setColumns] = useState([
    {
      title: 'Backlog',
      cards: cards.slice(0, 8),
    },
    {
      title: 'To Do',
      cards: cards.slice(0, 4),
    },
    {
      title: 'In Progress',
      cards: cards.slice(0, 6),
    },
  ]);

  const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>('');

  const handleAddColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setColumns(prev => [
      ...prev,
      {
        title: columnTitle,
        cards: [],
      },
    ]);

    setIsAddingColumn(false);
  };

  // const handleTextreaKeyDown = (
  //   e: React.KeyboardEvent<HTMLTextAreaElement>,
  // ) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     return false;
  //     // console.log('prevent default');
  //     // e.currentTarget?.form?.dispatchEvent(
  //     //   new Event('submit', { cancelable: true }),
  //     // );
  //   }
  // };

  useOnClickOutside(formRef, () => setIsAddingColumn(false));

  useKeybinding('Escape', () => setIsAddingColumn(false));

  return (
    <>
      <div className={classes.MainWrapper}>
        {columns.map(column => (
          <Column
            key={column.title}
            title={column.title}
            cards={column.cards}
          />
        ))}
        {isAddingColumn ? (
          <form
            ref={formRef}
            className={classes.AddColumnForm}
            onSubmit={handleAddColumn}
          >
            <input
              autoFocus={true}
              placeholder="Enter list name"
              value={columnTitle}
              onChange={e => setColumnTitle(e.target.value)}
            />
            <div className={classes.AddColumnFormButtonsWrapper}>
              <Button type="submit">Add list</Button>
              <button>
                <Cross1Icon />
              </button>
            </div>
          </form>
        ) : (
          <button
            className={classes.AddColumnButton}
            onClick={() => setIsAddingColumn(true)}
          >
            <span>
              <PlusIcon />
            </span>
            Add another list
          </button>
        )}
      </div>
      <CardModal />
    </>
  );
}

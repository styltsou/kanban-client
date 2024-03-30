import { useRef, useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { z } from 'zod';

import classes from './index.module.scss';
import { BoardTopBar } from '@/components/BoardTopBar';
import { BoardBackground } from '@/components/BoardBackground';
import { Column } from '@/components/Column';
import { Button } from '@/components/ui/Button';
import { CardModal } from '@/components/CardModal';
import { useKeybinding } from '@/hooks/useKeybinding';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useDragScroll } from '@/hooks/useDragScroll';

// ! WIP: STILL need to figure out the pattern that determines the isDark value. Does it take into account the theme too?
// ! Test in actuall Trello with that color below to see the behavior.
const background = {
  isDark: true,
  isSolid: true,
  color: '#5356FF',
  imageUrl:
    'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

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

const mockCols = [
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
    cards: cards.slice(0, 12),
  },
  {
    title: 'In Progress1',
    cards: cards.slice(0, 6),
  },
  {
    title: 'In Progress8',
    cards: cards.slice(0, 6),
  },
  {
    title: 'In Progress2',
    cards: cards.slice(0, 6),
  },
  {
    title: 'In Progress3',
    cards: cards.slice(0, 6),
  },
  // {
  //   title: 'In Progress4',
  //   cards: cards.slice(0, 6),
  // },
  // {
  //   title: 'In Progress5',
  //   cards: cards.slice(0, 6),
  // },
  // {
  //   title: 'In Progress6',
  //   cards: cards.slice(0, 6),
  // },
  // {
  //   title: 'In Progress7',
  //   cards: cards.slice(0, 6),
  // },
];

const searchParamsSchema = z.object({
  cardId: z.string().optional(),
});

export const Route = createFileRoute('/_workspaceLayout/boards/$boardId')({
  component: Board,
  validateSearch: searchParamsSchema,
});

function Board(): JSX.Element {
  const columnFormRef = useRef<HTMLFormElement>(null);
  const scrollContainerRef = useDragScroll<HTMLDivElement>();

  const [columns, setColumns] = useState(mockCols);

  const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>('');

  /**
    // TODO: I could keep this but only if i find a way to
    // TODO: avoid scrolling when the mouse is on scrollable columns
  **/
  // const handleBoardContainerScroll = (e: React.WheelEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  //   scrollContainerRef.current?.scrollBy({
  //     top: 0,
  //     left: 0.7 * e.deltaY,
  //   });
  // };

  const handleAddColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (columnTitle == '') return;

    setColumns(prev => [
      ...prev,
      {
        title: columnTitle,
        cards: [],
      },
    ]);

    setColumnTitle('');
  };

  // Keep the addColumn form into view and focused
  useEffect(() => {
    if (columnFormRef.current) {
      columnFormRef.current.scrollIntoView({
        block: 'end',
      });

      const colFormInput = columnFormRef.current.querySelector('input');
      if (document.activeElement !== colFormInput) colFormInput?.focus();
    }
  }, [isAddingColumn, columns.length]);

  useOnClickOutside(columnFormRef, () => setIsAddingColumn(false));
  useKeybinding('Escape', () => setIsAddingColumn(false));

  return (
    <div className={classes.Wrapper}>
      <BoardBackground
        isSolid={background.isSolid}
        color={background.color}
        backgroundUrl={background.imageUrl}
      />
      <BoardTopBar
        boardId="board32"
        boardName="Headless Commerce"
        isDark={background.isDark}
      />
      <div ref={scrollContainerRef} className={classes.BoardScrollContainer}>
        {columns.map(column => (
          <Column
            key={column.title}
            title={column.title}
            cards={column.cards}
          />
        ))}
        {isAddingColumn ? (
          <form
            ref={columnFormRef}
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
              <button onClick={() => setIsAddingColumn(false)}>
                <Cross1Icon />
              </button>
            </div>
          </form>
        ) : (
          <button
            className={classes.AddColumnButton}
            onClick={() => setIsAddingColumn(true)}
          >
            <PlusIcon />
            <span>Add another list</span>
          </button>
        )}
      </div>
      <CardModal />
    </div>
  );
}

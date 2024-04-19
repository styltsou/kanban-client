import { useRef, useState, useEffect, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { LexoRank } from 'lexorank';
import { Portal } from '@radix-ui/react-portal';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { z } from 'zod';

import classes from './index.module.scss';
import { useBoardStore } from '@/store/boardStore';
import { List as ListType } from '@/types';
import { BoardTopBar } from '@/components/BoardTopBar';
import { BoardBackground } from '@/components/BoardBackground';
import { List, SortableList } from '@/components/Column';
import { Button } from '@/components/ui/Button';
import { CardModal } from '@/components/CardModal';
import { useKeybinding } from '@/hooks/useKeybinding';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useDragScroll } from '@/hooks/useDragScroll';
import { BoardMenu } from '@/components/BoardMenu';
import { useBoardMenu } from '@/contexts/BoardMenuContext';

const board = {
  background: {
    isDark: true,
    isSolid: false,
    color: '#5356FF',
    imageUrl:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
};

const searchParamsSchema = z.object({
  cardId: z.string().optional(),
});

export const Route = createFileRoute('/_workspaceLayout/boards/$boardId')({
  component: Board,
  validateSearch: searchParamsSchema,
});

function Board(): JSX.Element {
  const { boardId } = Route.useParams();

  const { isOpen } = useBoardMenu();

  const columnFormRef = useRef<HTMLFormElement>(null);

  const lists = useBoardStore(s => s.lists);
  const setLists = useBoardStore(s => s.setLists);
  const addList = useBoardStore(s => s.addList);

  const listIds = useMemo(() => lists.map(list => list.id), [lists]);

  const [activeListId, setActiveListId] = useState<UniqueIdentifier | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);
  const [listName, setListName] = useState<string>('');

  // *Card sorting is handled elsewhere using dndMonitor
  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    if (active.data.current?.type === 'List') {
      setActiveListId(active.id);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.data.current?.type === 'List') {
      if (active.id !== over?.id) {
        const oldIndex = lists.findIndex(
          item => item.id == active.id.toString(),
        );

        const newIndex = lists.findIndex(
          item => item.id == over?.id.toString(),
        );

        let sortedLists = arrayMove(lists, oldIndex, newIndex);

        // Find the new rank of the list
        // adjacent lists
        const leftList = newIndex > 0 ? sortedLists[newIndex - 1] : undefined;
        const rightList =
          newIndex < lists.length - 1 ? sortedLists[newIndex + 1] : undefined;

        const leftLexoRank = leftList ? LexoRank.parse(leftList.rank) : null;
        const rightLexoRank = rightList ? LexoRank.parse(rightList.rank) : null;

        let newRank = '';
        if (!leftLexoRank && rightLexoRank)
          newRank = rightLexoRank.genPrev().toString();

        if (!rightLexoRank && leftLexoRank)
          newRank = leftLexoRank.genNext().toString();

        if (rightLexoRank && leftLexoRank)
          newRank = leftLexoRank.between(rightLexoRank).toString();

        sortedLists = sortedLists.map((list, idx) => {
          return idx === newIndex ? { ...list, rank: newRank } : list;
        });

        setLists(sortedLists);
      }

      setActiveListId(null);
    } else {
      // TODO: Handle card reordering here or elsewhere using a hook?
    }
  };

  const handleAddColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (listName == '') return;

    const list: ListType = {
      id: crypto.randomUUID(),
      name: listName,
      color: '',
      rank: '',
      cards: [],
    };

    if (lists.length === 0) {
      list.rank = LexoRank.middle().toString();
    } else {
      list.rank = LexoRank.parse(lists[lists.length - 1].rank)
        .genNext()
        .toString();
    }

    addList(list);

    setListName('');
  };

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

  // Keep the addColumn form into view and focused

  useEffect(() => {
    if (columnFormRef.current) {
      columnFormRef.current.scrollIntoView({
        block: 'end',
      });

      const colFormInput = columnFormRef.current.querySelector('input');
      if (document.activeElement !== colFormInput) colFormInput?.focus();
    }
  }, [isAddingColumn, lists.length]);

  const scrollContainerRef = useDragScroll<HTMLDivElement>(false);

  useOnClickOutside(columnFormRef, () => setIsAddingColumn(false));
  useKeybinding('Escape', () => setIsAddingColumn(false));

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={classes.Wrapper} data-open={isOpen}>
        <BoardBackground
          isSolid={board.background.isSolid}
          color={board.background.color}
          backgroundUrl={board.background.imageUrl}
        />
        <BoardTopBar
          boardId="board32"
          boardName="Headless Commerce"
          isDark={board.background.isDark}
        />
        <div ref={scrollContainerRef} className={classes.BoardScrollContainer}>
          <SortableContext
            items={listIds}
            strategy={horizontalListSortingStrategy}
          >
            {lists.map(column => (
              <SortableList key={column.id} list={column} />
            ))}
          </SortableContext>
          <Portal>
            <DragOverlay>
              {activeListId ? (
                <List list={lists.find(list => list.id === activeListId)!} />
              ) : null}
            </DragOverlay>
          </Portal>
          {isAddingColumn ? (
            <form
              ref={columnFormRef}
              className={classes.AddColumnForm}
              onSubmit={handleAddColumn}
            >
              <input
                autoFocus={true}
                placeholder="Enter list name"
                value={listName}
                onChange={e => setListName(e.target.value)}
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
              <span>
                <PlusIcon />
              </span>
              Add another list
            </button>
          )}
        </div>
      </div>
      <CardModal />
      <BoardMenu boardId={boardId} />
    </DndContext>
  );
}

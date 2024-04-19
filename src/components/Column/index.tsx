import {
  useRef,
  forwardRef,
  ForwardRefRenderFunction,
  Ref,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { DraggableAttributes, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { CSS } from '@dnd-kit/utilities';
import { useSortable, SortableContext } from '@dnd-kit/sortable';
import { PlusIcon, IdCardIcon } from '@radix-ui/react-icons';

import classes from './index.module.scss';
import { Card, SortableCard } from '@/components/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { CardForm } from '@/components/CardForm';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useKeybinding } from '@/hooks/useKeybinding';
import { Header } from './Header';
import { Portal } from '@radix-ui/react-portal';

import { List as ListType, Card as CardType } from '@/types';
import { useBoardStore } from '@/store/boardStore';

type ListProps = {
  list: ListType;
  style?: { transform: string | undefined; transition: string | undefined };
  isDragging?: boolean;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
};

const ListComponent: ForwardRefRenderFunction<HTMLDivElement, ListProps> = (
  { list, style, attributes, listeners, isDragging = false },
  ref: Ref<HTMLDivElement>,
) => {
  const cardFormRef = useRef<HTMLDivElement>(null);

  const addCard = useBoardStore(s => s.addCard);

  const activeCardId = useBoardStore(s => s.activeCardId);
  const setActiveCardId = useBoardStore(s => s.setActiveCardId);

  const cardIds = useMemo(() => list.cards.map(card => card.id), [list]);

  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);

  useDndMonitor({
    onDragStart(e) {
      const { active } = e;
      if (active.data.current?.type === 'Card') {
        setActiveCardId(active.id.toString());
      }
    },
    onDragOver(e) {
      if (e.active.data.current?.type === 'Card') {
        console.log('dragOver', e);
      }
    },
    onDragEnd(e) {
      if (e.active.data.current?.type === 'Card') {
        console.log('dragOver', e);
        setActiveCardId(null);
      }
    },
  });

  const handleAddNewCard = (value: string) => {
    const card: CardType = {
      id: crypto.randomUUID().toString(),
      title: value,
      rank: '',
    };

    console.log(card);

    addCard(list.id, card);

    console.log();
  };

  // Keep the form for adding cards into view and focused
  useEffect(() => {
    if (cardFormRef.current) {
      cardFormRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });

      const cardFormTextarea = cardFormRef.current.querySelector('textarea');
      if (document.activeElement !== cardFormTextarea)
        cardFormTextarea?.focus();
    }
  }, [isAddingCard, list]);

  useOnClickOutside(cardFormRef, () => {
    setIsAddingCard(false);
  });

  useKeybinding('Escape', () => {
    if (isAddingCard) setIsAddingCard(false);
  });

  return (
    <div
      ref={ref}
      style={{
        ...style,
        ...(list.color !== '' && { backgroundColor: list.color }),
      }}
      className={classes.Wrapper}
      data-dragging={isDragging}
    >
      <div {...attributes} {...listeners} style={{ width: '100%' }}>
        <Header columnId={list.id}>{list.name}</Header>
      </div>
      {(list.cards?.length !== 0 || isAddingCard) && (
        <div className={classes.CardsList}>
          <SortableContext items={cardIds}>
            {list.cards?.map(card => (
              <SortableCard key={card.id} card={card} />
            ))}
          </SortableContext>
          {/* <Portal>
            <DragOverlay>
              {activeCardId ? (
                <Card
                  card={list.cards.find(card => card.id === activeCardId)!}
                />
              ) : null}
            </DragOverlay>
          </Portal> */}
          {isAddingCard && (
            <div ref={cardFormRef} style={{ width: '100%' }}>
              <CardForm
                initialValue=""
                placeholder="Add a tittle for this card"
                onSubmit={handleAddNewCard}
                autoFocus={true}
                onClose={() => setIsAddingCard(false)}
                textareaHeight={60}
              />
            </div>
          )}
        </div>
      )}
      {!isAddingCard && (
        <div className={classes.AddCardButtonsWrapper}>
          <button
            className={classes.AddCard}
            onClick={() => setIsAddingCard(true)}
          >
            <span>
              <PlusIcon />
            </span>
            Add a card
          </button>
          <Tooltip label="Create from template..." side="bottom">
            <button className={classes.CardTemplate}>
              <IdCardIcon />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export const List = forwardRef(ListComponent);

export const SortableList: React.FC<ListProps> = ({ list }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: {
      type: 'List',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <List
      ref={setNodeRef}
      attributes={attributes}
      listeners={listeners}
      style={style}
      list={list}
      isDragging={isDragging}
    />
  );
};

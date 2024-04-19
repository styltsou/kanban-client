import {
  MouseEvent,
  forwardRef,
  ForwardRefRenderFunction,
  Ref,
  useState,
} from 'react';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil1Icon } from '@radix-ui/react-icons';
import * as Portal from '@radix-ui/react-portal';

import classes from './index.module.scss';
import { useKeybinding } from '@/hooks/useKeybinding';
import { CardForm } from '../CardForm';
import { OptionsMenu } from './OptionsMenu';
import { useNavigate } from '@tanstack/react-router';
import { Card as CardType } from '@/types';

const variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

type CardProps = {
  card: CardType;
  style?: { transform: string | undefined; transition: string | undefined };
  isDragging?: boolean;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
};

const CardComponent: ForwardRefRenderFunction<HTMLDivElement, CardProps> = (
  { card, style, attributes, listeners, isDragging = false },
  ref: Ref<HTMLDivElement>,
) => {
  const navigate = useNavigate();

  const [isEditMenuOpen, setIsEditMenuOpen] = useState<boolean>(false);

  const [cardPosition, setCardPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [cardSize, setCardSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const handleEditButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const cardElement = e.currentTarget.closest(`#${card.id}`);

    const x = cardElement?.getBoundingClientRect().left || 0;
    const y = cardElement?.getBoundingClientRect().top || 0;
    const width = cardElement?.getBoundingClientRect().width || 0;
    const height = cardElement?.getBoundingClientRect().height || 0;

    setCardPosition({ x, y });
    setCardSize({ width, height });

    setIsEditMenuOpen(true);
  };

  const handleCloseEditMenu = () => {
    setIsEditMenuOpen(false);
  };

  // NOTE: This loading state will be redundant when using tanstack
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  // * Mock the function for know
  const handleSaveEdit = (value: string) => {
    setIsSaveLoading(true);
    setTimeout(() => {
      console.log(value);
      setIsSaveLoading(false);
      setIsEditMenuOpen(false);
    }, 2000);
  };

  useKeybinding('Escape', handleCloseEditMenu);

  return (
    <>
      <div
        ref={ref}
        {...attributes}
        {...listeners}
        style={style}
        className={classes.CardContainer}
        data-dragging={isDragging}
        id={card.id}
        onClick={() =>
          navigate({
            search: {
              cardId: card.id,
            },
          })
        }
        onContextMenu={e => {
          e.preventDefault();
          handleEditButtonClick(e);
        }}
      >
        <p className={classes.Content}>{card.title}</p>
        <OptionsMenu
          cardId={card.id}
          open={isEditMenuOpen}
          onOpenChange={open => setIsEditMenuOpen(!open)}
        >
          <button
            className={classes.EditButton}
            onClick={handleEditButtonClick}
          >
            <Pencil1Icon />
          </button>
        </OptionsMenu>
      </div>
      <AnimatePresence>
        {isEditMenuOpen && (
          <Portal.Root>
            <div className={classes.EditWrapper}>
              <motion.div
                className={classes.Overlay}
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
                onClick={handleCloseEditMenu}
              />
              <motion.div
                className={classes.EditCardFormWrapper}
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
                style={{
                  transform: `translate(${cardPosition.x}px, ${cardPosition.y}px)`,
                }}
              >
                <CardForm
                  initialValue={card.title}
                  onSubmit={handleSaveEdit}
                  isLoading={isSaveLoading}
                  autoSelect={true}
                  textareaWidth={cardSize.width}
                  textareaHeight={cardSize.height}
                />
              </motion.div>
            </div>
          </Portal.Root>
        )}
      </AnimatePresence>
    </>
  );
};

export const Card = forwardRef(CardComponent);

export const SortableCard: React.FC<CardProps> = ({ card }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: 'Card',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      attributes={attributes}
      listeners={listeners}
      style={style}
      card={card}
      isDragging={isDragging}
    />
  );
};

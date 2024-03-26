import { MouseEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil1Icon } from '@radix-ui/react-icons';
import * as Portal from '@radix-ui/react-portal';
import classes from './index.module.scss';
import { useKeybinding } from '@/hooks/useKeybinding';
import { CardForm } from '../CardForm';
import { OptionsMenu } from './OptionsMenu';
import { Link } from '@tanstack/react-router';

const variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export const Card: React.FC<{ card: { id: string; description: string } }> = ({
  card,
}) => {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState<boolean>(false);

  const [cardPosition, setCardPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [cardSize, setCardSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSaveEdit = (value: string) => {
    setIsSaveLoading(true);
    setTimeout(() => {
      setIsSaveLoading(false);
      setIsEditMenuOpen(false);
    }, 2000);
  };

  useKeybinding('Escape', handleCloseEditMenu);

  return (
    <>
      <Link
        className={classes.CardContainer}
        id={card.id}
        search={{ cardId: card.id }}
      >
        <p className={classes.Content}>{card.description}</p>
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
      </Link>
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
                  initialValue={card.description}
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

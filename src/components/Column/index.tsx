import { useState, useRef } from 'react';
import classes from './index.module.scss';
import { PlusIcon, IdCardIcon } from '@radix-ui/react-icons';
import { Card } from '../Card';
import { Tooltip } from '../ui/Tooltip';
import { CardForm } from '../CardForm';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useKeybinding } from '../../hooks/useKeybinding';
import { Header } from './Header';

export const Column: React.FC<{
  title: string;
  cards: { id: string; description: string }[];
}> = ({ title, cards }) => {
  const cardFormRef = useRef(null);

  // *This is to be removed when data fetching is implemented
  const [stateCards, setStateCards] =
    useState<{ id: string; description: string }[]>(cards);

  const [isNewCardPending, setIsNewCardPending] = useState<boolean>(false);

  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);

  const handleAddNewCard = (value: string) => {
    setIsNewCardPending(true);
    console.log(value);

    setTimeout(() => {
      setStateCards(prev => [
        ...prev,
        { id: crypto.randomUUID().toString(), description: value },
      ]);
      setIsNewCardPending(false);
      setIsAddingCard(false);
    }, 500);
  };

  useOnClickOutside(cardFormRef, () => {
    setIsAddingCard(false);
  });

  useKeybinding('Escape', () => {
    if (isAddingCard) setIsAddingCard(false);
  });

  return (
    <div className={classes.Wrapper}>
      <Header columnId={title}>{title}</Header>
      <div className={classes.CardsList}>
        <>{stateCards?.map(card => <Card key={card.id} card={card} />)}</>
      </div>
      {!isAddingCard ? (
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
      ) : (
        <div ref={cardFormRef} style={{ width: '100%' }}>
          <CardForm
            initialValue=""
            placeholder="Add a tittle for this card"
            onSubmit={handleAddNewCard}
            isLoading={isNewCardPending}
            autoFocus={true}
            onClose={() => setIsAddingCard(false)}
            textareaHeight={60}
          />
        </div>
      )}
    </div>
  );
};

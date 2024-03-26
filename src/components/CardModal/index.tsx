import { getRouteApi, useNavigate } from '@tanstack/react-router';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import classes from './index.module.scss';

export const CardModal: React.FC = () => {
  const route = getRouteApi('/_workspaceLayout/boards/$boardId');
  const { cardId } = route.useSearch();

  const navigate = useNavigate();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      navigate({
        search: {},
      });
    }
  };

  return (
    <Dialog.Root open={cardId !== undefined} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.DialogOverlay} />
        <Dialog.Content className={classes.DialogContent}>
          <Dialog.Title className={classes.DialogTitle}>
            Card {cardId}
          </Dialog.Title>
          <Dialog.Description className={classes.DialogDescription}>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className={classes.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <div className={classes.MainContent}>This is the card modal</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

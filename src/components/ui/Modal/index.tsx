import classes from './index.module.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

type ModalProps = {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  content: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onOpenChange,
  content,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children && <Dialog.Trigger>{children}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className={classes.DialogOverlay} />
        <Dialog.Content className={classes.DialogContent}>
          <Dialog.Close asChild>
            <button className={classes.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <div className={classes.MainContent}>{content}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

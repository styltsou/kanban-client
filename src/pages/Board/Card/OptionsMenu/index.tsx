import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  EyeOpenIcon,
  BadgeIcon,
  CardStackIcon,
  StopwatchIcon,
  MoveIcon,
  CopyIcon,
  ArchiveIcon,
} from '@radix-ui/react-icons';
import classes from './index.module.scss';

export const OptionsMenu: React.FC<{
  cardId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ cardId, open, onOpenChange, children }) => {
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={classes.DropdownMenuContent}
          sideOffset={12}
          side="right"
        >
          <DropdownMenu.Item className={classes.DropDownMenuItem}>
            <EyeOpenIcon /> Open card
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropDownMenuItem}>
            <BadgeIcon /> Edit labels
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropDownMenuItem}>
            <CardStackIcon /> Change cover
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropDownMenuItem}>
            <StopwatchIcon /> Edit dates
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropDownMenuItem}>
            <MoveIcon /> Move
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropDownMenuItem}>
            <CopyIcon /> Copy
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropDownMenuItem}>
            <ArchiveIcon /> Archive
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

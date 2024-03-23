import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import classes from './index.module.scss';

export const ActionsMenu: React.FC = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={classes.IconButton} aria-label="Column Actions">
          <DotsHorizontalIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={classes.DropdownMenuContent}
          sideOffset={4}
          side="right"
          align="start"
        >
          <DropdownMenu.Item className={classes.DropdownMenuItem}>
            Add card
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropdownMenuItem}>
            Copy column
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropdownMenuItem}>
            Move column
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropdownMenuItem}>
            Watch
          </DropdownMenu.Item>

          <DropdownMenu.Separator className={classes.Seperator} />

          <DropdownMenu.Item className={classes.DropdownMenuItem}>
            Move all cards in this list
          </DropdownMenu.Item>
          <DropdownMenu.Item className={classes.DropdownMenuItem}>
            Archive all cards in this list
          </DropdownMenu.Item>

          <DropdownMenu.Separator className={classes.Seperator} />

          <DropdownMenu.Item className={classes.DropdownMenuItem}>
            Archive this list
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className={classes.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

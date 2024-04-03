import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, Link2Icon } from '@radix-ui/react-icons';
import classes from './index.module.scss';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

export const ShareBoardModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToShare, setUserToShare] = useState<string>('');
  const [isSharePending, setIsSharePending] = useState(false);

  const [isLinkCreated, setIsLinkCreated] = useState<boolean>(false);

  const boardMembers = [
    {
      name: 'Stylianos Tsoumanis (you)',
      initials: 'ST',
      color: 'green',
      username: 'styltsou',
    },
    {
      name: 'Nikos Baltas',
      initials: 'NB',
      color: 'blue',
      username: 'nikosb',
    },
    {
      name: 'Evangelos Tsoumanes',
      initials: 'ET',
      color: 'brown',
      username: 'vag',
    },
  ];

  const handleShareBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userToShare === '') return;

    setIsSharePending(true);

    setTimeout(() => {
      setIsSharePending(false);
      setUserToShare('');
    }, 500);
  };

  const handleCreateLink = () => {
    setIsLinkCreated(true);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.DialogOverlay} />
        <Dialog.Content className={classes.DialogContainer}>
          <Dialog.Title className={classes.DialogTitle}>
            Share Board
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className={classes.CloseButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <div className={classes.MainContent}>
            <form className={classes.Form} onSubmit={handleShareBoard}>
              <input
                type="text"
                placeholder="Email address or username"
                value={userToShare}
                onChange={e => setUserToShare(e.target.value)}
              />
              <Button type="submit" loading={isSharePending}>
                Share
              </Button>
            </form>
            <div className={classes.Item}>
              <div className={classes.ItemLeftSection}>
                <span className={classes.Icon}>
                  <Link2Icon />
                </span>
                <p className={classes.Title}>
                  {isLinkCreated
                    ? 'Anyone with a link'
                    : 'Share this board with a link'}
                </p>
                {isLinkCreated ? (
                  <button
                    className={cn(classes.Subtitle, classes.CreateLinkButton)}
                  >
                    Copy link
                  </button>
                ) : (
                  <button
                    className={cn(classes.Subtitle, classes.CreateLinkButton)}
                    onClick={handleCreateLink}
                  >
                    Create link
                  </button>
                )}
              </div>
              {isLinkCreated && (
                <div className={classes.ItemDropdown}>dropdown</div>
              )}
            </div>
            {boardMembers.map(member => (
              <div key={member.initials} className={classes.Item}>
                <div className={classes.ItemLeftSection}>
                  <span
                    className={cn(classes.Icon, classes.Avatar)}
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </span>
                  <p className={classes.Title}>{member.name}</p>
                  <button className={classes.Subtitle}>
                    @{member.username}
                  </button>
                </div>
                <div className={classes.ItemDropdown}>dropdown</div>
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

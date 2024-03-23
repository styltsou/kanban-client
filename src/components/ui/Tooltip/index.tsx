import * as RTooltip from '@radix-ui/react-tooltip';
import classes from './index.module.scss';

export const Tooltip: React.FC<{
  label: string;
  side: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}> = ({ label, children, side }) => {
  return (
    <RTooltip.Provider>
      <RTooltip.Root>
        <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content
            className={classes.TooltipContent}
            sideOffset={5}
            side={side}
          >
            {label}
            {/* <Tooltip.Arrow className={classes.TooltipArrow} /> */}
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
};

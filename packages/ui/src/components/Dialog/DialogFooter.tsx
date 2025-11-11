import { forwardRef } from 'react';

import clsx from 'clsx';

import { Box } from '#components';
import { sx } from '#styles';
import type { UIComponent } from '#types';

type DialogFooterProps = Omit<UIComponent<'div'>, 'color'>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={clsx(className, sx(propSx))}
        justifyContent="flex-end"
        flex
        {...props}
      >
        {children}
      </Box>
    );
  },
);
DialogFooter.displayName = 'DialogFooter';

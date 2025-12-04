import { forwardRef } from 'react';

import clsx from 'clsx';

import { Box } from '#components';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './DialogContent.css';

type DialogContentProps = Omit<UIComponent<'div'>, 'color'>;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={clsx(s.container, className, sx(propSx))}
        {...props}
      >
        {children}
      </Box>
    );
  },
);
DialogContent.displayName = 'DialogContent';

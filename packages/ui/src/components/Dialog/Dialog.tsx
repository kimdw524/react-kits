import { forwardRef } from 'react';

import clsx from 'clsx';

import { Box } from '@/components';
import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import * as s from './Dialog.css';

type DialogProps = Omit<UIComponent<'div'>, 'color'>;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        flex
        flexDirection="row"
        gap="lg"
        boxShadow="border-sm"
        className={clsx(s.container, className, sx(propSx))}
        {...props}
      >
        {children}
      </Box>
    );
  },
);
Dialog.displayName = 'Dialog';

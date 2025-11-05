import { forwardRef } from 'react';

import clsx from 'clsx';
import { XIcon } from 'lucide-react';

import { Box } from '@/components';
import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import * as s from './DialogHeader.css';

interface DialogHeaderProps extends Omit<UIComponent<'div'>, 'color'> {
  onCloseClick?: () => void;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, className, sx: propSx, onCloseClick, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        flex
        justifyContent="space-between"
        alignItems="center"
        fontSize="lg"
        fontWeight="normal"
        className={clsx(s.container, className, sx(propSx))}
        {...props}
      >
        <span>{children}</span>
        <button className={s.close} onClick={onCloseClick} aria-label="닫기">
          <XIcon />
        </button>
      </Box>
    );
  },
);
DialogHeader.displayName = 'DialogHeader';

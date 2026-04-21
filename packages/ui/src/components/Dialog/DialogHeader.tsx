import { forwardRef } from 'react';

import clsx from 'clsx';
import { XIcon } from 'lucide-react';

import { Flex } from '#components';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './DialogHeader.css';

interface DialogHeaderProps extends Omit<UIComponent<'div'>, 'color'> {
  onCloseClick?: () => void;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, className, sx: propSx, onCloseClick, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        alignItems="center"
        className={clsx(s.container, className, sx(propSx))}
        fontSize="lg"
        fontWeight="normal"
        justifyContent="space-between"
        {...props}
      >
        <span>{children}</span>
        <button aria-label="닫기" className={s.close} onClick={onCloseClick}>
          <XIcon />
        </button>
      </Flex>
    );
  },
);
DialogHeader.displayName = 'DialogHeader';

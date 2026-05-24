import { forwardRef } from 'react';

import clsx from 'clsx';

import { Flex } from '#components';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Dialog.css';

type DialogProps = Omit<UIComponent<'div'>, 'color'>;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        boxShadow="border-sm"
        className={clsx(s.container, className, sx(propSx))}
        padding="xl"
        {...props}
      >
        {children}
      </Flex>
    );
  },
);
Dialog.displayName = 'Dialog';

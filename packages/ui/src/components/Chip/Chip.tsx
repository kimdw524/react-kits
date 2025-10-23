import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import * as s from './Chip.css';

type ChipProps = UIComponent<'div', typeof s.chip>;

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      className,
      color = 'primary',
      size = 'md',
      sx: propSx,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(s.chip({ color, size }), className, sx(propSx))}
        {...props}
      >
        <span>{children}</span>
      </div>
    );
  },
);
Chip.displayName = 'Chip';

export { s as chipCss };

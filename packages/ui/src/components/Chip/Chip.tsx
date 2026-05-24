import { forwardRef } from 'react';

import clsx from 'clsx';

import { sprinkles, sx } from '#styles';
import type { typography } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './Chip.css';

interface ChipProps extends UIComponent<'div', typeof s.chip> {
  size?: keyof typeof typography.size;
}

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
        className={clsx(
          s.chip({ color }),
          sprinkles({ fontSize: size }),
          className,
          sx(propSx),
        )}
        {...props}
      >
        <span>{children}</span>
      </div>
    );
  },
);
Chip.displayName = 'Chip';

export { s as chipCss };

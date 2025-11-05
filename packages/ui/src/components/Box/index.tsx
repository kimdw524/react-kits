import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { sprinkles, sx, type SprinklesProps } from '@/styles';
import type { UIComponent } from '@/types';
import { filterSprinkles, omitSprinkles } from '@/utils';

import * as s from './Box.css';

type BoxProps = UIComponent<'div', typeof s.box> & SprinklesProps;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      flex = false,
      rounded = false,
      className,
      sx: propSx,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          s.box({ flex, rounded }),
          sx(propSx),
          sprinkles(filterSprinkles(props)),
        )}
        {...omitSprinkles(props)}
      >
        {children}
      </div>
    );
  },
);
Box.displayName = 'Box';

import { forwardRef } from 'react';

import { clsx } from 'clsx';

import {
  sx,
  type BoxProperties,
  type ColorProperties,
  type TypographyProperties,
} from '#styles';
import type { UIComponent } from '#types';
import { filterSprinkles, omitSprinkles } from '#utils';

import * as s from './Box.css';

type BoxProps = UIComponent<'div', typeof s.box> &
  BoxProperties &
  ColorProperties &
  TypographyProperties;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, isRounded = false, className, sx: propSx, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          s.box({ isRounded }),
          sx(filterSprinkles(rest)),
          sx(propSx),
        )}
        {...omitSprinkles(rest)}
      >
        {children}
      </div>
    );
  },
);
Box.displayName = 'Box';

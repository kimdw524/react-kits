import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { sx, type BoxProperties, type TypographyProperties } from '#styles';
import type { UIComponent } from '#types';
import { filterSprinkles, omitSprinkles } from '#utils';

import * as s from './Box.css';

type BoxProps = UIComponent<'div', typeof s.box> &
  BoxProperties &
  TypographyProperties;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    { children, flex = false, rounded = false, className, sx: propSx, ...rest },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          s.box({ flex, rounded }),
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

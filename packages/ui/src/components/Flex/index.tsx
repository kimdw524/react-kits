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

import * as s from './Flex.css';

type FlexProps = UIComponent<'div'> &
  BoxProperties &
  ColorProperties &
  TypographyProperties;

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className, sx: propSx, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          s.flex,
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
Flex.displayName = 'Flex';

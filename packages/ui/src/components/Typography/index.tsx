import { forwardRef } from 'react';

import clsx from 'clsx';

import {
  sprinkles,
  sx,
  type ColorProperties,
  type TypographyProperties,
} from '#styles';
import { type UIComponent } from '#types';
import { filterSprinkles, omitSprinkles } from '#utils';

import * as s from './Typography.css';

type TypographyElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

type TypographyProps<T extends TypographyElement = TypographyElement> = Omit<
  UIComponent<T, typeof s.typography> &
    TypographyProperties &
    ColorProperties & {
      as?: T;
    },
  'ref'
>;

export const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    {
      children,
      as: Component = 'p',
      className,
      color = 'foreground',
      fontSize = 'md',
      fontWeight = 'normal',
      isEllipsis = false,
      isGradient = false,
      sx: propSx,
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          s.typography({ isEllipsis, isGradient }),
          sprinkles({
            color,
            fontSize,
            fontWeight,
          }),
          sx(filterSprinkles(rest)),
          sx(propSx),
          className,
        )}
        {...omitSprinkles(rest)}
      >
        {children}
      </Component>
    );
  },
);
Typography.displayName = 'Typography';

export { s as typographyCss };

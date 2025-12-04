import { forwardRef, type CSSProperties } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Card.css';

interface CardProps extends UIComponent<'div', typeof s.card> {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      width,
      height,
      color = 'card',
      variant = 'outlined',
      size = 'md',
      className,
      style,
      sx: propSx,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          s.card({ color, size, variant }),
          className,
          sx(propSx),
        )}
        style={{ width, height, ...style }}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

export { s as cardCss };

import { forwardRef, type CSSProperties } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';

import { sx } from '#styles';
import { spacing } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './Card.css';

interface CardProps extends UIComponent<'div', typeof s.card> {
  size?: keyof typeof spacing;
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
        className={clsx(s.card({ color, variant }), className, sx(propSx))}
        style={{
          width,
          height,
          ...assignInlineVars({
            [s.paddingVar]: spacing[size],
          }),
          ...style,
        }}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

export { s as cardCss };

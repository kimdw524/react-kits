import { forwardRef } from 'react';

import clsx from 'clsx';

import { sprinkles, type SprinklesProps } from '#styles';
import { type UIComponent } from '#types';

import * as s from './Typography.css';

type TypographyElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

type TypographyProps<T extends TypographyElement = TypographyElement> = Omit<
  UIComponent<T, typeof s.typography> & {
    as?: T;
    color?: SprinklesProps['color'];
    fontSize?: SprinklesProps['fontSize'];
    fontWeight?: SprinklesProps['fontWeight'];
    lineHeight?: SprinklesProps['lineHeight'];
    textAlign?: SprinklesProps['textAlign'];
    letterSpacing?: SprinklesProps['letterSpacing'];
    wordBreak?: SprinklesProps['wordBreak'];
    gradientFrom?: SprinklesProps['gradientFrom'];
    gradientTo?: SprinklesProps['gradientTo'];
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
      lineHeight,
      textAlign,
      letterSpacing,
      wordBreak,
      gradientFrom,
      gradientTo,
      isEllipsis = false,
      isGradient = false,
      sx,
      ...props
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
            lineHeight,
            textAlign,
            letterSpacing,
            wordBreak,
            gradientFrom,
            gradientTo,
          }),
          sx && sprinkles(sx),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Typography.displayName = 'Typography';

export { s as typographyCss };

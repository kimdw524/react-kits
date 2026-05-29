import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import clsx from 'clsx';

import { sx, type SprinklesProps } from '#styles';

type FieldLegendProps = ComponentPropsWithoutRef<'legend'> &
  Pick<SprinklesProps, 'color' | 'fontSize' | 'fontWeight' | 'lineHeight'>;

export const FieldLegend = forwardRef<HTMLLegendElement, FieldLegendProps>(
  (
    {
      children,
      className,
      color = 'foreground',
      fontSize = 'md',
      fontWeight = 'semiBold',
      lineHeight = 'md',
      ...props
    },
    ref,
  ) => {
    return (
      <legend
        ref={ref}
        className={clsx(
          sx({ padding: 'none', color, fontSize, fontWeight, lineHeight }),
          className,
        )}
        {...props}
      >
        {children}
      </legend>
    );
  },
);
FieldLegend.displayName = 'FieldLegend';

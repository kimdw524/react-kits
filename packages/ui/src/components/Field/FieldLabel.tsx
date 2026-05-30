import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import clsx from 'clsx';

import { sx, type SprinklesProps } from '#styles';

type FieldLabelProps = ComponentPropsWithoutRef<'label'> &
  Pick<SprinklesProps, 'color' | 'fontSize' | 'fontWeight' | 'lineHeight'>;

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  (
    {
      children,
      className,
      color = 'foreground',
      fontSize = 'sm',
      fontWeight = 'medium',
      lineHeight = 'md',
      ...props
    },
    ref,
  ) => {
    return (
      <label
        ref={ref}
        className={clsx(
          sx({
            display: 'inline-flex',
            color,
            fontSize,
            fontWeight,
            lineHeight,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </label>
    );
  },
);
FieldLabel.displayName = 'FieldLabel';

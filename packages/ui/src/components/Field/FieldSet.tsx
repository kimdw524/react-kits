import { forwardRef } from 'react';

import clsx from 'clsx';

import {
  sx,
  type BoxProperties,
  type ColorProperties,
  type TypographyProperties,
} from '#styles';
import type { UIComponent } from '#types';
import { filterSprinkles, omitSprinkles } from '#utils';

import * as s from './FieldSet.css';

type FieldSetProps = UIComponent<'fieldset'> &
  BoxProperties &
  ColorProperties &
  TypographyProperties;

export const FieldSet = forwardRef<HTMLFieldSetElement, FieldSetProps>(
  (
    {
      className,
      color = 'foreground',
      display = 'flex',
      flexDirection = 'column',
      gap = 'lg',
      margin = 'none',
      padding = 'none',
      sx: propSx,
      ...props
    },
    ref,
  ) => {
    return (
      <fieldset
        ref={ref}
        className={clsx(
          s.fieldSet,
          sx(
            filterSprinkles({
              color,
              display,
              flexDirection,
              gap,
              margin,
              padding,
              ...props,
            }),
          ),
          sx(propSx),
          className,
        )}
        {...omitSprinkles(props)}
      />
    );
  },
);
FieldSet.displayName = 'FieldSet';

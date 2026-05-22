'use client';

import { forwardRef, useId, type ReactNode } from 'react';

import clsx from 'clsx';

import { sprinkles, sx } from '#styles';
import type { spacing, typography } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './RadioGroup.css';
import { RadioGroupContext } from './RadioGroupContext';

export interface RadioGroupProps
  extends Omit<UIComponent<'fieldset', typeof s.radioGroup>, 'onChange'> {
  defaultValue?: string;
  gap?: keyof typeof spacing;
  label?: ReactNode;
  name?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: keyof typeof typography.size;
  value?: string;
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      children,
      className,
      color = 'primary',
      defaultValue,
      disabled,
      gap = 'md',
      label,
      name,
      onChange,
      orientation = 'vertical',
      size = 'md',
      sx: propSx,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedName = useId();

    return (
      <RadioGroupContext.Provider
        value={{
          defaultValue,
          disabled,
          name: name ?? generatedName,
          onChange,
          value,
        }}
      >
        <fieldset
          ref={ref}
          className={clsx(
            s.radioGroup({ color }),
            sprinkles({ fontSize: size }),
            className,
            sx(propSx),
          )}
          disabled={disabled}
          role="radiogroup"
          {...props}
        >
          {label !== undefined && <legend className={s.legend}>{label}</legend>}
          <div className={clsx(s.list({ orientation }), sprinkles({ gap }))}>
            {children}
          </div>
        </fieldset>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

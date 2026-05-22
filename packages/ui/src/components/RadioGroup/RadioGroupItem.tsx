'use client';

import { forwardRef, type ChangeEvent } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './RadioGroup.css';
import { useRadioGroupContext } from './RadioGroupContext';

export interface RadioGroupItemProps
  extends Omit<
    UIComponent<'input'>,
    'checked' | 'defaultChecked' | 'name' | 'size' | 'type'
  > {
  value: string;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  (
    { children, className, disabled, onChange, sx: propSx, value, ...props },
    ref,
  ) => {
    const context = useRadioGroupContext();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);

      if (event.target.checked) {
        context.onChange?.(value);
      }
    };

    return (
      <label className={s.item}>
        <span className={s.control}>
          <input
            ref={ref}
            checked={
              context.value !== undefined ? context.value === value : undefined
            }
            className={clsx(s.radio, className, sx(propSx))}
            {...props}
            defaultChecked={
              context.value !== undefined
                ? undefined
                : context.defaultValue === value
            }
            disabled={context.disabled || disabled}
            name={context.name}
            type="radio"
            value={value}
            onChange={handleChange}
          />
        </span>
        {children !== undefined && <span className={s.text}>{children}</span>}
      </label>
    );
  },
);
RadioGroupItem.displayName = 'RadioGroupItem';

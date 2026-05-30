'use client';

import { forwardRef, type ChangeEvent } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { LabelInteraction } from '../LabelInteraction';
import * as s from './RadioGroup.css';
import {
  type RadioGroupInteraction,
  useRadioGroupContext,
} from './RadioGroupContext';

export interface RadioGroupItemProps
  extends Omit<
    UIComponent<'input'>,
    'checked' | 'defaultChecked' | 'name' | 'size' | 'type'
  > {
  interaction?: RadioGroupInteraction;
  value: string;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  (
    {
      children,
      className,
      disabled,
      interaction,
      onChange,
      sx: propSx,
      value,
      ...props
    },
    ref,
  ) => {
    const context = useRadioGroupContext();
    const interactionSize = interaction ?? context.interaction ?? 'none';

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);

      if (event.target.checked) {
        context.onChange?.(value);
      }
    };

    const item = (
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

    if (interactionSize === 'none') {
      return item;
    }

    return <LabelInteraction size={interactionSize}>{item}</LabelInteraction>;
  },
);
RadioGroupItem.displayName = 'RadioGroupItem';

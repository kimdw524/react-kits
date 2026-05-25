import { type ComponentProps, forwardRef } from 'react';

import clsx from 'clsx';
import { CheckIcon } from 'lucide-react';

import { sprinkles, sx } from '#styles';
import type { typography } from '#tokens';
import type { UIComponent } from '#types';

import { Interaction } from '../Interaction';
import * as s from './Checkbox.css';

interface CheckboxProps
  extends Omit<UIComponent<'input', typeof s.checkbox>, 'size' | 'type'> {
  interaction?: ComponentProps<typeof Interaction>['size'] | 'none';
  size?: keyof typeof typography.size;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      children,
      className,
      color = 'primary',
      interaction = 'md',
      size = 'md',
      sx: propSx,
      ...props
    },
    ref,
  ) => {
    const checkbox = (
      <label className={clsx(s.container, sprinkles({ fontSize: size }))}>
        <span className={s.control}>
          <input
            ref={ref}
            className={clsx(s.checkbox({ color }), className, sx(propSx))}
            type="checkbox"
            {...props}
          />
          <CheckIcon aria-hidden="true" className={s.icon} strokeWidth={2} />
        </span>
        {children !== undefined && <span className={s.text}>{children}</span>}
      </label>
    );

    if (interaction === 'none') {
      return checkbox;
    }

    return <Interaction size={interaction}>{checkbox}</Interaction>;
  },
);
Checkbox.displayName = 'Checkbox';

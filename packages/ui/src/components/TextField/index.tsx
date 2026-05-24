import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { sprinkles, sx } from '#styles';
import type { typography } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './TextField.css';

interface TextFieldProps
  extends Omit<UIComponent<'input', typeof s.textField>, 'size'> {
  size?: keyof typeof typography.size;
  type?: React.HTMLInputTypeAttribute;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      type = 'text',
      size = 'md',
      color = 'primary',
      sx: propSx,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        className={clsx(
          className,
          s.textField({ color }),
          sprinkles({ fontSize: size }),
          sx(propSx),
        )}
        type={type}
        {...props}
      />
    );
  },
);
TextField.displayName = 'TextField';

export { s as textFieldCss };

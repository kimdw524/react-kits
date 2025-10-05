import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './TextField.css';

interface TextFieldProps extends UIComponent<'input', typeof s.textField> {
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
        type={type}
        className={clsx(className, s.textField({ size, color }), sx(propSx))}
        {...props}
      />
    );
  },
);
TextField.displayName = 'TextField';

export { s as textFieldCss };

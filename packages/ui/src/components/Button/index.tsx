'use client';

import { forwardRef, type ReactElement } from 'react';

import { clsx } from 'clsx';

import { useRipple } from '#hooks';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Button.css';

interface ButtonProps extends UIComponent<'button', typeof s.button> {
  icon?: ReactElement;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = 'primary',
      size = 'md',
      variant = 'contained',
      pulse = false,
      className,
      sx: propSx,
      icon,
      ...props
    },
    ref,
  ) => {
    const { ripple } = useRipple<HTMLButtonElement>(ref);

    return (
      <button
        ref={ref}
        className={clsx(
          className,
          s.button({
            color,
            size,
            variant,
            pulse,
            hasIcon: icon !== undefined,
          }),
          sx(propSx),
        )}
        {...props}
      >
        {icon !== undefined && <span className={s.icon}>{icon}</span>}
        <span className={s.span({ size })}>{children}</span>
        {ripple}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { s as buttonCss };

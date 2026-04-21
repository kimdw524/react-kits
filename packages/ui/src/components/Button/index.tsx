'use client';

import { forwardRef, useRef, type ReactElement } from 'react';

import { clsx } from 'clsx';

import { useRipple } from '#hooks';
import { sx } from '#styles';
import type { RecipeVariantsProps, UIComponent } from '#types';

import * as s from './Button.css';

interface ButtonProps extends UIComponent<'button', typeof s.button> {
  icon?: ReactElement;
  fontSize?: RecipeVariantsProps<typeof s.span>['size'];
}

export const Button = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'isIcon'>
>(
  (
    {
      children,
      color = 'primary',
      size = 'md',
      fontSize,
      variant = 'contained',
      pulse = false,
      className,
      sx: propSx,
      icon,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef(null);
    const elementRef = ref || localRef;
    const { ripple } = useRipple<HTMLButtonElement>(elementRef);

    const hasIcon = icon !== undefined;
    const isIcon = icon !== undefined && children === undefined;

    return (
      <button
        ref={elementRef}
        className={clsx(
          className,
          s.button({
            color,
            size,
            variant,
            pulse,
            hasIcon,
            isIcon,
          }),
          sx(propSx),
        )}
        {...props}
      >
        {hasIcon && (
          <span className={s.icon({ isIconOnly: isIcon })}>{icon}</span>
        )}
        {!isIcon && (
          <span className={s.span({ size: fontSize ?? size })}>{children}</span>
        )}
        {ripple}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { s as buttonCss };

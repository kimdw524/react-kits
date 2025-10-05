'use client';

import { forwardRef } from 'react';

import clsx from 'clsx';

import { useRipple } from '#hooks';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './CardInteraction.css';

type CardInteractionProps = UIComponent<'div'>;

export const CardInteraction = forwardRef<HTMLDivElement, CardInteractionProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    const { ripple } = useRipple<HTMLDivElement>(ref);

    return (
      <div
        ref={ref}
        className={clsx(
          className,
          s.cardInteraction,
          s.cardInteraction,
          sx(propSx),
        )}
        {...props}
      >
        {children}
        {ripple}
      </div>
    );
  },
);
CardInteraction.displayName = 'CardInteraction';

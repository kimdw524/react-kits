'use client';

import { forwardRef, useRef } from 'react';

import clsx from 'clsx';

import { useRipple } from '#hooks';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './CardInteraction.css';

type CardInteractionProps = UIComponent<'div'>;

export const CardInteraction = forwardRef<HTMLDivElement, CardInteractionProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const { ripple } = useRipple<HTMLDivElement>(ref ?? elementRef);

    return (
      <div
        ref={ref ?? elementRef}
        className={clsx(className, s.cardInteraction, sx(propSx))}
        {...props}
      >
        {children}
        {ripple}
      </div>
    );
  },
);
CardInteraction.displayName = 'CardInteraction';

'use client';

import { forwardRef, useRef } from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
import clsx from 'clsx';

import { useRipple } from '#hooks';
import { sx } from '#styles';
import type { spacing } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './Interaction.css';

interface InteractionProps extends UIComponent<'div'> {
  size?: keyof typeof spacing;
}

export const Interaction = forwardRef<HTMLDivElement, InteractionProps>(
  ({ children, className, size = 'md', sx: propSx, ...props }, ref) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const targetRef = useCombinedRefs(ref, elementRef);
    const { ripple } = useRipple<HTMLDivElement>(elementRef);

    return (
      <div
        {...props}
        ref={targetRef}
        className={clsx(
          s.interaction,
          sx({ padding: size }),
          className,
          sx(propSx),
        )}
      >
        {children}
        {ripple}
      </div>
    );
  },
);
Interaction.displayName = 'Interaction';

export { s as interactionCss };

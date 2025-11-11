import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './CardHeader.css';

type CardHeaderProps = UIComponent<'div'>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, sx: propSx, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(s.cardHeader, className, sx(propSx))}
        {...props}
      />
    );
  },
);
CardHeader.displayName = 'CardHeader';

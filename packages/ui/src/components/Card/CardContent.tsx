import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import * as s from './CardContent.css';

type CardContentProps = UIComponent<'div'>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, sx: propSx, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(s.cardContent, className, sx(propSx))}
        {...props}
      />
    );
  },
);
CardContent.displayName = 'CardContent';

import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import * as s from './CardThumbnail.css';

type CardThumbnailProps = UIComponent<'img'>;

export const CardThumbnail = forwardRef<HTMLImageElement, CardThumbnailProps>(
  ({ className, sx: propSx, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={clsx(s.thumbnail, className, sx(propSx))}
        {...props}
      />
    );
  },
);
CardThumbnail.displayName = 'CardThumbnail';

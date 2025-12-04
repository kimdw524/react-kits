import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationLogo.css';

type NavigationLogoProps = UIComponent<'div'>;

export const NavigationLogo = forwardRef<HTMLDivElement, NavigationLogoProps>(
  ({ className, sx: propSx, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          s.navigationLogo,
          className,
          sx({ marginRight: { mobile: 'lg', desktop: '3xl' } }),
          sx(propSx),
        )}
        {...props}
      />
    );
  },
);
NavigationLogo.displayName = 'NavigationLogo';

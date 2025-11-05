import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationBar.css';

type NavigationBarProps = UIComponent<'nav', typeof s.navigationBar>;

export const NavigationBar = forwardRef<HTMLElement, NavigationBarProps>(
  ({ className, size = 'md', sx: propSx, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx(s.navigationBar({ size }), className, sx(propSx))}
        {...props}
      />
    );
  },
);
NavigationBar.displayName = 'NavigationBar';

export { s as navigationBarCss };

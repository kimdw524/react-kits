import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationMenu.css';

type NavigationMenuProps = UIComponent<'div'>;

export const NavigationMenu = forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ className, sx: propSx, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(s.navigationMenu, className, sx(propSx))}
        {...props}
      />
    );
  },
);
NavigationMenu.displayName = 'NavigationMenu';

export { s as navigationMenuCss };

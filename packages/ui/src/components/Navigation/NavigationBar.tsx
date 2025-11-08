'use client';

import { forwardRef } from 'react';

import { useIsScrolled } from '@kimdw-rtk/utils';
import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationBar.css';

type NavigationBarProps = UIComponent<'nav', typeof s.navigationBar>;

export const NavigationBar = forwardRef<HTMLElement, NavigationBarProps>(
  ({ className, size = 'md', sx: propSx, ...props }, ref) => {
    const isScrolled = useIsScrolled(window);

    return (
      <nav
        ref={ref}
        className={clsx(
          s.navigationBar({ size, isStuck: isScrolled }),
          className,
          sx(propSx),
        )}
        {...props}
      />
    );
  },
);
NavigationBar.displayName = 'NavigationBar';

export { s as navigationBarCss };

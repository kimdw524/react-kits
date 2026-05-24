'use client';

import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationAside.css';

type NavigationAsideProps = UIComponent<'div'>;

export const NavigationAside = forwardRef<HTMLDivElement, NavigationAsideProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(className, sx(propSx))} {...props}>
        <div className={s.wide}>{children}</div>
      </div>
    );
  },
);
NavigationAside.displayName = 'NavigationAside';

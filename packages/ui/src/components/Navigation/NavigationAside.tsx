'use client';

import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import * as s from './NavigationAside.css';

type NavigationAsideProps = UIComponent<'aside'>;

export const NavigationAside = forwardRef<HTMLElement, NavigationAsideProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    return (
      <aside ref={ref} className={clsx(className, sx(propSx))} {...props}>
        <div className={s.wide}>{children}</div>
      </aside>
    );
  },
);
NavigationAside.displayName = 'NavigationAside';

import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './TabsList.css';

type TabsListProps = UIComponent<'div'>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(className, s.container, sx(propSx))}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';

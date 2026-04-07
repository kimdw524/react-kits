'use client';

import { forwardRef, useContext, type MouseEvent } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { TabsIndicator } from './TabsIndicator';
import { TabsContext } from './TabsProvider';
import * as s from './TabsTrigger.css';

interface TabsTriggerProps extends UIComponent<'button'> {
  value: number | string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, value, className, sx: propSx, onClick, ...props }, ref) => {
    const tabsContext = useContext(TabsContext);

    if (tabsContext === undefined) {
      throw new Error('TabsTrigger must be used within a Tabs.');
    }

    const isSelected = tabsContext.value === value;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      tabsContext.selectTab(value, event.currentTarget);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        className={clsx(className, s.container({ isSelected }), sx(propSx))}
        {...props}
        onClick={handleClick}
      >
        {children}
        {isSelected && <TabsIndicator />}
      </button>
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

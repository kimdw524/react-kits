'use client';

import { forwardRef, useReducer } from 'react';

import clsx from 'clsx';

import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import { TabsContext, tabsReducer } from './TabsProvider';

interface TabsProps extends UIComponent<'div'> {
  defaultValue?: number | string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, defaultValue, className, sx: propSx, ...props }, ref) => {
    const [value, setValue] = useReducer(tabsReducer, defaultValue);

    return (
      <TabsContext.Provider value={{ value, setValue }}>
        <div
          ref={ref}
          className={clsx(className, sx(propSx))}
          style={{ width: '100%' }}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

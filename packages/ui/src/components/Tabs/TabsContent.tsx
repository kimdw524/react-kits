'use client';

import { forwardRef, useContext, type ReactNode } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { getTabsValueId, TabsContext, type TabsValue } from './TabsProvider';

interface TabsContentProps extends UIComponent<'div'> {
  children: ReactNode;
  value: TabsValue;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, sx: propSx, ...props }, ref) => {
    const tabsContext = useContext(TabsContext);

    if (tabsContext === undefined) {
      throw new Error('TabsContext must be used within a Tabs.');
    }

    if (tabsContext.value !== value) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={clsx(className, sx(propSx))}
        {...props}
        aria-labelledby={`${tabsContext.id}-trigger-${getTabsValueId(value)}`}
        id={`${tabsContext.id}-content-${getTabsValueId(value)}`}
        role="tabpanel"
      />
    );
  },
);
TabsContent.displayName = 'TabsContent';

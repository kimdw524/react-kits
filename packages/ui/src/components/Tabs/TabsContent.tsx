'use client';

import { forwardRef, useContext, type ReactNode } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { TabsContext } from './TabsProvider';

interface TabsContentProps extends UIComponent<'div'> {
  children: ReactNode;
  value: string | number;
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

    return <div ref={ref} className={clsx(className, sx(propSx))} {...props} />;
  },
);
TabsContent.displayName = 'TabsContent';

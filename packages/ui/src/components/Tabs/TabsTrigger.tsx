'use client';

import { forwardRef, useContext, type MouseEvent } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { TabsIndicator } from './TabsIndicator';
import { getTabsValueId, TabsContext, type TabsValue } from './TabsProvider';
import * as s from './TabsTrigger.css';

interface TabsTriggerProps extends UIComponent<'button'> {
  value: TabsValue;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    { children, value, className, sx: propSx, onClick, type, ...props },
    ref,
  ) => {
    const tabsContext = useContext(TabsContext);

    if (tabsContext === undefined) {
      throw new Error('TabsTrigger must be used within a Tabs.');
    }

    const isSelected = tabsContext.value === value;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (isSelected) {
        return;
      }

      tabsContext.selectTab(value);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        className={clsx(className, s.container({ isSelected }), sx(propSx))}
        {...props}
        aria-controls={`${tabsContext.id}-content-${getTabsValueId(value)}`}
        aria-selected={isSelected}
        data-tabs-selected={isSelected ? 'true' : undefined}
        id={`${tabsContext.id}-trigger-${getTabsValueId(value)}`}
        role="tab"
        type={type ?? 'button'}
        onClick={handleClick}
      >
        {isSelected && (
          <TabsIndicator style={{ zIndex: -1 }} variant={tabsContext.variant} />
        )}
        {children}
      </button>
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

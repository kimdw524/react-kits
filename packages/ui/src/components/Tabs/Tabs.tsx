'use client';

import { forwardRef, useReducer } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Tabs.css';
import { TabsContext, tabsReducer, type TabsState } from './TabsProvider';

interface TabsProps extends UIComponent<'div', typeof s.tabs> {
  defaultValue?: number | string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    { children, defaultValue, className, sx: propSx, size = 'md', ...props },
    ref,
  ) => {
    const [state, dispatch] = useReducer(tabsReducer, {
      value: defaultValue,
      selectedElement: undefined,
    } satisfies TabsState);

    const selectTab = (
      value: TabsState['value'],
      selectedElement: TabsState['selectedElement'],
    ) => {
      dispatch({ type: 'SELECT_TAB', value, selectedElement });
    };

    return (
      <TabsContext.Provider
        value={{
          value: state.value,
          selectedElement: state.selectedElement,
          selectTab,
        }}
      >
        <div
          ref={ref}
          className={clsx(s.tabs({ size }), className, sx(propSx))}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

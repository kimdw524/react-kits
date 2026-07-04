'use client';

import {
  forwardRef,
  useContext,
  useLayoutEffect,
  type MouseEvent,
} from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
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
    const triggerRef = useCombinedRefs<HTMLButtonElement>(ref);

    if (tabsContext === undefined) {
      throw new Error('TabsTrigger must be used within a Tabs.');
    }

    const isSelected = tabsContext.value === value;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      const trigger = triggerRef.current;

      if (isSelected || !trigger) {
        return;
      }

      tabsContext.selectTab(value, trigger);
      onClick?.(event);
    };

    useLayoutEffect(() => {
      const trigger = triggerRef.current;

      if (!isSelected || tabsContext.selectedElement || !trigger) {
        return;
      }

      tabsContext.selectTab(value, trigger);
    }, [value, isSelected, tabsContext, triggerRef]);

    return (
      <button
        ref={triggerRef}
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

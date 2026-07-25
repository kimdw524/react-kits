'use client';

import { forwardRef, useCallback, useReducer } from 'react';

import clsx from 'clsx';

import { sprinkles, sx } from '#styles';
import type { typography } from '#tokens';
import type { UIComponent } from '#types';

import { TabsContext, tabsReducer, type TabsState } from './TabsProvider';

interface TabsProps extends Omit<UIComponent<'div'>, 'onChange'> {
  size?: keyof typeof typography.size;
  defaultValue?: number | string;
  onChange?: (value: number | string) => void;
  variant?: 'primary' | 'secondary';
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      defaultValue,
      className,
      onChange,
      sx: propSx,
      size = 'md',
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    const [state, dispatch] = useReducer(tabsReducer, {
      value: defaultValue,
      selectedElement: undefined,
      variant,
    } satisfies TabsState);

    const selectTab = useCallback(
      (
        value: TabsState['value'],
        selectedElement: TabsState['selectedElement'],
      ) => {
        dispatch({ type: 'SELECT_TAB', value, selectedElement, variant });
      },
      [variant],
    );

    return (
      <TabsContext.Provider
        value={{
          value: state.value,
          selectedElement: state.selectedElement,
          onChange,
          variant,
          selectTab,
        }}
      >
        <div
          ref={ref}
          className={clsx(sprinkles({ fontSize: size }), className, sx(propSx))}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

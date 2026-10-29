'use client';

import { forwardRef, useCallback, useId, useMemo, useState } from 'react';

import clsx from 'clsx';

import { sprinkles, sx } from '#styles';
import type { typography } from '#tokens';
import type { UIComponent } from '#types';

import { TabsContext, type TabsValue } from './TabsProvider';

interface TabsProps extends Omit<UIComponent<'div'>, 'onChange'> {
  size?: keyof typeof typography.size;
  defaultValue?: TabsValue;
  disabled?: boolean;
  onChange?: (value: TabsValue) => void;
  value?: TabsValue;
  variant?: 'primary' | 'secondary';
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      defaultValue,
      disabled = false,
      className,
      onChange,
      sx: propSx,
      size = 'md',
      value,
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<TabsValue | undefined>(
      defaultValue,
    );
    const selectedValue = isControlled ? value : internalValue;

    const selectTab = useCallback(
      (nextValue: TabsValue) => {
        if (disabled) {
          return;
        }

        if (!isControlled) {
          setInternalValue(nextValue);
        }

        onChange?.(nextValue);
      },
      [disabled, isControlled, onChange],
    );
    const contextValue = useMemo(
      () => ({
        id,
        disabled,
        value: selectedValue,
        variant,
        selectTab,
      }),
      [disabled, id, selectedValue, selectTab, variant],
    );

    return (
      <TabsContext.Provider value={contextValue}>
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

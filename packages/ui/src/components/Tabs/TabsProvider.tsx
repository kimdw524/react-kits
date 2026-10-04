'use client';

import { createContext, type ComponentProps } from 'react';

import type { Tabs } from '#components';

export type TabsValue = number | string;

export const getTabsValueId = (value: TabsValue) =>
  `${typeof value}-${encodeURIComponent(String(value))}`;

export interface TabsState {
  id: string;
  value: TabsValue | undefined;
  variant: NonNullable<ComponentProps<typeof Tabs>['variant']>;
}

interface TabsContext extends TabsState {
  selectTab: (value: TabsValue) => void;
}

export const TabsContext = createContext<TabsContext | undefined>(undefined);
